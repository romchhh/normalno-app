import { convertUSDToUAH, formatUAH } from "@/lib/currency-converter";

export type { BudgetProfile, LeasingParams } from "./leasing";
export { calcBudgetProfile } from "./leasing";

export function calcTotalStartBudgetUah(
  currentCarPriceUsd: number,
  additionalCashUah: number
): number {
  return convertUSDToUAH(currentCarPriceUsd) + additionalCashUah;
}

export function estimateCarPrice(year: number, mileage: number): {
  min: number;
  avg: number;
  max: number;
} {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - year);
  const mileageFactor = Math.max(0, (mileage - 50000) / 1000) * 150;
  let base = Math.max(4000, 22000 - age * 1200 - mileageFactor);
  const round = (n: number) => Math.round(n / 500) * 500;
  return {
    min: round(base * 0.95),
    avg: round(base),
    max: round(base * 1.05),
  };
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatUah(amount: number): string {
  return formatUAH(amount);
}

export function formatUahShort(amount: number): string {
  return `${Math.round(amount).toLocaleString("uk-UA")} ₴`;
}
