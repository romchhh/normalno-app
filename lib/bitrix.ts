import { resolveBrandLabels } from "@/lib/brands";
import { convertUAHToUSD, convertUSDToUAH } from "@/lib/currency-converter";
import type { WizardState } from "@/lib/wizard/types";

/** Поля ліда в Bitrix24 (перевірено через crm.lead.fields) */
export const BITRIX_LEAD_FIELDS = {
  TELEGRAM_ID: "UF_CRM_TELEGRAMID_WZ",
  TELEGRAM_USERNAME: "UF_CRM_TELEGRAMUSERNAME_WZ",
  CURRENT_CAR: "UF_CRM_LEAD_1700666250717",
  CURRENT_CAR_SUMMARY: "UF_CRM_1637597123912",
  CURRENT_CAR_PRICE: "UF_CRM_1644237585",
  CAR_YEAR: "UF_CRM_1604663543",
  CAR_BRAND: "UF_CRM_1604663495",
  ADDITIONAL_CASH: "UF_CRM_1782122109410",
  MONTHLY_PAYMENT: "UF_CRM_1782122084565",
  TERM: "UF_CRM_1782125703647",
  BODY_TYPE: "UF_CRM_1770726493",
  DESIRED_CAR: "UF_CRM_LEAD_1701783274065",
  SELECTED_CAR: "UF_CRM_1767948529026",
} as const;

type BitrixLeadResponse = {
  result?: number;
  error?: string;
  error_description?: string;
};

export type LeadSource = "wizard" | "contact" | "order" | "modal" | "section";

export type SimpleLeadPayload = {
  name: string;
  phone: string;
  comment?: string;
  source?: LeadSource;
  carInfo?: {
    id?: number;
    title?: string;
    brand?: string | null;
    mark?: string | null;
    year?: number | null;
    priceUSD?: string | null;
  } | null;
};

export type WizardLeadPayload = {
  state: WizardState;
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  phone: string;
};

function getBitrixWebhookUrl(override?: string): string | null {
  const fromOverride = override?.trim().replace(/\/$/, "");
  if (fromOverride) return fromOverride;

  const fromEnv = process.env.BITRIX_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  return null;
}

export function isBitrixConfigured(override?: string): boolean {
  return getBitrixWebhookUrl(override) !== null;
}

function sourceLabel(source: LeadSource): string {
  switch (source) {
    case "wizard":
      return "NORMALNO Wizard (Telegram Mini App)";
    case "order":
      return "Замовлення на сайті";
    case "contact":
      return "Форма зв'язку";
    case "modal":
      return "Модальне вікно";
    case "section":
      return "Форма на сайті";
    default:
      return "normalno-auto.com";
  }
}

async function callBitrixMethod(
  method: string,
  fields: Record<string, unknown>,
  webhookUrl: string
): Promise<{ ok: boolean; id?: number; error?: string }> {
  const url = `${webhookUrl}/${method}.json`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });

    let data: BitrixLeadResponse;
    try {
      data = await response.json();
    } catch {
      return { ok: false, error: "Bitrix повернув невалідну відповідь" };
    }

    if (!response.ok || data.error || typeof data.result !== "number") {
      return {
        ok: false,
        error: data.error_description || data.error || `HTTP ${response.status}`,
      };
    }

    return { ok: true, id: data.result };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Помилка запиту до Bitrix24",
    };
  }
}

async function callBitrixLeadAdd(
  fields: Record<string, unknown>,
  webhookUrl: string
): Promise<{ ok: boolean; leadId?: number; error?: string }> {
  const result = await callBitrixMethod("crm.lead.add", fields, webhookUrl);
  return { ok: result.ok, leadId: result.id, error: result.error };
}

async function callBitrixDealAdd(
  fields: Record<string, unknown>,
  webhookUrl: string
): Promise<{ ok: boolean; dealId?: number; error?: string }> {
  const result = await callBitrixMethod("crm.deal.add", fields, webhookUrl);
  return { ok: result.ok, dealId: result.id, error: result.error };
}

function buildWizardDealFields(payload: WizardLeadPayload): Record<string, unknown> {
  const { state, telegramId, firstName, lastName, username, phone } = payload;
  const totalStartUah =
    state.totalStartBudget ??
    convertUSDToUAH(state.currentCarPrice) + state.additionalCash;

  const fields: Record<string, unknown> = {
    TITLE: `NORMALNO Strategy — ${firstName}${lastName ? ` ${lastName}` : ""}`,
    COMMENTS: [
      buildWizardComments(state, telegramId, username),
      `Телефон: ${phone}`,
      `Імʼя: ${firstName}${lastName ? ` ${lastName}` : ""}`,
    ].join("\n\n"),
    CURRENCY_ID: "USD",
    OPPORTUNITY: state.maxBudget ?? convertUAHToUSD(totalStartUah),
  };

  const categoryId = process.env.BITRIX_DEAL_CATEGORY_ID?.trim();
  const stageId = process.env.BITRIX_DEAL_STAGE_ID?.trim();
  if (categoryId) fields.CATEGORY_ID = categoryId;
  if (stageId) fields.STAGE_ID = stageId;

  return fields;
}

function formatCurrentCar(state: WizardState): string {
  if (!state.currentCarBrand && !state.currentCarModel) return "";
  const parts = [
    state.currentCarBrand,
    state.currentCarModel,
    state.currentCarYear ? String(state.currentCarYear) : "",
    state.currentCarMileage ? `(${state.currentCarMileage} км)` : "",
  ].filter(Boolean);
  return parts.join(" ").trim();
}

function buildWizardComments(state: WizardState, telegramId: string, username?: string): string {
  const lines = [
    "=== NORMALNO Wizard ===",
    `Telegram ID: ${telegramId}`,
    username ? `Telegram: @${username}` : null,
    state.startOption ? `Стартовий варіант: ${state.startOption}` : null,
    `Стартовий бюджет: ${state.totalStartBudget ? `${state.totalStartBudget.toLocaleString("uk-UA")} грн` : "—"}`,
    state.budgetProfile
      ? `Рекомендований бюджет: ${state.budgetProfile.recommendedBudgetUah.toLocaleString("uk-UA")} грн`
      : null,
    state.budgetProfile
      ? `Макс. бюджет: ${state.budgetProfile.maximumBudgetUah.toLocaleString("uk-UA")} грн`
      : `Макс. бюджет: $${state.maxBudget ?? "—"}`,
    `Комфортний платіж: ${state.monthlyPayment.toLocaleString("uk-UA")} грн/міс`,
    state.motivations.length ? `Мотивація: ${state.motivations.join(", ")}` : null,
    state.bodyTypes.length ? `Тип кузова: ${state.bodyTypes.join(", ")}` : null,
    state.brands.length ? `Марки: ${resolveBrandLabels(state.brands).join(", ")}` : null,
    state.selectedCarLabel ? `Обране авто: ${state.selectedCarLabel}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildWizardLeadFields(payload: WizardLeadPayload): Record<string, unknown> {
  const { state, telegramId, firstName, lastName, username, phone } = payload;
  const currentCar = formatCurrentCar(state);
  const totalStartUah =
    state.totalStartBudget ??
    convertUSDToUAH(state.currentCarPrice) + state.additionalCash;

  const fields: Record<string, unknown> = {
    TITLE: `NORMALNO Strategy — ${firstName}${lastName ? ` ${lastName}` : ""}`,
    NAME: firstName,
    LAST_NAME: lastName || "",
    PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
    SOURCE_ID: "WEB",
    SOURCE_DESCRIPTION: sourceLabel("wizard"),
    CURRENCY_ID: "USD",
    OPPORTUNITY: state.maxBudget ?? convertUAHToUSD(totalStartUah),
    COMMENTS: buildWizardComments(state, telegramId, username),

    [BITRIX_LEAD_FIELDS.TELEGRAM_ID]: telegramId,
    [BITRIX_LEAD_FIELDS.TELEGRAM_USERNAME]: username ? `@${username}` : "",
    [BITRIX_LEAD_FIELDS.MONTHLY_PAYMENT]: String(state.monthlyPayment),
    [BITRIX_LEAD_FIELDS.TERM]: String(state.termMonths),
    [BITRIX_LEAD_FIELDS.ADDITIONAL_CASH]: String(state.additionalCash),
    [BITRIX_LEAD_FIELDS.CURRENT_CAR_PRICE]: String(state.currentCarPrice),
  };

  if (currentCar) {
    fields[BITRIX_LEAD_FIELDS.CURRENT_CAR] = currentCar;
    fields[BITRIX_LEAD_FIELDS.CURRENT_CAR_SUMMARY] = currentCar;
  }

  if (state.currentCarYear) {
    fields[BITRIX_LEAD_FIELDS.CAR_YEAR] = String(state.currentCarYear);
  }

  if (state.currentCarBrand) {
    fields[BITRIX_LEAD_FIELDS.CAR_BRAND] = state.currentCarBrand;
  }

  if (state.bodyTypes.length) {
    fields[BITRIX_LEAD_FIELDS.BODY_TYPE] = state.bodyTypes.join(", ");
  }

  if (state.brands.length) {
    fields[BITRIX_LEAD_FIELDS.DESIRED_CAR] = resolveBrandLabels(state.brands).join(", ");
  }

  if (state.selectedCarLabel) {
    fields[BITRIX_LEAD_FIELDS.SELECTED_CAR] = state.selectedCarLabel;
  }

  return fields;
}

export function buildSimpleLeadFields(payload: SimpleLeadPayload): Record<string, unknown> {
  const source = payload.source || "contact";
  const commentParts: string[] = [];

  if (payload.comment?.trim()) {
    commentParts.push(payload.comment.trim());
  }

  if (payload.carInfo) {
    const c = payload.carInfo;
    commentParts.push(
      [
        "=== Авто ===",
        c.title ? `Назва: ${c.title}` : null,
        c.brand ? `Марка: ${c.brand}` : null,
        c.mark ? `Модель: ${c.mark}` : null,
        c.year ? `Рік: ${c.year}` : null,
        c.priceUSD ? `Ціна: $${c.priceUSD}` : null,
        c.id ? `ID: ${c.id}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  commentParts.push(`Джерело: ${sourceLabel(source)}`);

  return {
    TITLE: `Заявка NORMALNO — ${payload.name}`,
    NAME: payload.name,
    PHONE: [{ VALUE: payload.phone, VALUE_TYPE: "WORK" }],
    SOURCE_ID: "WEB",
    SOURCE_DESCRIPTION: sourceLabel(source),
    COMMENTS: commentParts.join("\n\n"),
  };
}

export async function sendWizardLeadToBitrix(
  payload: WizardLeadPayload,
  webhookOverride?: string
): Promise<{ ok: boolean; leadId?: number; dealId?: number; error?: string }> {
  const webhookUrl = getBitrixWebhookUrl(webhookOverride);
  if (!webhookUrl) {
    return { ok: false, error: "Bitrix не налаштовано: додайте BITRIX_URL в .env" };
  }

  // ТЗ: угода (Deal) у воронці + лід із UF-полями для зворотної сумісності
  const deal = await callBitrixDealAdd(buildWizardDealFields(payload), webhookUrl);
  const lead = await callBitrixLeadAdd(buildWizardLeadFields(payload), webhookUrl);

  if (deal.ok || lead.ok) {
    return {
      ok: true,
      dealId: deal.dealId,
      leadId: lead.leadId,
      error: !deal.ok ? `Deal: ${deal.error}` : !lead.ok ? `Lead: ${lead.error}` : undefined,
    };
  }

  return {
    ok: false,
    error: [deal.error && `Deal: ${deal.error}`, lead.error && `Lead: ${lead.error}`]
      .filter(Boolean)
      .join("; "),
  };
}

export async function sendLeadToBitrix(
  payload: SimpleLeadPayload,
  webhookOverride?: string
): Promise<{ ok: boolean; leadId?: number; error?: string }> {
  const webhookUrl = getBitrixWebhookUrl(webhookOverride);
  if (!webhookUrl) {
    return { ok: false, error: "Bitrix не налаштовано: додайте BITRIX_URL в .env" };
  }

  return callBitrixLeadAdd(buildSimpleLeadFields(payload), webhookUrl);
}
