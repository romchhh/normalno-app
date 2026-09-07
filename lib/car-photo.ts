/**
 * Car photo URL helpers.
 * Admin can paste local uploads or any external host (postimg, imgbb, tilda, …).
 */

const OPTIMIZED_REMOTE_HOSTS = new Set([
  "static.tildacdn.com",
  "static.tildacdn.pro",
  "thb.tildacdn.com",
]);

export function resolveCarPhotoUrl(photo: string): string {
  const trimmed = photo.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("/api/cars/image/")) return trimmed;

  const localMatch = trimmed.match(/^\/uploads\/cars\/(.+)$/);
  if (localMatch) {
    return `/api/cars/image/${localMatch[1]}`;
  }

  return trimmed;
}

export function resolveCarPhotos(photoField: string | null | undefined): string[] {
  if (!photoField?.trim()) return [];
  return photoField.split(/\s+/).filter(Boolean).map(resolveCarPhotoUrl);
}

export function resolveCarPhotoField(photoField: string | null | undefined): string | null {
  if (!photoField?.trim()) return null;
  return resolveCarPhotos(photoField).join(" ");
}

/** Absolute http(s) URL — loaded by the browser, not Next image optimizer. */
export function isExternalCarPhotoUrl(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}

/**
 * Whether next/image can safely optimize this src.
 * External hosts outside the allowlist must use a plain <img>
 * (optimizer would 400; some hosts also block server-side fetches).
 */
export function canOptimizeCarPhoto(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) return false;

  // Local / relative assets and our image API
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;

  try {
    const { protocol, hostname } = new URL(trimmed);
    if (protocol !== "http:" && protocol !== "https:") return false;
    return OPTIMIZED_REMOTE_HOSTS.has(hostname);
  } catch {
    return false;
  }
}
