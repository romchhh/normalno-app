import { existsSync } from "fs";
import path from "path";
import { MediaGroupBuilder, InlineKeyboardBuilder } from "node-telegram-bot-api";
import { fromPath } from "node-telegram-bot-api/node";
import { prisma } from "@/lib/db";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand";
import { convertUAHToUSD } from "@/lib/currency-converter";
import { resolveCarUploadDir } from "@/lib/project-root";
import { readAppSettings } from "@/lib/app-settings";
import { getApi, isTelegramBotConfigured } from "@/lib/telegram-bot";
import { verifyBotChannelRights } from "@/lib/telegram-channel-rights";

type CarForPublish = {
  id: number;
  title: string;
  brand: string;
  mark: string;
  year: number;
  engineType: string;
  engineVolume: number;
  transmission: string;
  driveType: string;
  mileage: number;
  priceUSD: string;
  monthlyPayment: number | null;
  advancePayment: number | null;
  description: string;
  text: string;
  photo: string | null;
};

const DRIVE_LABELS: Record<string, string> = {
  FWD: "передній",
  RWD: "задній",
  AWD: "повний",
  "4WD": "повний",
  Передній: "передній",
  Задній: "задній",
  Повний: "повний",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  Автомат: "автоматична",
  Механіка: "механічна",
  Робот: "робот",
  Варіатор: "варіатор",
  automatic: "автоматична",
  manual: "механічна",
};

function formatUsdAmount(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  return Math.round(value).toLocaleString("uk-UA");
}

function formatMileage(km: number): string {
  if (!km || km <= 0) return "";
  if (km >= 1000) {
    const thousands = Math.round(km / 1000);
    return `${thousands.toLocaleString("uk-UA")} тис. км`;
  }
  return `${km.toLocaleString("uk-UA")} км`;
}

function formatEngine(car: CarForPublish): string {
  const parts: string[] = [];
  if (car.engineVolume && car.engineVolume > 0) {
    parts.push(String(car.engineVolume).replace(/\.0$/, ""));
  }
  if (car.engineType?.trim()) {
    parts.push(car.engineType.trim().toLowerCase());
  }
  return parts.join(" ");
}

function formatDrive(driveType: string): string {
  const raw = driveType.trim();
  if (!raw) return "";
  return DRIVE_LABELS[raw] || DRIVE_LABELS[raw.toUpperCase()] || raw.toLowerCase();
}

function formatTransmission(transmission: string): string {
  const raw = transmission.trim();
  if (!raw) return "";
  return TRANSMISSION_LABELS[raw] || raw.toLowerCase();
}

function extractFeatures(description: string): string[] {
  const text = description.trim();
  if (!text) return [];

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s•\-\*◆▪︎]+/, "").trim())
    .filter(Boolean);

  const featureLike = lines.filter((line) => {
    if (line.length < 2 || line.length > 80) return false;
    if (/^(рік|двигун|коробка|привід|пробіг|ціна|платіж|аванс)/i.test(line)) {
      return false;
    }
    return true;
  });

  if (featureLike.length >= 2) return featureLike.slice(0, 20);

  const bullets = text.match(/[•\-]\s*([^\n•\-]+)/g);
  if (bullets?.length) {
    return bullets
      .map((item) => item.replace(/^[•\-]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  return [];
}

function carDisplayTitle(car: CarForPublish): string {
  const composed = `${car.brand} ${car.mark}`.trim();
  if (composed && car.title.toLowerCase().includes(car.brand.toLowerCase())) {
    return car.title.trim();
  }
  return car.title.trim() || composed || "Авто";
}

export function formatCarChannelPost(car: CarForPublish): string {
  const lines: string[] = [];
  lines.push(`🚘 <b>${escapeHtml(carDisplayTitle(car))}</b>`);
  lines.push("");

  if (car.year) lines.push(`📆 Рік: ${car.year}`);
  const engine = formatEngine(car);
  if (engine) lines.push(`🛠 Двигун: ${engine}`);
  const gearbox = formatTransmission(car.transmission);
  if (gearbox) lines.push(`🕹 Коробка: ${gearbox}`);
  const drive = formatDrive(car.driveType);
  if (drive) lines.push(`🛞 Привід: ${drive}`);
  const mileage = formatMileage(car.mileage);
  if (mileage) lines.push(`🛣 Пробіг: ${mileage}`);

  lines.push("");

  const monthlyUsd = car.monthlyPayment
    ? convertUAHToUSD(car.monthlyPayment)
    : 0;
  const advanceUsd = car.advancePayment
    ? convertUAHToUSD(car.advancePayment)
    : 0;
  const priceNum =
    parseFloat(String(car.priceUSD || "").replace(/\s+/g, "").replace(",", ".")) ||
    0;

  if (monthlyUsd > 0) {
    lines.push(`💵 Щомісячний платіж — <b>${formatUsdAmount(monthlyUsd)} $/міс</b>`);
  }
  if (advanceUsd > 0) {
    lines.push(`Авансовий внесок — <b>${formatUsdAmount(advanceUsd)} $</b>`);
  }
  if (priceNum > 0) {
    lines.push(`Ціна — <b>${formatUsdAmount(priceNum)} $</b>`);
  }

  const features = extractFeatures(car.description || car.text || "");
  if (features.length > 0) {
    lines.push("");
    lines.push("✨ <b>По комплектації:</b>");
    for (const feature of features) {
      lines.push(`• ${escapeHtml(feature)}`);
    }
  }

  lines.push("");
  lines.push("🚗 Запрошуємо на тест-драйв! 😉");
  lines.push("");
  lines.push(`<i>${escapeHtml(BRAND_NAME)}</i> · кредит чи лізинг — підберемо умови під вас`);

  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function resolveLocalPhotoPath(photoUrl: string): string | null {
  const trimmed = photoUrl.trim();
  if (!trimmed) return null;

  const apiMatch = trimmed.match(/^\/api\/cars\/image\/(.+)$/);
  const uploadMatch = trimmed.match(/^\/uploads\/cars\/(.+)$/);
  const filename = apiMatch?.[1] || uploadMatch?.[1];
  if (!filename) return null;

  const safe = path.basename(filename);
  const full = path.join(resolveCarUploadDir(), safe);
  return existsSync(full) ? full : null;
}

async function downloadRemotePhoto(
  url: string,
  carId: number,
  index: number
): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext =
      url.match(/\.(jpe?g|png|webp)(?:\?|$)/i)?.[1]?.toLowerCase() || "jpg";
    const tmpDir = path.join(resolveCarUploadDir(), ".tmp");
    if (!existsSync(tmpDir)) {
      await import("fs/promises").then((fs) => fs.mkdir(tmpDir, { recursive: true }));
    }
    const target = path.join(tmpDir, `publish_${carId}_${index}.${ext}`);
    await import("fs/promises").then((fs) => fs.writeFile(target, buffer));
    return target;
  } catch {
    return null;
  }
}

async function resolvePhotoFiles(car: CarForPublish): Promise<string[]> {
  const urls = (car.photo || "").split(/\s+/).filter(Boolean).slice(0, 10);
  const files: string[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]!;
    const local = resolveLocalPhotoPath(url);
    if (local) {
      files.push(local);
      continue;
    }
    if (/^https?:\/\//i.test(url)) {
      const downloaded = await downloadRemotePhoto(url, car.id, i);
      if (downloaded) files.push(downloaded);
    }
  }

  return files;
}

function carKeyboard(carId: number) {
  const siteBase = (process.env.WEB_APP_URL || `${BRAND_URL}/wizard`)
    .replace(/\/$/, "")
    .replace(/\/wizard$/, "");
  const carUrl = `${siteBase || BRAND_URL}/car/${carId}`;
  const wizardUrl = `${siteBase || BRAND_URL}/wizard`;

  return new InlineKeyboardBuilder()
    .url("🚙 Оновити авто", carUrl)
    .row()
    .url("✨ Кредит чи лізинг", wizardUrl)
    .build();
}

export type PublishCarResult = {
  ok: boolean;
  channelId?: string;
  messageIds?: number[];
  error?: string;
};

export async function publishCarToChannel(carId: number): Promise<PublishCarResult> {
  if (!isTelegramBotConfigured()) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN не налаштовано" };
  }

  const settings = await readAppSettings();
  if (!settings.telegramPublishChannelId) {
    return {
      ok: false,
      error: "Спочатку вкажіть ID каналу в Telegram / Система",
    };
  }

  const rights = await verifyBotChannelRights(settings.telegramPublishChannelId);
  if (!rights.ok) {
    return { ok: false, error: rights.error || "Немає прав публікувати в канал" };
  }

  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (!car) return { ok: false, error: "Авто не знайдено" };

  const text = formatCarChannelPost(car);
  const photos = await resolvePhotoFiles(car);
  const api = getApi();
  const chatId = rights.channelId;
  const keyboard = carKeyboard(car.id);
  const messageIds: number[] = [];

  try {
    if (photos.length === 0) {
      const msg = await api.sendMessage({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        reply_markup: keyboard,
        link_preview_options: { is_disabled: true },
      });
      messageIds.push(msg.message_id);
    } else if (photos.length === 1) {
      const caption = text.length > 1024 ? `${text.slice(0, 1020)}…` : text;
      const msg = await api.sendPhoto({
        chat_id: chatId,
        photo: await fromPath(photos[0]!),
        caption,
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
      messageIds.push(msg.message_id);
      if (text.length > 1024) {
        const follow = await api.sendMessage({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          reply_markup: keyboard,
          link_preview_options: { is_disabled: true },
        });
        messageIds.push(follow.message_id);
      }
    } else {
      const group = new MediaGroupBuilder();
      const caption = text.length > 1024 ? `${text.slice(0, 1020)}…` : text;
      for (let i = 0; i < photos.length; i++) {
        const media = await fromPath(photos[i]!);
        if (i === 0) {
          group.photo({ media, caption, parse_mode: "HTML" });
        } else {
          group.photo({ media });
        }
      }
      const messages = await api.sendMediaGroup({
        chat_id: chatId,
        media: group.build(),
      });
      for (const msg of messages) messageIds.push(msg.message_id);

      const followText =
        text.length > 1024
          ? text
          : "👇 Деталі авто та умови кредиту / лізингу:";
      const follow = await api.sendMessage({
        chat_id: chatId,
        text: followText,
        parse_mode: "HTML",
        reply_markup: keyboard,
        link_preview_options: { is_disabled: true },
        reply_parameters:
          messageIds[0] != null
            ? { message_id: messageIds[0], allow_sending_without_reply: true }
            : undefined,
      });
      messageIds.push(follow.message_id);
    }

    await prisma.car.update({
      where: { id: car.id },
      data: {
        telegramPublished: true,
        telegramPublishedAt: new Date(),
        telegramMessageIds: JSON.stringify(messageIds),
      },
    });

    return { ok: true, channelId: chatId, messageIds };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Не вдалося опублікувати",
    };
  }
}
