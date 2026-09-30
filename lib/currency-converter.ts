// Exchange rate (override with USD_TO_UAH_RATE in .env)
const USD_TO_UAH_RATE = (() => {
  const fromEnv = Number(process.env.USD_TO_UAH_RATE);
  return Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 41;
})();

export function getUsdToUahRate(): number {
  return USD_TO_UAH_RATE;
}

export function convertUSDToUAH(usd: number | string): number {
  const usdNum = typeof usd === "string" ? parseFloat(usd) : usd;
  if (isNaN(usdNum)) return 0;
  return Math.round(usdNum * USD_TO_UAH_RATE);
}

export function convertUAHToUSD(uah: number): number {
  if (isNaN(uah)) return 0;
  return Math.round((uah / USD_TO_UAH_RATE) * 100) / 100;
}

/**
 * Admin stores monthly/advance in UAH.
 * Legacy Telegram sync sometimes wrote USD into the same fields.
 * Detect which and return USD for channel posts (no double conversion).
 */
export function paymentToUsd(
  amount: number | null | undefined,
  kind: "monthly" | "advance",
  priceUsd = 0
): number {
  if (amount == null || !Number.isFinite(amount) || amount <= 0) return 0;

  const looksLikeUah =
    kind === "monthly"
      ? // Typical UA leasing: 8k–60k ₴/міс; channel posts: ~200–1500 $/міс
        amount >= 2500 || (priceUsd > 0 && amount > priceUsd * 0.2)
      : // Advance in ₴ is usually tens/hundreds of thousands
        amount >= 15000 || (priceUsd > 0 && amount > priceUsd * 1.2);

  const usd = looksLikeUah ? convertUAHToUSD(amount) : amount;
  return Math.round(usd);
}

export function formatUAH(amount: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

