import { NextRequest, NextResponse } from "next/server";
import {
  getWizardSession,
  saveWizardSession,
  sessionToState,
  upsertTelegramUser,
} from "@/lib/wizard/session";
import type { WizardState } from "@/lib/wizard/types";
import { defaultWizardState } from "@/lib/wizard/types";

export async function GET(request: NextRequest) {
  const telegramId = request.nextUrl.searchParams.get("telegramId");
  if (!telegramId) {
    return NextResponse.json({ error: "telegramId required" }, { status: 400 });
  }

  const session = await getWizardSession(telegramId);
  if (!session) {
    return NextResponse.json({ state: defaultWizardState(), isReturning: false });
  }

  const state = sessionToState(session);
  const isReturning = state.step === "results" || state.step === "strategy";

  if (isReturning && state.step !== "results") {
    state.step = "results";
  }

  return NextResponse.json({ state, isReturning });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegramId, state, user, funnelStep } = body as {
      telegramId: string;
      state: WizardState;
      user?: {
        firstName: string;
        lastName?: string;
        username?: string;
        languageCode?: string;
      };
      funnelStep?: string;
    };

    if (!telegramId || !state) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (user?.firstName) {
      const dbUser = await upsertTelegramUser({
        telegramId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        languageCode: user.languageCode,
        phone: state.phone,
      });

      await saveWizardSession(telegramId, state, funnelStep);
      await prismaLinkUser(telegramId, dbUser.id);
    } else {
      await saveWizardSession(telegramId, state, funnelStep);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Wizard session save error:", e);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

async function prismaLinkUser(telegramId: string, userId: number) {
  const { prisma } = await import("@/lib/db");
  await prisma.wizardSession.updateMany({
    where: { telegramId },
    data: { userId },
  });
}
