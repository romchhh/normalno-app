import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { WizardConfig } from "./types";

const CONFIG_FILE = path.join(process.cwd(), "data", "wizard-config.json");

/** First 6 major brands from WIZARD_BRANDS (TOR screen 9) */
const DEFAULT_POPULAR_BRAND_IDS = [
  "toyota",
  "lexus",
  "bmw",
  "mercedes-benz",
  "volkswagen",
  "tesla",
];

const DEFAULT_CONFIG: WizardConfig = {
  k: 1,
  defaultTermMonths: 36,
  paymentMin: 8000,
  paymentMax: 35000,
  paymentStep: 1000,
  defaultMonthlyPayment: 18000,
  bitrixWebhookUrl: "",
  leasing: {
    annualRate: 0.2725,
    optimalAdvance: 0.33,
    accessibleAdvance: 0.25,
    orgFee: 0.07,
    kaskoRate: 0.0175,
    serviceRate: 0.03,
    insuranceMonths: 12,
    maxPaymentMultiplier: 22 / 18,
  },
  motivations: [
    { id: "newer", label: "Новіше на 3–5 років" },
    { id: "reliable", label: "Надійніше" },
    { id: "bigger", label: "Більше / сімейніше" },
    { id: "comfort", label: "Комфортніше" },
    { id: "premium", label: "Преміальніше" },
    { id: "economy", label: "Економніше" },
  ],
  bodyTypes: [
    { id: "suv", label: "SUV", icon: "🚙" },
    { id: "sedan", label: "Sedan", icon: "🚗" },
    { id: "ev", label: "EV", icon: "⚡" },
  ],
  popularBrandIds: DEFAULT_POPULAR_BRAND_IDS,
};

export async function getWizardConfig(): Promise<WizardConfig> {
  try {
    if (existsSync(CONFIG_FILE)) {
      const raw = await readFile(CONFIG_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        leasing: { ...DEFAULT_CONFIG.leasing, ...parsed.leasing },
        popularBrandIds: Array.isArray(parsed.popularBrandIds)
          ? parsed.popularBrandIds
          : DEFAULT_CONFIG.popularBrandIds,
        motivations: Array.isArray(parsed.motivations)
          ? parsed.motivations
          : DEFAULT_CONFIG.motivations,
        bodyTypes: Array.isArray(parsed.bodyTypes)
          ? parsed.bodyTypes
          : DEFAULT_CONFIG.bodyTypes,
      };
    }
  } catch (e) {
    console.error("Failed to read wizard config:", e);
  }
  return DEFAULT_CONFIG;
}

export async function saveWizardConfig(config: Partial<WizardConfig>): Promise<WizardConfig> {
  const current = await getWizardConfig();
  const merged: WizardConfig = {
    ...current,
    ...config,
    leasing: { ...current.leasing, ...config.leasing },
    popularBrandIds: config.popularBrandIds ?? current.popularBrandIds,
    motivations: config.motivations ?? current.motivations,
    bodyTypes: config.bodyTypes ?? current.bodyTypes,
  };
  const dir = path.dirname(CONFIG_FILE);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  await writeFile(CONFIG_FILE, JSON.stringify(merged, null, 2));
  return merged;
}
