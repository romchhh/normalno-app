import { NextRequest, NextResponse } from "next/server";
import { sendWizardLeadToBitrix, isBitrixConfigured } from "@/lib/bitrix";
import { getWizardConfig } from "@/lib/wizard/config";
import { saveWizardSession, upsertTelegramUser } from "@/lib/wizard/session";
import { createLead } from "@/lib/leads";
import type { WizardState } from "@/lib/wizard/types";
import { prisma } from "@/lib/db";
import {
  allowUnvalidatedTelegram,
  validateTelegramInitData,
} from "@/lib/telegram-initdata";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      telegramId: clientTelegramId,
      state,
      phone,
      user: clientUser,
      initData,
    } = body as {
      telegramId: string;
      state: WizardState;
      phone: string;
      initData?: string;
      user: {
        firstName: string;
        lastName?: string;
        username?: string;
        languageCode?: string;
      };
    };

    if (!state || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const validated = typeof initData === "string" ? validateTelegramInitData(initData) : null;

    if (!validated && !allowUnvalidatedTelegram()) {
      return NextResponse.json({ error: "Invalid Telegram initData" }, { status: 401 });
    }

    const telegramId = validated
      ? String(validated.user.id)
      : clientTelegramId;

    const user = validated
      ? {
          firstName: validated.user.first_name,
          lastName: validated.user.last_name,
          username: validated.user.username,
          languageCode: validated.user.language_code,
        }
      : clientUser;

    if (!telegramId || !user?.firstName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const finalState: WizardState = { ...state, phone };
    await upsertTelegramUser({
      telegramId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      languageCode: user.languageCode,
      phone,
    });

    await saveWizardSession(telegramId, { ...finalState, step: "strategy" }, "strategy");

    const config = await getWizardConfig();
    const bitrix = await sendWizardLeadToBitrix(
      {
        state: finalState,
        telegramId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phone,
      },
      config.bitrixWebhookUrl || undefined
    );

    await prisma.wizardSession.update({
      where: { telegramId },
      data: {
        bitrixStatus: bitrix.ok ? "success" : "failed",
        bitrixError: bitrix.error || null,
        calculationsCount: { increment: 1 },
        phone,
      },
    });

    try {
      const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Клієнт";
      await createLead({
        name,
        phone,
        source: "wizard",
        carId: state.selectedCarId ?? null,
        carLabel: state.selectedCarLabel || null,
        telegramId,
        telegramUsername: user.username || null,
        bitrixLeadId: bitrix.leadId ?? null,
        bitrixStatus: bitrix.ok ? "success" : "failed",
        meta: {
          maxBudget: state.maxBudget,
          monthlyPayment: state.monthlyPayment,
          termMonths: state.termMonths,
          totalStartBudget: state.totalStartBudget,
          motivations: state.motivations,
          bodyTypes: state.bodyTypes,
          brands: state.brands,
          dealId: bitrix.dealId ?? null,
        },
      });
    } catch (e) {
      console.error("Failed to save wizard lead locally:", e);
    }

    if (!bitrix.ok && isBitrixConfigured(config.bitrixWebhookUrl || undefined)) {
      return NextResponse.json(
        { success: false, error: bitrix.error, saved: true },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      bitrixSent: bitrix.ok,
      leadId: bitrix.leadId,
      dealId: bitrix.dealId,
    });
  } catch (e) {
    console.error("Strategy submit error:", e);
    return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  }
}
