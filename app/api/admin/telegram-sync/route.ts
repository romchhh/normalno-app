import { NextRequest, NextResponse } from "next/server";
import { canManageCars, requireAdmin } from "@/lib/admin-auth";
import {
  checkPythonSyncDependencies,
  isTelegramChannelSyncConfigured,
  PYTHON_SYNC_SETUP_CMD,
  runTelegramChannelSync,
} from "@/lib/telegram-channel-sync";
import { revalidateCarPages } from "@/lib/revalidate-cars";

export async function GET() {
  const auth = await requireAdmin("content_manager");
  if ("error" in auth) return auth.error;

  const pythonReady = await checkPythonSyncDependencies();

  return NextResponse.json({
    configured: isTelegramChannelSyncConfigured(),
    pythonReady,
    setupCommand: PYTHON_SYNC_SETUP_CMD,
    channelId: process.env.TELEGRAM_CHANNEL_ID || "-1001949651952",
    defaultLimit: Number(process.env.TELEGRAM_SYNC_LIMIT || 400),
  });
}

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
          "Додайте TELEGRAM_API_ID та TELEGRAM_API_HASH у .env, потім авторизуйте акаунт: npm run tg-sync:login",
      },
      { status: 400 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const limit = Math.min(
      600,
      Math.max(1, Number(body.limit || process.env.TELEGRAM_SYNC_LIMIT || 400))
    );

    const result = await runTelegramChannelSync(limit);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Синхронізація не вдалась" },
        { status: 500 }
      );
    }

    revalidateCarPages();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
