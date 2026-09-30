import { CATALOG_CATEGORIES } from "@/lib/categories";
import type { CarFormValues } from "@/lib/car-form";
import { calcPaymentScheduleFromPriceUsd } from "@/lib/car-status";
import { convertUAHToUSD } from "@/lib/currency-converter";
import { DEFAULT_LEASING_PARAMS } from "@/lib/wizard/leasing";
import type { TelegramPostPreview } from "@/lib/telegram-post-import";

const DRIVE_MAP: Record<string, string> = {
  Повний: "AWD",
  Задній: "RWD",
  Передній: "FWD",
};

const CATEGORY_MAP: Record<string, string> = {
  "Електро": "e-cars",
  "Електромобілі": "e-cars",
  "Авто в Україні": "car-in-use",
  "Мікроавтобуси": "micro-bus",
  // Legacy labels → keep cars findable under active categories
  "Нові авто": "car-in-use",
  "Комерційні": "car-in-use",
  "Причепи": "car-in-use",
};

function mapCategory(raw: string): string {
  if (!raw) return "";
  if (CATALOG_CATEGORIES.some((item) => item.slug === raw)) return raw;
  if (CATEGORY_MAP[raw]) return CATEGORY_MAP[raw];
  const match = CATALOG_CATEGORIES.find(
    (item) =>
      item.name.toLowerCase() === raw.toLowerCase() ||
      item.dbValues.some((value) => value.toLowerCase() === raw.toLowerCase())
  );
  return match?.slug || raw;
}

function mapDriveType(raw: string): string {
  if (!raw) return "";
  if (DRIVE_MAP[raw]) return DRIVE_MAP[raw];
  const upper = raw.toUpperCase();
  if (["FWD", "RWD", "AWD", "4WD"].includes(upper)) return upper;
  return raw;
}

function calcPayments(priceUsd: number, currency: "USD" | "UAH") {
  if (!priceUsd || priceUsd <= 0) {
    return { monthlyPayment: "", advancePayment: "" };
  }
  const schedule = calcPaymentScheduleFromPriceUsd(priceUsd, DEFAULT_LEASING_PARAMS);
  const m36 = schedule.find((item) => item.termMonths === 36);
  if (!m36) {
    return { monthlyPayment: "", advancePayment: "" };
  }
  const monthly =
    currency === "USD" ? Math.round(convertUAHToUSD(m36.monthlyUah)) : m36.monthlyUah;
  const advance =
    currency === "USD" ? Math.round(convertUAHToUSD(m36.advanceUah)) : m36.advanceUah;
  return {
    monthlyPayment: String(monthly),
    advancePayment: String(advance),
  };
}

export type TelegramImportMeta = {
  externalId: string;
  sourceUrl: string;
  photoCount: number;
};

export function telegramPreviewToFormValues(
  preview: TelegramPostPreview
): { values: Partial<CarFormValues>; meta: TelegramImportMeta | null } {
  if (!preview.ok || !preview.parsed) {
    return { values: {}, meta: null };
  }

  const parsed = preview.parsed;
  const photos = preview.photos?.length
    ? preview.photos.join(" ")
    : preview.photo || "";
  const priceUsd = parsed.priceUSD || String(parsed.price || "");
  const priceNum = parseFloat(String(priceUsd).replace(/[^\d.]/g, "")) || 0;
  // Channel posts are in USD — keep amounts as entered
  const paymentCurrency = "USD" as const;
  const fallbackPayments = calcPayments(priceNum, paymentCurrency);

  const monthlyFromPost =
    parsed.monthlyPayment != null && parsed.monthlyPayment > 0
      ? String(Math.round(parsed.monthlyPayment))
      : "";
  const advanceFromPost =
    parsed.advancePayment != null && parsed.advancePayment > 0
      ? String(Math.round(parsed.advancePayment))
      : "";

  const values: Partial<CarFormValues> = {
    title: parsed.title,
    brand: parsed.brand,
    mark: parsed.mark,
    year: parsed.year ? String(parsed.year) : "",
    mileage: parsed.mileage ? String(parsed.mileage) : "",
    engineType: parsed.engineType || "",
    transmission: parsed.transmission || "",
    driveType: mapDriveType(parsed.driveType || ""),
    bodyType: parsed.bodyType || "",
    category: mapCategory(parsed.category || ""),
    priceUSD: priceNum ? String(priceNum) : priceUsd,
    paymentCurrency,
    monthlyPayment: monthlyFromPost || fallbackPayments.monthlyPayment,
    advancePayment: advanceFromPost || fallbackPayments.advancePayment,
    description: parsed.description || "",
    photo: photos,
    status: "available",
  };

  const meta =
    preview.externalId && preview.sourceUrl
      ? {
          externalId: preview.externalId,
          sourceUrl: preview.sourceUrl,
          photoCount: preview.photoCount || preview.photos?.length || 0,
        }
      : null;

  return { values, meta };
}

export function isValidTelegramPostUrl(url: string): boolean {
  const trimmed = url.trim();
  return /^https?:\/\/(?:www\.)?t\.me\/(?:c\/\d+\/\d+|[\w-]+\/\d+)/i.test(trimmed);
}
