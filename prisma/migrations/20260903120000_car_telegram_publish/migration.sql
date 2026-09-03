-- AlterTable
ALTER TABLE "Car" ADD COLUMN "telegramPublished" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Car" ADD COLUMN "telegramPublishedAt" DATETIME;
ALTER TABLE "Car" ADD COLUMN "telegramMessageIds" TEXT;
