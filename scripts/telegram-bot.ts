import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import {
  handleAppCommand,
  handleHelpCommand,
  handleStartCommand,
} from "../lib/telegram-bot";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not set in .env");
  process.exit(1);
}

if (!/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  console.error("❌ Invalid TELEGRAM_BOT_TOKEN format");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot
  .getMe()
  .then((info) => {
    console.log(`✅ Bot @${info.username} online (polling)`);
  })
  .catch((error) => {
    console.error("❌ Failed to connect:", error.message);
    process.exit(1);
  });

bot.onText(/\/start(?:\s+.*)?/, async (msg) => {
  await handleStartCommand(msg);
});

bot.onText(/\/help(?:\s+.*)?/, async (msg) => {
  await handleHelpCommand(msg);
});

bot.onText(/\/app(?:\s+.*)?/, async (msg) => {
  await handleAppCommand(msg);
});

bot.on("error", (error) => console.error("❌ Bot error:", error));
bot.on("polling_error", (error) => console.error("❌ Polling error:", error));

process.on("SIGINT", () => {
  bot.stopPolling();
  process.exit(0);
});
process.on("SIGTERM", () => {
  bot.stopPolling();
  process.exit(0);
});
