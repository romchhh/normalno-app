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

/** Case-insensitive substring match for SQLite string fields. */
export function sqliteContains(value: string) {
  return { contains: value };
}
