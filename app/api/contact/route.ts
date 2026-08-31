import { NextRequest, NextResponse } from "next/server";
import { BRAND_URL } from "@/lib/brand";
import { isBitrixConfigured, sendLeadToBitrix } from "@/lib/bitrix";
import { createLead } from "@/lib/leads";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

// Get Telegram Chat ID from settings or env
async function getTelegramChatId(): Promise<string | null> {
  try {
    // Try to read from settings file first
    if (existsSync(SETTINGS_FILE)) {
      console.log("[getTelegramChatId] Reading from settings file:", SETTINGS_FILE);
      const fileContent = await readFile(SETTINGS_FILE, "utf-8");
      const settings = JSON.parse(fileContent);
      console.log("[getTelegramChatId] Settings from file:", settings);
      
      if (settings.telegramChatId && settings.telegramChatId.trim() !== "") {
        console.log("[getTelegramChatId] Using Chat ID from settings:", settings.telegramChatId);
        return settings.telegramChatId.trim();
      } else {
        console.log("[getTelegramChatId] Chat ID not found in settings file or is empty");
      }
    } else {
      console.log("[getTelegramChatId] Settings file does not exist:", SETTINGS_FILE);
    }
    
    // Fallback to env variable
    const envChatId = process.env.TELEGRAM_CHAT_ID;
    if (envChatId) {
      console.log("[getTelegramChatId] Using Chat ID from env variable");
      return envChatId;
    }
    
    console.log("[getTelegramChatId] Chat ID not found in settings or env");
    return null;
  } catch (error: unknown) {
    console.error("[getTelegramChatId] Error reading settings:", error);
    if (error instanceof Error) {
      console.error("[getTelegramChatId] Error stack:", error.stack);
    }
    // Fallback to env variable
    const envChatId = process.env.TELEGRAM_CHAT_ID;
    if (envChatId) {
      console.log("[getTelegramChatId] Using Chat ID from env variable (fallback)");
      return envChatId;
    }
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, carInfo, formType } = body;

    const TELEGRAM_CHAT_ID = await getTelegramChatId();

    if (!TELEGRAM_BOT_TOKEN) {
      console.error("TELEGRAM_BOT_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "Telegram bot token is not configured. Please set TELEGRAM_BOT_TOKEN in .env file." },
        { status: 500 }
      );
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_CHAT_ID is not set. Check settings or .env file.");
      return NextResponse.json(
        { error: "Telegram chat ID is not configured. Please set it in admin settings or TELEGRAM_CHAT_ID in .env file." },
        { status: 500 }
      );
    }

    // Build message text
    let messageText = `🔔 *Новий запит з сайту*\n\n`;
    messageText += `📋 *Тип форми:* ${formType === "order" ? "Замовлення" : "Зв&apos;язок"}\n\n`;
    messageText += `👤 *Ім&apos;я:* ${name}\n`;
    messageText += `📞 *Телефон:* ${phone}\n`;

    if (message) {
      messageText += `💬 *Повідомлення:* ${message}\n`;
    }

    if (carInfo) {
      messageText += `\n🚗 *Інформація про авто:*\n`;
      messageText += `   • *Назва:* ${carInfo.title || "Не вказано"}\n`;
      messageText += `   • *Марка:* ${carInfo.brand || "Не вказано"}\n`;
      messageText += `   • *Модель:* ${carInfo.mark || "Не вказано"}\n`;
      messageText += `   • *Рік:* ${carInfo.year || "Не вказано"}\n`;
      messageText += `   • *Ціна:* ${carInfo.priceUSD ? `$${carInfo.priceUSD}` : "Ціну потрібно уточнити"}\n`;
      if (carInfo.id) {
        messageText += `   • *ID:* ${carInfo.id}\n`;
        messageText += `   • *Посилання:* ${BRAND_URL}/car/${carInfo.id}\n`;
      }
    }

    messageText += `\n⏰ *Час:* ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 500 }
      );
    }

    let bitrixLeadId: number | undefined;
    let bitrixStatus: string | null = null;
    if (isBitrixConfigured()) {
      const bitrix = await sendLeadToBitrix({
        name,
        phone,
        comment: message,
        source: formType === "order" ? "order" : "contact",
        carInfo,
      });
      if (!bitrix.ok) {
        console.error("Bitrix lead error:", bitrix.error);
        bitrixStatus = "failed";
      } else {
        bitrixLeadId = bitrix.leadId;
        bitrixStatus = "success";
      }
    }

    try {
      await createLead({
        name,
        phone,
        message: message || null,
        source: formType === "order" ? "order" : "contact",
        carId: carInfo?.id ? Number(carInfo.id) : null,
        carLabel: carInfo
          ? [carInfo.title, carInfo.brand, carInfo.mark, carInfo.year]
              .filter(Boolean)
              .join(" ")
          : null,
        bitrixLeadId: bitrixLeadId ?? null,
        bitrixStatus,
      });
    } catch (e) {
      console.error("Failed to save lead locally:", e);
    }

    return NextResponse.json({ success: true, bitrixLeadId });
  } catch (error: unknown) {
    console.error("Error sending contact form:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

