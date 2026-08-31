-- AlterTable
ALTER TABLE "Car" ADD COLUMN "bodyType" TEXT;
ALTER TABLE "Car" ADD COLUMN "status" TEXT DEFAULT 'available';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "WizardSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" TEXT NOT NULL,
    "userId" INTEGER,
    "phone" TEXT,
    "startOption" TEXT,
    "currentCarBrand" TEXT,
    "currentCarModel" TEXT,
    "currentCarYear" INTEGER,
    "currentCarMileage" INTEGER,
    "currentCarPrice" REAL NOT NULL DEFAULT 0,
    "additionalCash" REAL NOT NULL DEFAULT 0,
    "monthlyPayment" REAL NOT NULL DEFAULT 550,
    "termMonths" INTEGER NOT NULL DEFAULT 36,
    "motivations" TEXT NOT NULL DEFAULT '[]',
    "bodyTypes" TEXT NOT NULL DEFAULT '[]',
    "brandPrefs" TEXT NOT NULL DEFAULT '[]',
    "maxBudget" REAL,
    "totalStartBudget" REAL,
    "selectedCarId" INTEGER,
    "selectedCarLabel" TEXT,
    "currentStep" TEXT NOT NULL DEFAULT 'hero',
    "bitrixStatus" TEXT,
    "bitrixError" TEXT,
    "funnelSteps" TEXT NOT NULL DEFAULT '[]',
    "calculationsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WizardSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WizardSession_telegramId_key" ON "WizardSession"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "WizardSession_userId_key" ON "WizardSession"("userId");
