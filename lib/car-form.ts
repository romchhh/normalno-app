export type PaymentCurrency = "USD" | "UAH";

export const PAYMENT_CURRENCIES: { id: PaymentCurrency; label: string; symbol: string }[] = [
  { id: "USD", label: "Долари ($)", symbol: "$" },
  { id: "UAH", label: "Гривні (₴)", symbol: "₴" },
];

export function normalizePaymentCurrency(
  value: string | null | undefined
): PaymentCurrency {
  return String(value || "").toUpperCase() === "USD" ? "USD" : "UAH";
}

export type CarFormValues = {
  title: string;
  brand: string;
  mark: string;
  year: string;
  engineType: string;
  transmission: string;
  mileage: string;
  monthlyPayment: string;
  advancePayment: string;
  paymentCurrency: PaymentCurrency;
  priceUSD: string;
  description: string;
  photo: string;
  video: string;
  category: string;
  status: string;
  bodyType: string;
  driveType: string;
  partnerId: string;
};

export const EMPTY_CAR_FORM: CarFormValues = {
  title: "",
  brand: "",
  mark: "",
  year: "",
  engineType: "",
  transmission: "",
  mileage: "",
  monthlyPayment: "",
  advancePayment: "",
  paymentCurrency: "UAH",
  priceUSD: "",
  description: "",
  photo: "",
  video: "",
  category: "",
  status: "available",
  bodyType: "",
  driveType: "",
  partnerId: "",
};

export const ENGINE_OPTIONS = [
  "Бензин",
  "Дизель",
  "Гібрид",
  "Електро",
  "Газ / Бензин",
];

export const TRANSMISSION_OPTIONS = [
  "Автомат",
  "Механіка",
  "Робот",
  "Варіатор",
];

export function generateCarUid(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = `car_${Date.now().toString(36)}_`;
  for (let i = 0; i < 10; i++) {
    uid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uid;
}

export function parseMoney(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === "") return 0;
  const n = parseFloat(String(value).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function carToFormValues(car: Record<string, unknown>): CarFormValues {
  return {
    title: String(car.title ?? ""),
    brand: String(car.brand ?? ""),
    mark: String(car.mark ?? ""),
    year: car.year ? String(car.year) : "",
    engineType: String(car.engineType ?? ""),
    transmission: String(car.transmission ?? ""),
    mileage: car.mileage != null ? String(car.mileage) : "",
    monthlyPayment:
      car.monthlyPayment != null && car.monthlyPayment !== ""
        ? String(car.monthlyPayment)
        : "",
    advancePayment:
      car.advancePayment != null && car.advancePayment !== ""
        ? String(car.advancePayment)
        : "",
    paymentCurrency: normalizePaymentCurrency(
      car.paymentCurrency != null ? String(car.paymentCurrency) : "UAH"
    ),
    priceUSD: String(car.priceUSD ?? ""),
    description: String(car.description || car.text || ""),
    photo: String(car.photo ?? ""),
    video: String(car.video ?? ""),
    category: String(car.category ?? ""),
    status: String(car.status || "available"),
    bodyType: String(car.bodyType ?? ""),
    driveType: String(car.driveType ?? ""),
    partnerId: car.partnerId != null && car.partnerId !== "" ? String(car.partnerId) : "",
  };
}

export function formValuesToPayload(values: CarFormValues, existingUid?: string) {
  const price = parseMoney(values.priceUSD);
  const monthly = parseMoney(values.monthlyPayment);
  const advance = parseMoney(values.advancePayment);
  const description = values.description.trim();
  const partnerIdNum = parseInt(values.partnerId, 10);
  const paymentCurrency = normalizePaymentCurrency(values.paymentCurrency);

  return {
    uid: existingUid || generateCarUid(),
    title: values.title.trim(),
    brand: values.brand.trim(),
    mark: values.mark.trim(),
    year: parseInt(values.year, 10) || 0,
    engineType: values.engineType.trim(),
    transmission: values.transmission.trim(),
    mileage: parseInt(String(values.mileage).replace(/\D/g, ""), 10) || 0,
    monthlyPayment: monthly || null,
    advancePayment: advance || null,
    paymentCurrency,
    priceUSD: String(price || values.priceUSD || "0"),
    price,
    description,
    text: description,
    photo: values.photo.trim() || null,
    video: values.video.trim() || null,
    category: values.category.trim(),
    status: values.status.trim() || "available",
    bodyType: values.bodyType.trim() || null,
    driveType: values.driveType.trim(),
    partnerId: Number.isFinite(partnerIdNum) && partnerIdNum > 0 ? partnerIdNum : null,
    sku: "",
    quantity: 1,
    engineVolume: 0,
    enginePower: 0,
    countryOfOrigin: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  };
}

export function formatUahMoney(amount: number | null | undefined): string | null {
  if (amount == null || !Number.isFinite(amount) || amount <= 0) return null;
  return `${Math.round(amount).toLocaleString("uk-UA")} ₴`;
}

export function formatPaymentMoney(
  amount: number | null | undefined,
  currency: string | null | undefined,
  opts?: { perMonth?: boolean }
): string | null {
  if (amount == null || !Number.isFinite(amount) || amount <= 0) return null;
  const cur = normalizePaymentCurrency(currency);
  const formatted = Math.round(amount).toLocaleString("uk-UA");
  const suffix = opts?.perMonth ? "/міс" : "";
  if (cur === "USD") return `${formatted} $${suffix}`;
  return `${formatted} ₴${suffix}`;
}
