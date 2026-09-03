import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getWizardConfig, saveWizardConfig } from "@/lib/wizard/config";
import { readAppSettings, writeAppSettings } from "@/lib/app-settings";

export async function GET() {
  const auth = await requireAdmin("sales");
  if ("error" in auth) return auth.error;

  const config = await getWizardConfig();
  const settings = await readAppSettings();

  return NextResponse.json({ ...config, telegramChatId: settings.telegramChatId });
}

export async function POST(request: Request) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { telegramChatId, ...wizardFields } = body;

  await saveWizardConfig(wizardFields);

  if (telegramChatId !== undefined) {
    await writeAppSettings({ telegramChatId: String(telegramChatId).trim() });
  }

  return NextResponse.json({ success: true });
}
