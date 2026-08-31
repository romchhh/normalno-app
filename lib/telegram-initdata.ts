import { createHmac, timingSafeEqual } from "crypto";

export type TelegramWebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};

export type ValidatedInitData = {
  user: TelegramWebAppUser;
  authDate: number;
  queryId?: string;
  raw: Record<string, string>;
};

/**
 * Validates Telegram Mini App initData per
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export function validateTelegramInitData(
  initData: string,
  botToken = process.env.TELEGRAM_BOT_TOKEN
): ValidatedInitData | null {
  if (!initData?.trim() || !botToken?.trim()) return null;

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;

  const pairs: string[] = [];
  params.forEach((value, key) => {
    if (key !== "hash") pairs.push(`${key}=${value}`);
  });
  pairs.sort();
  const dataCheckString = pairs.join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculated = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  try {
    const a = Buffer.from(calculated, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const authDate = parseInt(params.get("auth_date") || "0", 10);
  if (!authDate) return null;

  // Reject data older than 24h
  const ageSec = Math.floor(Date.now() / 1000) - authDate;
  if (ageSec > 60 * 60 * 24) return null;

  const userRaw = params.get("user");
  if (!userRaw) return null;

  try {
    const user = JSON.parse(userRaw) as TelegramWebAppUser;
    if (!user?.id || !user.first_name) return null;

    const raw: Record<string, string> = {};
    params.forEach((v, k) => {
      raw[k] = v;
    });

    return {
      user,
      authDate,
      queryId: params.get("query_id") || undefined,
      raw,
    };
  } catch {
    return null;
  }
}

/** Dev / browser fallback when Telegram bot token missing or outside TMA */
export function allowUnvalidatedTelegram(): boolean {
  return process.env.TELEGRAM_ALLOW_UNSAFE_AUTH === "1" || process.env.NODE_ENV !== "production";
}
