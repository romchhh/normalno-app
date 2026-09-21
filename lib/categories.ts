export type CatalogCategory = {
  slug: string;
  name: string;
  image: string;
  description: string;
  priority: number;
  /** Values stored in Car.category (Ukrainian labels and/or slug). */
  dbValues: string[];
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "car-in-use",
    name: "Авто в Україні",
    image: "/autos/car-in-use.webp",
    description: "Готові до реєстрації — авто вже в Україні",
    priority: 1,
    dbValues: ["Авто в Україні", "car-in-use", "Нові авто", "new-car"],
  },
  {
    slug: "e-cars",
    name: "Електромобілі",
    image: "/autos/e-cars.webp",
    description: "Електрокари та гібриди в лізинг",
    priority: 2,
    dbValues: ["Електромобілі", "Електро", "e-cars"],
  },
  {
    slug: "micro-bus",
    name: "Мікроавтобуси",
    image: "/autos/micro-bus.webp",
    description: "Мікроавтобуси для бізнесу та сім'ї",
    priority: 3,
    dbValues: ["Мікроавтобуси", "micro-bus"],
  },
];

/** Permanently hidden from UI / API (legacy catalog tiles). */
export const REMOVED_CATEGORY_SLUGS = new Set([
  "new-car",
  "commercial",
  "trailers",
]);

export const validCategories = CATALOG_CATEGORIES.map((c) => c.slug);

export function isActiveCategorySlug(slug: string): boolean {
  return !REMOVED_CATEGORY_SLUGS.has(slug);
}

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  CATALOG_CATEGORIES.map((c) => [c.slug, c.name])
);

export const REVERSE_CATEGORY_MAP: Record<string, string[]> = Object.fromEntries(
  CATALOG_CATEGORIES.map((c) => [c.slug, c.dbValues])
);

export function categoriesToJsonRecord() {
  return Object.fromEntries(
    CATALOG_CATEGORIES.map((c) => [
      c.slug,
      {
        name: c.name,
        image: c.image,
        description: c.description,
        slug: c.slug,
        priority: c.priority,
      },
    ])
  );
}
