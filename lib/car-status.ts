import { convertUSDToUAH } from "@/lib/currency-converter";
import {
  calcLeasingScenario,
  DEFAULT_LEASING_PARAMS,
  type LeasingParams,
} from "@/lib/wizard/leasing";

export const CAR_STATUSES = [
  { id: "available", label: "В наявності" },
  { id: "on_order", label: "Під замовлення" },
  { id: "reserved", label: "Заброньовано" },
  { id: "sold", label: "Продано" },
  { id: "inactive", label: "Деактивовано" },
] as const;

export type CarStatusId = (typeof CAR_STATUSES)[number]["id"];

export const BODY_TYPE_OPTIONS = ["SUV", "Sedan", "EV", "Hatchback", "Wagon", "Coupe", "Pickup"];
export const DRIVE_TYPE_OPTIONS = ["FWD", "RWD", "AWD", "4WD"];

export type PaymentScheduleItem = {
  termMonths: number;
  monthlyUah: number;
  advanceUah: number;
};

/** Авторозрахунок платежів 24 / 36 / 48 з ціни ($) за оптимальною програмою. */
export function calcPaymentScheduleFromPriceUsd(
  priceUsd: number,
  params: LeasingParams = DEFAULT_LEASING_PARAMS
): PaymentScheduleItem[] {
  if (!priceUsd || priceUsd <= 0) return [];
  const priceUah = convertUSDToUAH(priceUsd);
  return [24, 36, 48].map((termMonths) => {
    const scenario = calcLeasingScenario(priceUah, termMonths, "optimal", params);
    return {
      termMonths,
      monthlyUah: Math.round(scenario.totalPaymentFirstYearUah),
      advanceUah: Math.round(scenario.advanceUah + scenario.orgFeeUah),
    };
  });
}

export function statusLabel(status: string | null | undefined): string {
  return CAR_STATUSES.find((s) => s.id === status)?.label || status || "—";
}

export function isCarPubliclyListed(status: string | null | undefined): boolean {
  return !status || status === "available" || status === "on_order" || status === "reserved";
}
