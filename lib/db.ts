import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as any;

export const prisma: PrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error"]
        : ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

let schemaReady: Promise<void> | null = null;

/**
 * Production deploys sometimes ship code before migrate runs.
 * Missing paymentCurrency breaks every car page / catalog query → React #441.
 */
export async function ensureCarSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      try {
        await prisma.$executeRawUnsafe(
          `ALTER TABLE "Car" ADD COLUMN "paymentCurrency" TEXT NOT NULL DEFAULT 'UAH'`
        );
      } catch {
        // Column already exists — ignore
      }
    })();
  }
  await schemaReady;
}
