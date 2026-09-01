import path from "path";

export function resolveProjectRoot(): string {
  const envRoot = process.env.PROJECT_ROOT?.trim();
  if (envRoot) return path.resolve(envRoot);
  return process.cwd();
}

export function resolveCarUploadDir(): string {
  return path.join(resolveProjectRoot(), "public", "uploads", "cars");
}
