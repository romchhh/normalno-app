import { CATALOG_CATEGORIES } from "@/lib/categories";
import type { CarFormValues } from "@/lib/car-form";
import { calcPaymentScheduleFromPriceUsd } from "@/lib/car-status";
import { DEFAULT_LEASING_PARAMS } from "@/lib/wizard/leasing";
import type { TelegramParsedCar, TelegramPostPreview } from "@/lib/telegram-post-import";

const DRIVE_MAP: Record<string, string> = {
  Повний: "AWD",
  Задній: "RWD",
  Передній: "FWD",
};

const CATEGORY_MAP: Record<string, string> = {
  "Електро": "e-cars",
  "Електромобілі": "e-cars",
  "Нові авто": "new-car",
  "Авто в Україні": "car-in-use",
  "Комерційні": "commercial",
  "Мікроавтобуси": "micro-bus",
  "Причепи": "trailers",
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

function calcPayments(priceUsd: number) {
  if (!priceUsd || priceUsd <= 0) {
    return { monthlyPayment: "", advancePayment: "" };
  }
  const schedule = calcPaymentScheduleFromPriceUsd(priceUsd, DEFAULT_LEASING_PARAMS);
  const m36 = schedule.find((item) => item.termMonths === 36);
  if (!m36) {
    return { monthlyPayment: "", advancePayment: "" };
  }
  return {
    monthlyPayment: String(m36.monthlyUah),
    advancePayment: String(m36.advanceUah),
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
  const payments = calcPayments(priceNum);

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
    monthlyPayment: payments.monthlyPayment,
    advancePayment: payments.advancePayment,
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
