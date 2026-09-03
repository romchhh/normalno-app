export function getTelegramBotUsername(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME?.trim() ||
    process.env.TELEGRAM_BOT_USERNAME?.trim();
  return (fromEnv || "NormalnoAutoBot").replace(/^@/, "");
}

/** Deep link for channel post CTA: linktowatch_{id}_rahunok */
export function getCarTelegramDeepLink(carId: number): string {
  return `https://t.me/${getTelegramBotUsername()}?start=linktowatch_${carId}_rahunok`;
}

export function parseCarStartPayload(payload: string): number | null {
  const trimmed = payload.trim();
  const linkMatch = trimmed.match(/^linktowatch_(\d+)_rahunok$/i);
  if (linkMatch) return parseInt(linkMatch[1]!, 10);
  const carMatch = trimmed.match(/^car_(\d+)$/i);
  if (carMatch) return parseInt(carMatch[1]!, 10);
  return null;
}
