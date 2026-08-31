import { NextResponse } from "next/server";
import { getWizardConfig } from "@/lib/wizard/config";

export async function GET() {
  const config = await getWizardConfig();
  return NextResponse.json({
    k: config.k,
    defaultTermMonths: config.defaultTermMonths,
    paymentMin: config.paymentMin,
    paymentMax: config.paymentMax,
    paymentStep: config.paymentStep,
    defaultMonthlyPayment: config.defaultMonthlyPayment,
    motivations: config.motivations,
    bodyTypes: config.bodyTypes,
    popularBrandIds: config.popularBrandIds,
    leasing: config.leasing,
  });
}
