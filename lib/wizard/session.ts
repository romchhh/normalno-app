import { prisma } from "@/lib/db";
import type { WizardState } from "./types";

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function sessionToState(row: {
  startOption: string | null;
  currentCarBrand: string | null;
  currentCarModel: string | null;
  currentCarYear: number | null;
  currentCarMileage: number | null;
  currentCarPrice: number;
  additionalCash: number;
  monthlyPayment: number;
  termMonths: number;
  motivations: string;
  bodyTypes: string;
  brandPrefs: string;
  maxBudget: number | null;
  totalStartBudget: number | null;
  selectedCarId: number | null;
  selectedCarLabel: string | null;
  currentStep: string;
  phone: string | null;
}): WizardState {
  return {
    step: row.currentStep as WizardState["step"],
    startOption: (row.startOption as WizardState["startOption"]) || undefined,
    currentCarBrand: row.currentCarBrand || undefined,
    currentCarModel: row.currentCarModel || undefined,
    currentCarYear: row.currentCarYear || undefined,
    currentCarMileage: row.currentCarMileage || undefined,
    currentCarPrice: row.currentCarPrice,
    additionalCash: row.additionalCash,
    monthlyPayment: row.monthlyPayment,
    termMonths: row.termMonths,
    motivations: parseJsonArray(row.motivations),
    bodyTypes: parseJsonArray(row.bodyTypes),
    brands: parseJsonArray(row.brandPrefs),
    maxBudget: row.maxBudget ?? undefined,
    totalStartBudget: row.totalStartBudget ?? undefined,
    selectedCarId: row.selectedCarId ?? undefined,
    selectedCarLabel: row.selectedCarLabel ?? undefined,
    phone: row.phone ?? undefined,
  };
}

export async function getWizardSession(telegramId: string) {
  return prisma.wizardSession.findUnique({ where: { telegramId } });
}

export async function saveWizardSession(
  telegramId: string,
  state: WizardState,
  funnelStep?: string
) {
  const existing = await getWizardSession(telegramId);
  let funnelSteps: string[] = [];
  if (existing?.funnelSteps) {
    funnelSteps = parseJsonArray(existing.funnelSteps);
  }
  if (funnelStep && !funnelSteps.includes(funnelStep)) {
    funnelSteps.push(funnelStep);
  }

  const data = {
    startOption: state.startOption || null,
    currentCarBrand: state.currentCarBrand || null,
    currentCarModel: state.currentCarModel || null,
    currentCarYear: state.currentCarYear ?? null,
    currentCarMileage: state.currentCarMileage ?? null,
    currentCarPrice: state.currentCarPrice,
    additionalCash: state.additionalCash,
    monthlyPayment: state.monthlyPayment,
    termMonths: state.termMonths,
    motivations: JSON.stringify(state.motivations),
    bodyTypes: JSON.stringify(state.bodyTypes),
    brandPrefs: JSON.stringify(state.brands),
    maxBudget: state.maxBudget ?? null,
    totalStartBudget: state.totalStartBudget ?? null,
    selectedCarId: state.selectedCarId ?? null,
    selectedCarLabel: state.selectedCarLabel || null,
    currentStep: state.step,
    phone: state.phone || null,
    funnelSteps: JSON.stringify(funnelSteps),
  };

  return prisma.wizardSession.upsert({
    where: { telegramId },
    create: { telegramId, ...data },
    update: data,
  });
}

export async function upsertTelegramUser(params: {
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  chatId?: string;
  phone?: string;
}) {
  return prisma.user.upsert({
    where: { telegramId: params.telegramId },
    create: {
      telegramId: params.telegramId,
      firstName: params.firstName,
      lastName: params.lastName || null,
      username: params.username || null,
      languageCode: params.languageCode || "uk",
      chatId: params.chatId || null,
      isBot: false,
      phone: params.phone || null,
    },
    update: {
      firstName: params.firstName,
      lastName: params.lastName || null,
      username: params.username || null,
      phone: params.phone || undefined,
      ...(params.chatId ? { chatId: params.chatId } : {}),
      ...(params.languageCode ? { languageCode: params.languageCode } : {}),
    },
  });
}
