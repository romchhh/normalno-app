export type CatalogCategory = {
  slug: string;
  name: string;
  image: string;
  description: string;
  priority: number;
  dbValues: string[];
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "new-car",
    name: "Нові авто",
    image: "/autos/new-car.webp",
    description: "Авто з нульовим пробігом та офіційною гарантією",
    priority: 1,
    dbValues: ["Нові авто"],
  },
  {
    slug: "car-in-use",
    name: "Авто в Україні",
    image: "/autos/car-in-use.webp",
    description: "Готові до реєстрації — авто вже в Україні",
    priority: 2,
    dbValues: ["Авто в Україні"],
  },
  {
    slug: "e-cars",
    name: "Електромобілі",
    image: "/autos/e-cars.webp",
    description: "Електрокари та гібриди в лізинг",
    priority: 3,
    dbValues: ["Електромобілі"],
  },
  {
    slug: "commercial",
    name: "Комерційні",
    image: "/autos/commercial.webp",
    description: "Буси, фургони та комерційний транспорт",
    priority: 4,
    dbValues: ["Комерційні"],
  },
  {
    slug: "micro-bus",
    name: "Мікроавтобуси",
    image: "/autos/micro-bus.webp",
    description: "Мікроавтобуси для бізнесу та сім'ї",
    priority: 5,
    dbValues: ["Мікроавтобуси"],
  },
  {
    slug: "trailers",
    name: "Причепи",
    image: "/autos/trailers.webp",
    description: "Причепи та напівпричепи різного призначення",
    priority: 6,
    dbValues: ["Причепи"],
  },
];

export const validCategories = CATALOG_CATEGORIES.map((c) => c.slug);

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
