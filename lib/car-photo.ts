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
  return photoField.split(/\s+/).filter(Boolean).map(resolveCarPhotoUrl).join(" ");
}
