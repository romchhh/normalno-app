import { convertUAHToUSD, convertUSDToUAH } from "@/lib/currency-converter";

export type LeasingProgram = "optimal" | "accessible";

export interface LeasingParams {
  annualRate: number;
  optimalAdvance: number;
  accessibleAdvance: number;
  orgFee: number;
  kaskoRate: number;
  serviceRate: number;
  insuranceMonths: number;
  maxPaymentMultiplier: number;
}

export const DEFAULT_LEASING_PARAMS: LeasingParams = {
  annualRate: 0.2725,
  optimalAdvance: 0.33,
  accessibleAdvance: 0.25,
  orgFee: 0.07,
  kaskoRate: 0.0175,
  serviceRate: 0.03,
  insuranceMonths: 12,
  maxPaymentMultiplier: 22 / 18,
};

export interface LeasingScenario {
  program: LeasingProgram;
  carPriceUah: number;
  advanceUah: number;
  orgFeeUah: number;
  startRequiredUah: number;
  startShortfallUah: number;
  netFinanceUah: number;
  financialPaymentUah: number;
  kaskoServiceMonthlyUah: number;
  totalPaymentFirstYearUah: number;
  totalPaymentAfterUah: number;
  passesStart: boolean;
  passesPayment: boolean;
  passes: boolean;
}

export interface BudgetProfile {
  startMoneyUah: number;
  comfortablePaymentUah: number;
  maxPaymentUah: number;
  termMonths: number;
  comfortBudgetUah: number;
  optimumBudgetUah: number;
  maximumBudgetUah: number;
  recommendedBudgetUah: number;
  recommendedBudgetUsd: number;
  maximumBudgetUsd: number;
  paymentPerUahOptimal: number;
  paymentPerUahAccessible: number;
}

function cashInRate(program: LeasingProgram, params: LeasingParams): number {
  const advance =
    program === "optimal" ? params.optimalAdvance : params.accessibleAdvance;
  return advance + params.orgFee;
}

function advanceRate(program: LeasingProgram, params: LeasingParams): number {
  return program === "optimal" ? params.optimalAdvance : params.accessibleAdvance;
}

export function calcFinancialPayment(
  netFinanceUah: number,
  termMonths: number,
  annualRate: number
): number {
  if (netFinanceUah <= 0 || termMonths <= 0) return 0;
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return netFinanceUah / termMonths;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (netFinanceUah * monthlyRate * factor) / (factor - 1);
}

export function calcLeasingScenario(
  carPriceUah: number,
  termMonths: number,
  program: LeasingProgram,
  params: LeasingParams = DEFAULT_LEASING_PARAMS,
  startMoneyUah = 0,
  maxMonthlyPaymentUah = Infinity
): LeasingScenario {
  const advance = advanceRate(program, params);
  const advanceUah = carPriceUah * advance;
  const orgFeeUah = carPriceUah * params.orgFee;
  const startRequiredUah = advanceUah + orgFeeUah;
  const netFinanceUah = carPriceUah * (1 - advance);
  const financialPaymentUah = calcFinancialPayment(
    netFinanceUah,
    termMonths,
    params.annualRate
  );
  const kaskoServiceMonthlyUah =
    (carPriceUah * (params.kaskoRate + params.serviceRate)) / params.insuranceMonths;
  const totalPaymentFirstYearUah = financialPaymentUah + kaskoServiceMonthlyUah;
  const totalPaymentAfterUah = financialPaymentUah;
  const passesStart = startMoneyUah <= 0 || startRequiredUah <= startMoneyUah;
  const passesPayment = maxMonthlyPaymentUah <= 0 || totalPaymentFirstYearUah <= maxMonthlyPaymentUah;

  return {
    program,
    carPriceUah,
    advanceUah: Math.round(advanceUah),
    orgFeeUah: Math.round(orgFeeUah),
    startRequiredUah: Math.round(startRequiredUah),
    startShortfallUah: Math.max(0, Math.round(startRequiredUah - startMoneyUah)),
    netFinanceUah: Math.round(netFinanceUah),
    financialPaymentUah: Math.round(financialPaymentUah),
    kaskoServiceMonthlyUah: Math.round(kaskoServiceMonthlyUah),
    totalPaymentFirstYearUah: Math.round(totalPaymentFirstYearUah),
    totalPaymentAfterUah: Math.round(totalPaymentAfterUah),
    passesStart,
    passesPayment,
    passes: passesStart && passesPayment,
  };
}

export function calcPaymentCoefficient(
  termMonths: number,
  program: LeasingProgram,
  params: LeasingParams = DEFAULT_LEASING_PARAMS
): number {
  const samplePrice = 1_000_000;
  const scenario = calcLeasingScenario(samplePrice, termMonths, program, params);
  return scenario.totalPaymentFirstYearUah / samplePrice;
}

function roundBudgetUah(amount: number): number {
  return Math.round(amount / 500) * 500;
}

export function findMaxCarPriceUah(
  startMoneyUah: number,
  maxMonthlyPaymentUah: number,
  termMonths: number,
  program: LeasingProgram,
  params: LeasingParams = DEFAULT_LEASING_PARAMS
): number {
  if (startMoneyUah <= 0 && maxMonthlyPaymentUah <= 0) return 0;

  const cashIn = cashInRate(program, params);
  const maxFromStart = cashIn > 0 ? startMoneyUah / cashIn : 0;
  let lo = 0;
  let hi = Math.max(0, Math.floor(maxFromStart));
  let answer = 0;

  for (let i = 0; i < 50; i++) {
    const mid = Math.floor((lo + hi) / 2);
    const scenario = calcLeasingScenario(
      mid,
      termMonths,
      program,
      params,
      startMoneyUah,
      maxMonthlyPaymentUah
    );
    if (scenario.passes) {
      answer = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return roundBudgetUah(answer);
}

export function calcBudgetProfile(
  currentCarPriceUsd: number,
  additionalCashUah: number,
  comfortablePaymentUah: number,
  termMonths: number,
  params: LeasingParams = DEFAULT_LEASING_PARAMS
): BudgetProfile {
  const startMoneyUah = convertUSDToUAH(currentCarPriceUsd) + additionalCashUah;
  const maxPaymentUah = Math.round(comfortablePaymentUah * params.maxPaymentMultiplier);

  const comfortBudgetUah = findMaxCarPriceUah(
    startMoneyUah,
    comfortablePaymentUah,
    termMonths,
    "optimal",
    params
  );
  const optimumBudgetUah = findMaxCarPriceUah(
    startMoneyUah,
    maxPaymentUah,
    termMonths,
    "optimal",
    params
  );
  const maximumBudgetUah = findMaxCarPriceUah(
    startMoneyUah,
    maxPaymentUah,
    termMonths,
    "accessible",
    params
  );

  return {
    startMoneyUah,
    comfortablePaymentUah,
    maxPaymentUah,
    termMonths,
    comfortBudgetUah,
    optimumBudgetUah,
    maximumBudgetUah,
    recommendedBudgetUah: comfortBudgetUah,
    recommendedBudgetUsd: convertUAHToUSD(comfortBudgetUah),
    maximumBudgetUsd: convertUAHToUSD(maximumBudgetUah),
    paymentPerUahOptimal: calcPaymentCoefficient(termMonths, "optimal", params) * 100,
    paymentPerUahAccessible: calcPaymentCoefficient(termMonths, "accessible", params) * 100,
  };
}
