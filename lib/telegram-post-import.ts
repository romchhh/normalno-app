import { spawn } from "child_process";
import {
  formatSyncError,
  getTelegramSyncPythonBin,
  resolveTelegramSyncPaths,
} from "@/lib/telegram-channel-sync";

export type TelegramParsedCar = {
  title: string;
  brand: string;
  mark: string;
  year: number;
  mileage: number;
  price: number;
  priceUSD: string;
  monthlyPayment?: number | null;
  advancePayment?: number | null;
  engineType: string;
  transmission: string;
  driveType: string;
  enginePower: number;
  description: string;
  category: string;
  bodyType?: string | null;
};

export type TelegramPostPreview = {
  ok: boolean;
  parsed?: TelegramParsedCar;
  photos?: string[];
  photo?: string | null;
  externalId?: string;
  sourceUrl?: string;
  rawText?: string;
  photoCount?: number;
  messageId?: number;
  channelId?: number;
  duplicateCarId?: number | null;
  duplicateCarTitle?: string | null;
  error?: string;
};

function parseSpawnResult(stdout: string, stderr: string, paths: ReturnType<typeof resolveTelegramSyncPaths>) {
  const trimmed = stdout.trim();
  const lastLine = trimmed.split("\n").filter(Boolean).pop() || trimmed;

  try {
    return JSON.parse(lastLine) as TelegramPostPreview;
  } catch {
    return {
      ok: false,
      error: formatSyncError(stderr, trimmed, paths),
    } satisfies TelegramPostPreview;
  }
}

export function runTelegramPostImport(url: string): Promise<TelegramPostPreview> {
  const paths = resolveTelegramSyncPaths();
  const pythonBin = getTelegramSyncPythonBin(paths);

  return new Promise((resolve, reject) => {
    const child = spawn(
      pythonBin,
      [paths.syncScript, "--url", url.trim(), "--json"],
      {
        cwd: paths.syncDir,
        env: {
          ...process.env,
          PROJECT_ROOT: paths.projectRoot,
        },
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
      const parsed = parseSpawnResult(stdout, stderr, paths);
      if (code !== 0 && !parsed.ok) {
        resolve({
          ok: false,
          error: parsed.error || stderr || `Import exited with code ${code}`,
        });
        return;
      }
      resolve(parsed);
    });
  });
}
