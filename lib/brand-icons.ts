const BRAND_SLUG_OVERRIDES: Record<string, string> = {
  "Alfa Romeo": "alfa-romeo",
  "Great Dane": "great-dane",
  "Land Rover": "land-rover",
  Mercedes: "mercedes-benz",
  "Mercedes-Benz": "mercedes-benz",
  Škoda: "skoda",
  Skoda: "skoda",
};

/** Slug filename in public/brands (without extension). */
export function brandTitleToSlug(title: string): string {
  const trimmed = title.trim();
  if (BRAND_SLUG_OVERRIDES[trimmed]) {
    return BRAND_SLUG_OVERRIDES[trimmed];
  }

  return trimmed
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** SVG first, then PNG — BrandIcon tries each on load error. */
export function getBrandIconCandidates(title: string): string[] {
  const slug = brandTitleToSlug(title);
  return [`/brands/${slug}.svg`, `/brands/${slug}.png`];
}

export function getBrandIconPath(title: string): string {
  return getBrandIconCandidates(title)[0];
}
