import TelegramBot from "node-telegram-bot-api";
import { prisma } from "./db";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand";

const WEB_APP_URL = process.env.WEB_APP_URL || `${BRAND_URL}/wizard`;

let botInstance: TelegramBot | null = null;

export function getTelegramBotToken(): string | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  return token || null;
}

export function isTelegramBotConfigured(): boolean {
  return !!getTelegramBotToken();
}

export function getBot(): TelegramBot {
  const token = getTelegramBotToken();
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }
  if (!botInstance) {
    botInstance = new TelegramBot(token, { polling: false });
  }
  return botInstance;
}

function appUrls() {
  const base = (process.env.WEB_APP_URL || `${BRAND_URL}/wizard`).replace(/\/$/, "");
  const wizardUrl = base.includes("/wizard") ? base : `${base}/wizard`;
  const siteBase = wizardUrl.replace(/\/wizard$/, "") || BRAND_URL;
  return { wizardUrl, siteBase, catalogUrl: `${siteBase}/catalog` };
}

export async function upsertBotUser(msg: TelegramBot.Message) {
  const user = msg.from;
  if (!user) return null;

  const telegramId = String(user.id);
  const chatId = String(msg.chat.id);

  return prisma.user.upsert({
    where: { telegramId },
    create: {
      telegramId,
      username: user.username || null,
      firstName: user.first_name,
      lastName: user.last_name || null,
      languageCode: user.language_code || "uk",
      chatId,
      isBot: user.is_bot || false,
    },
    update: {
      username: user.username || null,
      firstName: user.first_name,
      lastName: user.last_name || null,
      languageCode: user.language_code || "uk",
      chatId,
    },
  });
}

function welcomeKeyboard() {
  const { wizardUrl, catalogUrl } = appUrls();
  return {
    inline_keyboard: [
      [{ text: "✨ Підібрати авто за 2 хв", web_app: { url: wizardUrl } }],
      [{ text: "🚗 Переглянути каталог", web_app: { url: catalogUrl } }],
    ],
  };
}

export async function sendWelcomeMessage(
  chatId: number | string,
  firstName: string,
  bot: TelegramBot = getBot()
) {
  const name = (firstName?.trim() || "друже")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const text = `Привіт, <b>${name}</b>! 👋

Раді бачити вас у <b>${BRAND_NAME}</b>.

Ми допомагаємо обрати авто в лізинг під ваш бюджет і комфортний щомісячний платіж — прозоро, без зайвих кроків і без зобовʼязань.

Що можна зробити зараз:
• швидко підібрати варіанти під себе
• переглянути актуальний каталог

Оберіть, з чого почати 👇`;

  await bot.sendMessage(chatId, text, {
    parse_mode: "HTML",
    reply_markup: welcomeKeyboard(),
  });
}

export async function handleStartCommand(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const user = msg.from;
  const bot = getBot();

  if (!user) return;

  try {
    await upsertBotUser(msg);

    const commandText = msg.text || "";
    const carIdMatch = commandText.match(/\/start\s+car_(\d+)/);

    if (carIdMatch) {
      const carId = parseInt(carIdMatch[1], 10);
      const car = await prisma.car.findUnique({
        where: { id: carId },
        select: { id: true, title: true },
      });

      if (car) {
        const { siteBase } = appUrls();
        await bot.sendMessage(
          chatId,
          `👇🏻 З вами поділились авто:

${car.title}

Натисніть кнопку для перегляду:`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚗 Переглянути авто",
                    web_app: { url: `${siteBase}/car/${car.id}` },
                  },
                ],
                [{ text: "⭐ Підібрати авто", web_app: { url: appUrls().wizardUrl } }],
              ],
            },
          }
        );
        return;
      }
    }

    await sendWelcomeMessage(chatId, user.first_name, bot);
  } catch (error) {
    console.error("Error handling start command:", error);
    try {
      await bot.sendMessage(chatId, "Вибачте, сталася помилка. Спробуйте пізніше.");
    } catch {
      /* ignore */
    }
  }
}

export async function handleHelpCommand(msg: TelegramBot.Message) {
  const bot = getBot();
  await bot.sendMessage(
    msg.chat.id,
    `Допомога ${BRAND_NAME}:

/start — головне меню та застосунок
/app — відкрити підбір авто
/help — ця підказка`
  );
}

export async function handleAppCommand(msg: TelegramBot.Message) {
  await upsertBotUser(msg);
  const bot = getBot();
  const { wizardUrl } = appUrls();
  await bot.sendMessage(msg.chat.id, "Відкрийте підбір авто:", {
    reply_markup: {
      inline_keyboard: [[{ text: "⭐ Відкрити застосунок", web_app: { url: wizardUrl } }]],
    },
  });
}

export async function handleWebhookUpdate(update: TelegramBot.Update) {
  const text = update.message?.text;
  if (!text || !update.message) return;

  if (text === "/start" || text.startsWith("/start")) {
    await handleStartCommand(update.message);
    return;
  }
  if (text === "/help" || text.startsWith("/help")) {
    await handleHelpCommand(update.message);
    return;
  }
  if (text === "/app" || text.startsWith("/app")) {
    await handleAppCommand(update.message);
  }
}

export type BroadcastLinkButton = {
  text: string;
  url: string;
};

export type BroadcastResult = {
  total: number;
  sent: number;
  failed: number;
  errors: { chatId: string; error: string }[];
};

function buildBroadcastKeyboard(params: {
  withAppButton?: boolean;
  buttons?: BroadcastLinkButton[];
}): TelegramBot.InlineKeyboardMarkup | undefined {
  const rows: TelegramBot.InlineKeyboardButton[][] = [];
  const { wizardUrl } = appUrls();

  for (const btn of params.buttons || []) {
    const label = btn.text?.trim();
    const url = btn.url?.trim();
    if (!label || !url) continue;
    rows.push([{ text: label.slice(0, 64), url }]);
  }

  if (params.withAppButton) {
    rows.push([{ text: "✨ Відкрити застосунок", web_app: { url: wizardUrl } }]);
  }

  if (rows.length === 0) return undefined;
  return { inline_keyboard: rows };
}

/** Розсилка всім користувачам бота з chatId. */
export async function broadcastToAllUsers(params: {
  text: string;
  withAppButton?: boolean;
  buttons?: BroadcastLinkButton[];
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
  photoPath?: string | null;
}): Promise<BroadcastResult> {
  const bot = getBot();
  const users = await prisma.user.findMany({
    where: { chatId: { not: null }, isBot: false },
    select: { chatId: true, telegramId: true },
  });

  const uniqueChats = Array.from(
    new Map(
      users
        .filter((u) => u.chatId)
        .map((u) => [u.chatId as string, u.chatId as string])
    ).values()
  );

  const result: BroadcastResult = {
    total: uniqueChats.length,
    sent: 0,
    failed: 0,
    errors: [],
  };

  const replyMarkup = buildBroadcastKeyboard({
    withAppButton: params.withAppButton,
    buttons: params.buttons,
  });

  const parseMode = params.parseMode || "HTML";
  const hasPhoto = Boolean(params.photoPath);

  for (const chatId of uniqueChats) {
    try {
      if (hasPhoto && params.photoPath) {
        const caption =
          params.text.length > 1024 ? `${params.text.slice(0, 1020)}…` : params.text;
        await bot.sendPhoto(chatId, params.photoPath, {
          caption,
          parse_mode: parseMode,
          reply_markup: replyMarkup,
        });
        if (params.text.length > 1024) {
          await bot.sendMessage(chatId, params.text, {
            parse_mode: parseMode,
            disable_web_page_preview: true,
          });
        }
      } else {
        await bot.sendMessage(chatId, params.text, {
          parse_mode: parseMode,
          reply_markup: replyMarkup,
          disable_web_page_preview: true,
        });
      }
      result.sent += 1;
      await new Promise((r) => setTimeout(r, 40));
    } catch (e) {
      result.failed += 1;
      result.errors.push({
        chatId,
        error: e instanceof Error ? e.message : "send failed",
      });
      if (result.errors.length > 20) {
        result.errors = result.errors.slice(0, 20);
      }
    }
  }

  return result;
}

export async function countBroadcastAudience(): Promise<number> {
  const users = await prisma.user.findMany({
    where: { chatId: { not: null }, isBot: false },
    select: { chatId: true },
  });
  return new Set(users.map((u) => u.chatId).filter(Boolean)).size;
}

// keep export for older imports
export { WEB_APP_URL };
