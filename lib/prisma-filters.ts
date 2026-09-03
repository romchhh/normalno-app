import { prisma } from "./db";

export type CarSearchResult = {
  id: number;
  title: string;
  photo: string | null;
  category: string;
  priceUSD: string;
  year: number;
  mileage: number;
  monthlyPayment: number | null;
};

const carSearchSelect = {
  id: true,
  title: true,
  photo: true,
  category: true,
  priceUSD: true,
  year: true,
  mileage: true,
  monthlyPayment: true,
} as const;

/** SQLite does not support Prisma `mode: "insensitive"`. */
export async function searchCarsByTitle(
  query: string
): Promise<CarSearchResult[]> {
  const trimmed = query.trim();

  if (!trimmed) {
    return prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      select: carSearchSelect,
    });
  }

  const pattern = `%${trimmed}%`;

  return prisma.$queryRaw<CarSearchResult[]>`
    SELECT id, title, photo, category, "priceUSD", year, mileage, "monthlyPayment"
    FROM "Car"
    WHERE lower(title) LIKE lower(${pattern})
    ORDER BY "createdAt" DESC
  `;
}

/**
 * Case-insensitive car id lookup for admin filters (SQLite).
 * Matches title, brand, model, SKU, externalId, year.
 */
export async function findCarIdsByAdminQuery(query: string): Promise<number[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const pattern = `%${trimmed}%`;
  const rows = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM "Car"
    WHERE lower(title) LIKE lower(${pattern})
       OR lower(brand) LIKE lower(${pattern})
       OR lower(mark) LIKE lower(${pattern})
       OR lower(sku) LIKE lower(${pattern})
       OR lower(coalesce("externalId", '')) LIKE lower(${pattern})
       OR cast(year as text) LIKE ${pattern}
  `;

  return rows.map((row) => row.id);
}

/** Case-insensitive substring match for SQLite string fields. */
export function sqliteContains(value: string) {
  return { contains: value };
}
