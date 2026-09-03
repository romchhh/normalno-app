import { Bot, InlineKeyboardBuilder, Api } from "node-telegram-bot-api";
import type { InlineKeyboardMarkup, Message, Update } from "node-telegram-bot-api";
import { fromPath } from "node-telegram-bot-api/node";
import { prisma } from "./db";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand";
import { parseCarStartPayload } from "@/lib/telegram-car-links";

const WEB_APP_URL = process.env.WEB_APP_URL || `${BRAND_URL}/wizard`;

let botInstance: Bot | null = null;

export function getTelegramBotToken(): string | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  return token || null;
}

export function isTelegramBotConfigured(): boolean {
  return !!getTelegramBotToken();
}

export function registerBotHandlers(bot: Bot) {
  bot.command("start", async (ctx) => {
    if (!ctx.message || !ctx.from) return;
    const payload = typeof ctx.match === "string" ? ctx.match.trim() : "";
    const message =
      payload.length > 0
        ? { ...ctx.message, text: `/start ${payload}` }
        : ctx.message;
    await handleStartCommand(message);
  });

  bot.command("help", async (ctx) => {
    if (!ctx.message) return;
    await handleHelpCommand(ctx.message);
  });

  bot.command("app", async (ctx) => {
    if (!ctx.message) return;
    await handleAppCommand(ctx.message);
  });
}

export function ensureBot(): Bot {
  const token = getTelegramBotToken();
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }
  if (!botInstance) {
    botInstance = new Bot(token);
    registerBotHandlers(botInstance);
  }
  return botInstance;
}

export function getBot(): Bot {
  return ensureBot();
}

export function getApi(): Api {
  return ensureBot().api;
}

function appUrls() {
  const base = (process.env.WEB_APP_URL || `${BRAND_URL}/wizard`).replace(/\/$/, "");
  const wizardUrl = base.includes("/wizard") ? base : `${base}/wizard`;
  const siteBase = wizardUrl.replace(/\/wizard$/, "") || BRAND_URL;
  return { wizardUrl, siteBase, catalogUrl: `${siteBase}/catalog` };
}

export async function upsertBotUser(msg: Message) {
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

function welcomeKeyboard(): InlineKeyboardMarkup {
  const { wizardUrl, catalogUrl } = appUrls();
  return new InlineKeyboardBuilder()
    .webApp("✨ Підібрати авто за 2 хв", wizardUrl)
    .row()
    .webApp("🚗 Переглянути каталог", catalogUrl)
    .build();
}

export async function sendWelcomeMessage(
  chatId: number | string,
  firstName: string,
  api: Api = getApi()
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

  await api.sendMessage({
    chat_id: Number(chatId),
    text,
    parse_mode: "HTML",
    reply_markup: welcomeKeyboard(),
  });
}

export async function handleStartCommand(msg: Message) {
  const chatId = msg.chat.id;
  const user = msg.from;
  const api = getApi();

  if (!user) return;

  try {
    await upsertBotUser(msg);

    const commandText = msg.text || "";
    const startPayload = commandText.replace(/^\/start(?:@\w+)?\s*/i, "").trim();
    const carId = parseCarStartPayload(startPayload);

    if (carId) {
      const car = await prisma.car.findUnique({
        where: { id: carId },
        select: { id: true, title: true },
      });

      if (car) {
        const { siteBase, wizardUrl } = appUrls();
        await api.sendMessage({
          chat_id: chatId,
          text: `👇🏻 З вами поділились авто:

${car.title}

Натисніть кнопку для перегляду:`,
          reply_markup: new InlineKeyboardBuilder()
            .webApp("🚗 Переглянути авто", `${siteBase}/car/${car.id}`)
            .row()
            .webApp("⭐ Підібрати авто", wizardUrl)
            .build(),
        });
        return;
      }
    }

    await sendWelcomeMessage(chatId, user.first_name, api);
  } catch (error) {
    console.error("Error handling start command:", error);
    try {
      await api.sendMessage({
        chat_id: chatId,
        text: "Вибачте, сталася помилка. Спробуйте пізніше.",
      });
    } catch {
      /* ignore */
    }
  }
}

export async function handleHelpCommand(msg: Message) {
  await getApi().sendMessage({
    chat_id: msg.chat.id,
    text: `Допомога ${BRAND_NAME}:

/start — головне меню та застосунок
/app — відкрити підбір авто
/help — ця підказка`,
  });
}

export async function handleAppCommand(msg: Message) {
  await upsertBotUser(msg);
  const { wizardUrl } = appUrls();
  await getApi().sendMessage({
    chat_id: msg.chat.id,
    text: "Відкрийте підбір авто:",
    reply_markup: new InlineKeyboardBuilder()
      .webApp("⭐ Відкрити застосунок", wizardUrl)
      .build(),
  });
}

export async function handleWebhookUpdate(update: Update) {
  await ensureBot().handleUpdate(update);
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
}): InlineKeyboardMarkup | undefined {
  const kb = new InlineKeyboardBuilder();
  const { wizardUrl } = appUrls();
  let hasButtons = false;

  for (const btn of params.buttons || []) {
    const label = btn.text?.trim();
    const url = btn.url?.trim();
    if (!label || !url) continue;
    kb.url(label.slice(0, 64), url).row();
    hasButtons = true;
  }

  if (params.withAppButton) {
    kb.webApp("✨ Відкрити застосунок", wizardUrl);
    hasButtons = true;
  }

  return hasButtons ? kb.build() : undefined;
}

/** Розсилка всім користувачам бота з chatId. */
export async function broadcastToAllUsers(params: {
  text: string;
  withAppButton?: boolean;
  buttons?: BroadcastLinkButton[];
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
  photoPath?: string | null;
}): Promise<BroadcastResult> {
  const api = getApi();
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
        const photo = await fromPath(params.photoPath);
        await api.sendPhoto({
          chat_id: Number(chatId),
          photo,
          caption,
          parse_mode: parseMode,
          reply_markup: replyMarkup,
        });
        if (params.text.length > 1024) {
          await api.sendMessage({
            chat_id: Number(chatId),
            text: params.text,
            parse_mode: parseMode,
            link_preview_options: { is_disabled: true },
          });
        }
      } else {
        await api.sendMessage({
          chat_id: Number(chatId),
          text: params.text,
          parse_mode: parseMode,
          reply_markup: replyMarkup,
          link_preview_options: { is_disabled: true },
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

export { WEB_APP_URL };
