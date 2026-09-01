import { NextRequest, NextResponse } from "next/server";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { isValidTelegramPostUrl } from "@/lib/telegram-car-import";
import {
  isTelegramChannelSyncConfigured,
  checkPythonSyncDependencies,
  PYTHON_SYNC_SETUP_CMD,
} from "@/lib/telegram-channel-sync";
import { runTelegramPostImport } from "@/lib/telegram-post-import";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;
  if (!canManageCars(auth.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!isTelegramChannelSyncConfigured()) {
    return NextResponse.json(
      {
        error:
          "Додайте TELEGRAM_API_ID та TELEGRAM_API_HASH у .env, потім виконайте npm run tg-sync:login",
      },
      { status: 400 }
    );
  }

  const pythonReady = await checkPythonSyncDependencies();
  if (!pythonReady) {
    return NextResponse.json(
      { error: `Python залежності не встановлені. Виконайте: ${PYTHON_SYNC_SETUP_CMD}` },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const url = String(body.url || "").trim();

    if (!url) {
      return NextResponse.json({ error: "Вкажіть посилання на пост Telegram" }, { status: 400 });
    }

    if (!isValidTelegramPostUrl(url)) {
      return NextResponse.json(
        {
          error:
            "Невірне посилання. Приклад: https://t.me/channelname/123 або https://t.me/c/1949651952/123",
        },
        { status: 400 }
      );
    }

    const result = await runTelegramPostImport(url);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Не вдалося імпортувати пост" },
        { status: 500 }
      );
    }

    let duplicateCarId: number | null = null;
    let duplicateCarTitle: string | null = null;
    if (result.externalId) {
      const existing = await prisma.car.findFirst({
        where: { externalId: result.externalId },
        select: { id: true, title: true },
      });
      if (existing) {
        duplicateCarId = existing.id;
        duplicateCarTitle = existing.title;
      }
    }

    return NextResponse.json({
      ...result,
      duplicateCarId,
      duplicateCarTitle,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
