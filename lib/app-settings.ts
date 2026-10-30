import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { resolveProjectRoot } from "@/lib/project-root";

export type AppSettings = {
  telegramChatId: string;
  /** Channel ID or @username for publishing cars */
  telegramPublishChannelId: string;
  /** Bitrix crm.status SOURCE STATUS_ID for site leads */
  bitrixLeadSourceId: string;
};

const DEFAULT_SETTINGS: AppSettings = {
  telegramChatId: "",
  telegramPublishChannelId: "",
  bitrixLeadSourceId: "NORMALNO_CATALOG",
};

function settingsPath(): string {
  return path.join(resolveProjectRoot(), "data", "settings.json");
}

async function ensureDataDir() {
  const dataDir = path.join(resolveProjectRoot(), "data");
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

export async function readAppSettings(): Promise<AppSettings> {
  await ensureDataDir();
  const file = settingsPath();
  let parsed: Partial<AppSettings> = {};

  if (existsSync(file)) {
    try {
      parsed = JSON.parse(await readFile(file, "utf-8")) as Partial<AppSettings>;
    } catch {
      parsed = {};
    }
  }

  const fromFile =
    parsed.bitrixLeadSourceId !== undefined
      ? String(parsed.bitrixLeadSourceId).trim()
      : undefined;

  return {
    telegramChatId:
      String(parsed.telegramChatId || "").trim() ||
      process.env.TELEGRAM_CHAT_ID?.trim() ||
      "",
    telegramPublishChannelId: String(parsed.telegramPublishChannelId || "").trim(),
    bitrixLeadSourceId:
      fromFile !== undefined
        ? fromFile
        : process.env.BITRIX_LEAD_SOURCE_ID?.trim() ||
          DEFAULT_SETTINGS.bitrixLeadSourceId,
  };
}

export async function writeAppSettings(
  patch: Partial<AppSettings>
): Promise<AppSettings> {
  await ensureDataDir();
  const current = await readAppSettings();
  const next: AppSettings = {
    telegramChatId:
      patch.telegramChatId !== undefined
        ? String(patch.telegramChatId).trim()
        : current.telegramChatId,
    telegramPublishChannelId:
      patch.telegramPublishChannelId !== undefined
        ? String(patch.telegramPublishChannelId).trim()
        : current.telegramPublishChannelId,
    bitrixLeadSourceId:
      patch.bitrixLeadSourceId !== undefined
        ? String(patch.bitrixLeadSourceId).trim()
        : current.bitrixLeadSourceId,
  };
  await writeFile(settingsPath(), JSON.stringify(next, null, 2));
  return next;
}
