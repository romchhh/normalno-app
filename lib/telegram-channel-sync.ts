import { spawn } from "child_process";
import { accessSync, constants } from "fs";
import path from "path";

export type TelegramSyncResult = {
  ok: boolean;
  imported?: number;
  updated?: number;
  skipped?: number;
  processedGroups?: number;
  photosAdded?: number;
  channelId?: number;
  limit?: number;
  errors?: string[];
  error?: string;
  message?: string;
};

export type TelegramSyncPaths = {
  projectRoot: string;
  syncDir: string;
  syncScript: string;
  venvPython: string;
};

export const PYTHON_SYNC_SETUP_CMD = "npm run tg-sync:setup";

function isSyncDir(dir: string): boolean {
  try {
    accessSync(path.join(dir, "sync.py"), constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function isExecutable(filePath: string): boolean {
  try {
    accessSync(filePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function venvCandidates(projectRoot: string, syncDir: string): string[] {
  return [
    path.join(projectRoot, ".venv-telegram", "bin", "python3"),
    path.join(syncDir, ".venv", "bin", "python3"),
  ];
}

function resolveVenvPython(projectRoot: string, syncDir: string): string {
  for (const candidate of venvCandidates(projectRoot, syncDir)) {
    if (isExecutable(candidate)) return candidate;
  }
  return venvCandidates(projectRoot, syncDir)[0]!;
}

export function resolveTelegramSyncPaths(): TelegramSyncPaths {
  const envRoot = process.env.PROJECT_ROOT?.trim();
  if (envRoot) {
    const syncDir = path.join(envRoot, "scripts", "telegram_channel");
    if (isSyncDir(syncDir)) {
      const projectRoot = path.resolve(envRoot);
      return {
        projectRoot,
        syncDir,
        syncScript: path.join(syncDir, "sync.py"),
        venvPython: resolveVenvPython(projectRoot, syncDir),
      };
    }
  }

  const candidates = [
    process.cwd(),
    path.join(process.cwd(), ".."),
    path.join(process.cwd(), "../.."),
    path.join(process.cwd(), "../../.."),
  ];

  const matches: TelegramSyncPaths[] = [];

  for (const candidate of candidates) {
    const projectRoot = path.resolve(candidate);
    const syncDir = path.join(projectRoot, "scripts", "telegram_channel");
    if (!isSyncDir(syncDir)) continue;

    matches.push({
      projectRoot,
      syncDir,
      syncScript: path.join(syncDir, "sync.py"),
      venvPython: resolveVenvPython(projectRoot, syncDir),
    });
  }

  const withVenv = matches.find((entry) => isExecutable(entry.venvPython));
  if (withVenv) return withVenv;
  if (matches.length > 0) return matches[matches.length - 1]!;

  const fallbackRoot = process.cwd();
  const fallbackDir = path.join(fallbackRoot, "scripts", "telegram_channel");
  return {
    projectRoot: fallbackRoot,
    syncDir: fallbackDir,
    syncScript: path.join(fallbackDir, "sync.py"),
    venvPython: resolveVenvPython(fallbackRoot, fallbackDir),
  };
}

export function getTelegramSyncPythonBin(paths = resolveTelegramSyncPaths()): string {
  const custom = process.env.TELEGRAM_PYTHON_BIN?.trim();
  if (custom) return custom;
  if (isExecutable(paths.venvPython)) return paths.venvPython;
  return "python3";
}

export function formatSyncError(stderr: string, stdout: string, paths: TelegramSyncPaths): string {
  const output = `${stderr}\n${stdout}`.trim();
  if (/ModuleNotFoundError|No module named/i.test(output)) {
    if (!isExecutable(paths.venvPython)) {
      return (
        `Python venv не знайдено для PM2/standalone. Додайте в .env:\n` +
        `PROJECT_ROOT=${paths.projectRoot}\n` +
        `або TELEGRAM_PYTHON_BIN=${paths.venvPython}\n` +
        `Потім: ${PYTHON_SYNC_SETUP_CMD} && pm2 restart normalno --update-env`
      );
    }
    return `Python залежності не встановлені. Виконайте: ${PYTHON_SYNC_SETUP_CMD}`;
  }
  if (/externally-managed-environment/i.test(output)) {
    return `Системний pip заблоковано. Виконайте: ${PYTHON_SYNC_SETUP_CMD}`;
  }
  if (/can't open file|No such file or directory.*sync\.py/i.test(output)) {
    return (
      `Не знайдено sync.py. Додайте в .env PROJECT_ROOT=/шлях/до/normalno-app ` +
      `(зараз: ${paths.projectRoot})`
    );
  }
  return output || "Синхронізація не вдалась";
}

export function checkPythonSyncDependencies(): Promise<boolean> {
  const paths = resolveTelegramSyncPaths();
  const pythonBin = getTelegramSyncPythonBin(paths);

  return new Promise((resolve) => {
    const child = spawn(pythonBin, ["-c", "import telethon"], { cwd: paths.syncDir });
    child.on("close", (code) => resolve(code === 0));
    child.on("error", () => resolve(false));
  });
}

export function isTelegramChannelSyncConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_API_ID && process.env.TELEGRAM_API_HASH);
}

export function runTelegramChannelSync(limit = 400): Promise<TelegramSyncResult> {
  const paths = resolveTelegramSyncPaths();
  const pythonBin = getTelegramSyncPythonBin(paths);

  return new Promise((resolve, reject) => {
    const child = spawn(
      pythonBin,
      [paths.syncScript, "--limit", String(limit), "--json"],
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
          error: formatSyncError(stderr, trimmed, paths),
        });
      }
    });
  });
}
