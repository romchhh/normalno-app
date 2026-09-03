import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readAppSettings, writeAppSettings } from "@/lib/app-settings";
import { verifyBotChannelRights } from "@/lib/telegram-channel-rights";

export async function GET() {
  try {
    const auth = await requireAdmin("super_admin");
    if ("error" in auth) return auth.error;

    const settings = await readAppSettings();
    return NextResponse.json(settings);
  } catch (error: unknown) {
    console.error("Error reading settings:", error);
    return NextResponse.json({ error: "Failed to read settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin("super_admin");
    if ("error" in auth) return auth.error;

    const body = await request.json();
    const telegramChatId =
      body.telegramChatId !== undefined ? String(body.telegramChatId) : undefined;
    const telegramPublishChannelId =
      body.telegramPublishChannelId !== undefined
        ? String(body.telegramPublishChannelId)
        : undefined;

    if (telegramChatId === undefined && telegramPublishChannelId === undefined) {
      return NextResponse.json(
        { error: "Немає даних для збереження" },
        { status: 400 }
      );
    }

    let channelCheck = null;
    if (telegramPublishChannelId !== undefined && telegramPublishChannelId.trim()) {
      channelCheck = await verifyBotChannelRights(telegramPublishChannelId);
      if (!channelCheck.ok) {
        return NextResponse.json(
          {
            error: channelCheck.error || "Бот не має прав у каналі",
            channelCheck,
          },
          { status: 400 }
        );
      }
    }

    const settings = await writeAppSettings({
      ...(telegramChatId !== undefined ? { telegramChatId } : {}),
      ...(telegramPublishChannelId !== undefined
        ? {
            telegramPublishChannelId: channelCheck?.channelId || telegramPublishChannelId,
          }
        : {}),
    });

    return NextResponse.json({
      success: true,
      settings,
      channelCheck,
    });
  } catch (error: unknown) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
