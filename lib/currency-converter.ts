// Exchange rate (can be updated from API in the future)
const USD_TO_UAH_RATE = 37.5; // Approximate rate, should be fetched from API

export function convertUSDToUAH(usd: number | string): number {
  const usdNum = typeof usd === "string" ? parseFloat(usd) : usd;
  if (isNaN(usdNum)) return 0;
  return Math.round(usdNum * USD_TO_UAH_RATE);
}

export function convertUAHToUSD(uah: number): number {
  if (isNaN(uah)) return 0;
  return Math.round((uah / USD_TO_UAH_RATE) * 100) / 100;
}

export function formatUAH(amount: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

