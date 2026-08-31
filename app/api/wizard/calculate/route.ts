import { NextRequest, NextResponse } from "next/server";
import { calcBudgetProfile, calcTotalStartBudgetUah } from "@/lib/wizard/calculator";
import { getWizardConfig } from "@/lib/wizard/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      currentCarPrice = 0,
      additionalCash = 0,
      monthlyPayment,
      termMonths,
    } = body;

    const config = await getWizardConfig();
    const payment = monthlyPayment ?? config.defaultMonthlyPayment;
    const term = termMonths ?? config.defaultTermMonths;

    const profile = calcBudgetProfile(
      currentCarPrice,
      additionalCash,
      payment,
      term,
      config.leasing
    );
    const totalStartBudgetUah = calcTotalStartBudgetUah(currentCarPrice, additionalCash);

    return NextResponse.json({
      totalStartBudgetUah,
      maxBudget: profile.recommendedBudgetUsd,
      maximumBudgetUsd: profile.maximumBudgetUsd,
      budgetProfile: profile,
    });
  } catch {
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}
