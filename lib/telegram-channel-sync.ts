import { spawn } from "child_process";
import path from "path";

export type TelegramSyncResult = {
  ok: boolean;
  imported?: number;
  updated?: number;
  skipped?: number;
  processedGroups?: number;
  channelId?: number;
  limit?: number;
  errors?: string[];
  error?: string;
  message?: string;
};

const SYNC_DIR = path.join(process.cwd(), "scripts", "telegram_channel");
const SYNC_SCRIPT = path.join(SYNC_DIR, "sync.py");

export function isTelegramChannelSyncConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_API_ID && process.env.TELEGRAM_API_HASH);
}

export function runTelegramChannelSync(limit = 200): Promise<TelegramSyncResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "python3",
      [SYNC_SCRIPT, "--limit", String(limit), "--json"],
      {
        cwd: SYNC_DIR,
        env: process.env,
      }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      const trimmed = stdout.trim();
      const lastLine = trimmed.split("\n").filter(Boolean).pop() || trimmed;

      try {
        const parsed = JSON.parse(lastLine) as TelegramSyncResult;
        if (code !== 0 && !parsed.ok) {
          resolve({
            ok: false,
            error: parsed.error || stderr || `Sync exited with code ${code}`,
          });
          return;
        }
        resolve(parsed);
        return;
      } catch {
        resolve({
          ok: false,
          error:
            stderr ||
            trimmed ||
            `Не вдалося прочитати результат синхронізації (code ${code})`,
        });
      }
    });
  });
}
