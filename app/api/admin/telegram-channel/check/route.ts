import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { verifyBotChannelRights } from "@/lib/telegram-channel-rights";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json().catch(() => ({}));
    const channelId = String(body.channelId || body.telegramPublishChannelId || "").trim();
    if (!channelId) {
      return NextResponse.json({ error: "Вкажіть ID каналу" }, { status: 400 });
    }

    const result = await verifyBotChannelRights(channelId);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Помилка перевірки";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
