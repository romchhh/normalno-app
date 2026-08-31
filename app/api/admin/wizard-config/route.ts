import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth";
import { getWizardConfig, saveWizardConfig } from "@/lib/wizard/config";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

export async function GET() {
  const auth = await requireAdmin("sales");
  if ("error" in auth) return auth.error;

  const config = await getWizardConfig();
  let telegramChatId = "";
  if (existsSync(SETTINGS_FILE)) {
    const settings = JSON.parse(await readFile(SETTINGS_FILE, "utf-8"));
    telegramChatId = settings.telegramChatId || process.env.TELEGRAM_CHAT_ID || "";
  } else {
    telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
  }

  return NextResponse.json({ ...config, telegramChatId });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin("super_admin");
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { telegramChatId, ...wizardFields } = body;

  await saveWizardConfig(wizardFields);

  if (telegramChatId !== undefined) {
    const dataDir = path.join(process.cwd(), "data");
    const settings = { telegramChatId: String(telegramChatId).trim() };
    await import("fs/promises").then((fs) =>
      fs.mkdir(dataDir, { recursive: true }).then(() =>
        fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))
      )
    );
  }

  return NextResponse.json({ success: true });
}
