export type WizardStep =
  | "hero"
  | "start-option"
  | "car-info"
  | "price-valuation"
  | "additional-cash"
  | "monthly-payment"
  | "term"
  | "motivation"
  | "car-prefs"
  | "loader"
  | "results"
  | "strategy";

export type StartOption = "has-car" | "has-cash" | "has-both";

export interface BudgetProfileSummary {
  startMoneyUah: number;
  comfortablePaymentUah: number;
  maxPaymentUah: number;
  comfortBudgetUah: number;
  optimumBudgetUah: number;
  maximumBudgetUah: number;
  recommendedBudgetUah: number;
  recommendedBudgetUsd: number;
  maximumBudgetUsd: number;
}

export interface WizardState {
  step: WizardStep;
  startOption?: StartOption;
  currentCarBrand?: string;
  currentCarModel?: string;
  currentCarYear?: number;
  currentCarMileage?: number;
  currentCarPrice: number;
  /** Додатковий внесок у гривнях */
  additionalCash: number;
  /** Комфортний платіж у гривнях */
  monthlyPayment: number;
  termMonths: number;
  motivations: string[];
  bodyTypes: string[];
  brands: string[];
  maxBudget?: number;
  totalStartBudget?: number;
  budgetProfile?: BudgetProfileSummary;
  selectedCarId?: number;
  selectedCarLabel?: string;
  phone?: string;
}

export interface LeasingConfig {
  annualRate: number;
  optimalAdvance: number;
  accessibleAdvance: number;
  orgFee: number;
  kaskoRate: number;
  serviceRate: number;
  insuranceMonths: number;
  maxPaymentMultiplier: number;
}

export interface WizardConfig {
  k: number;
  defaultTermMonths: number;
  paymentMin: number;
  paymentMax: number;
  paymentStep: number;
  defaultMonthlyPayment: number;
  bitrixWebhookUrl: string;
  leasing: LeasingConfig;
  motivations: { id: string; label: string }[];
  bodyTypes: { id: string; label: string; icon?: string }[];
  /** Popular brand ids shown in wizard BrandPicker (from WIZARD_BRANDS) */
  popularBrandIds: string[];
}

export interface MatchedCar {
  id: number;
  title: string;
  photo: string | null;
  year: number;
  brand: string;
  mark: string;
  mileage: number;
  price: number;
  priceUSD: string;
  monthlyPayment: number;
  monthlyPaymentUah: number;
}

export const PROGRESS_LABELS = ["Бюджет", "Побажання", "Варіанти", "Стратегія"];

export function getProgressSegment(step: WizardStep): number {
  if (["start-option", "car-info", "price-valuation", "additional-cash", "monthly-payment", "term"].includes(step)) {
    return 0;
  }
  if (["motivation", "car-prefs"].includes(step)) {
    return 1;
  }
  if (["loader", "results"].includes(step)) {
    return 2;
  }
  if (step === "strategy") {
    return 3;
  }
  return -1;
}

export function defaultWizardState(): WizardState {
  return {
    step: "hero",
    currentCarPrice: 0,
    additionalCash: 0,
    monthlyPayment: 18000,
    termMonths: 36,
    motivations: [],
    bodyTypes: [],
    brands: [],
  };
}
