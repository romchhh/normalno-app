import { prisma } from "@/lib/db";
import { carMatchesBrandIds } from "@/lib/brands";
import { isCarPubliclyListed } from "@/lib/car-status";
import { convertUSDToUAH } from "@/lib/currency-converter";
import { calcLeasingScenario, DEFAULT_LEASING_PARAMS, type LeasingParams } from "./leasing";
import type { MatchedCar } from "./types";

function parsePrice(priceUSD: string): number {
  const n = parseFloat(priceUSD.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function matchesBodyType(
  bodyType: string,
  category: string,
  engineType: string
): boolean {
  const cat = category.toLowerCase();
  const engine = engineType.toLowerCase();
  if (bodyType === "ev") {
    return cat.includes("елект") || cat.includes("e-car") || engine.includes("елект") || engine.includes("electric");
  }
  if (bodyType === "suv") {
    return cat.includes("suv") || cat.includes("крос") || cat.includes("позаш");
  }
  if (bodyType === "sedan") {
    return cat.includes("седан") || cat.includes("sedan") || cat.includes("ліфтбек");
  }
  return true;
}

export async function matchCars(params: {
  maxBudget: number;
  termMonths: number;
  k?: number;
  leasingParams?: LeasingParams;
  bodyTypes: string[];
  brands: string[];
  limit?: number;
}): Promise<MatchedCar[]> {
  const {
    maxBudget,
    termMonths,
    k,
    leasingParams = DEFAULT_LEASING_PARAMS,
    bodyTypes,
    brands,
    limit = 6,
  } = params;

  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      title: true,
      photo: true,
      year: true,
      brand: true,
      mark: true,
      mileage: true,
      priceUSD: true,
      monthlyPayment: true,
      category: true,
      engineType: true,
      status: true,
    },
  });

  let filtered = cars
    .map((car) => ({
      ...car,
      price: parsePrice(car.priceUSD),
    }))
    .filter((car) => car.price > 0 && car.price <= maxBudget)
    .filter((car) => isCarPubliclyListed(car.status));

  if (brands.length > 0) {
    filtered = filtered.filter((car) => carMatchesBrandIds(car.brand, brands));
  }

  if (bodyTypes.length > 0) {
    filtered = filtered.filter((car) =>
      bodyTypes.some((bt) => matchesBodyType(bt, car.category, car.engineType))
    );
  }

  if (filtered.length < 3) {
    const fallback = cars
      .map((car) => ({ ...car, price: parsePrice(car.priceUSD) }))
      .filter((car) => car.price > 0 && car.price <= maxBudget * 1.1);
    const ids = new Set(filtered.map((c) => c.id));
    for (const car of fallback) {
      if (!ids.has(car.id)) {
        filtered.push(car);
        ids.add(car.id);
      }
      if (filtered.length >= limit) break;
    }
  }

  filtered.sort((a, b) => b.price - a.price);

  return filtered.slice(0, limit).map((car) => {
    const priceUah = convertUSDToUAH(car.price);
    const scenario = calcLeasingScenario(priceUah, termMonths, "optimal", leasingParams);
    const monthlyPaymentUah =
      car.monthlyPayment && car.monthlyPayment > 0
        ? car.monthlyPayment
        : scenario.totalPaymentFirstYearUah;
    return {
      id: car.id,
      title: car.title,
      photo: car.photo,
      year: car.year,
      brand: car.brand,
      mark: car.mark,
      mileage: car.mileage,
      price: car.price,
      priceUSD: car.priceUSD,
      monthlyPayment: monthlyPaymentUah,
      monthlyPaymentUah,
    };
  });
}
