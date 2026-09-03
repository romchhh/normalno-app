import { NextRequest, NextResponse } from "next/server";
import { BRAND_URL } from "@/lib/brand";
import { isBitrixConfigured, sendLeadToBitrix } from "@/lib/bitrix";
import { createLead } from "@/lib/leads";
import { readAppSettings } from "@/lib/app-settings";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function getTelegramChatId(): Promise<string | null> {
  try {
    const settings = await readAppSettings();
    if (settings.telegramChatId) return settings.telegramChatId;
    return process.env.TELEGRAM_CHAT_ID?.trim() || null;
  } catch (error) {
    console.error("[getTelegramChatId] Error:", error);
    return process.env.TELEGRAM_CHAT_ID?.trim() || null;
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

