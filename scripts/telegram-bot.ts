import dotenv from "dotenv";
import { run } from "node-telegram-bot-api/node";
import { ensureBot, getTelegramBotToken } from "../lib/telegram-bot";

dotenv.config();

const BOT_TOKEN = getTelegramBotToken();

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not set in .env");
  process.exit(1);
}

if (!/^\d+:[A-Za-z0-9_-]+$/.test(BOT_TOKEN)) {
  console.error("❌ Invalid TELEGRAM_BOT_TOKEN format");
  process.exit(1);
}

async function main() {
  const bot = ensureBot();

  try {
    const me = await bot.api.getMe();
    console.log(`✅ Bot @${me.username} online (polling)`);
  } catch (error) {
    console.error("❌ Failed to connect:", error instanceof Error ? error.message : error);
    process.exit(1);
  }

  bot.catch((err) => console.error("❌ Bot error:", err));

  await run(bot);
}

main().catch((error) => {
  console.error("❌ Bot crashed:", error);
  process.exit(1);
});
