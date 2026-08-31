/**
 * Formats price for display
 * If price is empty, null, undefined, "0", or "0.00", returns "Ціну потрібно уточнити"
 */
export function formatPrice(priceUSD: string | number | null | undefined): string {
  if (!priceUSD) {
    return "Ціну потрібно уточнити";
  }

  const priceStr = String(priceUSD).trim();
  
  // Check if price is zero or empty
  if (priceStr === "" || priceStr === "0" || priceStr === "0.00" || priceStr === "0,00") {
    return "Ціну потрібно уточнити";
  }

  // Remove all spaces and replace comma with dot, then parse as number
  const cleanedPrice = priceStr.replace(/\s+/g, "").replace(",", ".");
  const priceNum = parseFloat(cleanedPrice);
  
  if (isNaN(priceNum) || priceNum === 0) {
    return "Ціну потрібно уточнити";
  }

  // Format with thousand separators
  return `${priceNum.toLocaleString("uk-UA")} $`;
}

