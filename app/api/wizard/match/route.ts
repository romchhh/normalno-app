import { NextRequest, NextResponse } from "next/server";
import { matchCars } from "@/lib/wizard/match-cars";
import { getWizardConfig } from "@/lib/wizard/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { maxBudget, termMonths, bodyTypes = [], brands = [] } = body;

    if (!maxBudget || maxBudget <= 0) {
      return NextResponse.json({ cars: [], count: 0 });
    }

    const config = await getWizardConfig();
    const cars = await matchCars({
      maxBudget,
      termMonths: termMonths ?? config.defaultTermMonths,
      k: config.k,
      leasingParams: config.leasing,
      bodyTypes,
      brands,
      limit: 6,
    });

    return NextResponse.json({ cars, count: cars.length });
  } catch (e) {
    console.error("Match cars error:", e);
    return NextResponse.json({ error: "Match failed" }, { status: 500 });
  }
}
