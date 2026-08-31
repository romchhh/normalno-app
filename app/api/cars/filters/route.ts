import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all cars to get brands and models
    const allCars = await prisma.car.findMany({
      select: {
        brand: true,
        mark: true,
      },
    });

    // Get unique brands
    const uniqueBrands = Array.from(
      new Set(allCars.map((car: { brand: string | null }) => car.brand).filter(Boolean))
    ).sort() as string[];

    // Build modelsByBrand
    const modelsByBrand: Record<string, string[]> = {};

    allCars.forEach((car: { brand: string | null; mark: string | null }) => {
      if (car.brand && car.mark) {
        if (!modelsByBrand[car.brand]) {
          modelsByBrand[car.brand] = [];
        }
        if (!modelsByBrand[car.brand].includes(car.mark)) {
          modelsByBrand[car.brand].push(car.mark);
        }
      }
    });

    // Sort models for each brand
    Object.keys(modelsByBrand).forEach((brand) => {
      modelsByBrand[brand].sort();
    });

    return NextResponse.json({
      brands: uniqueBrands,
      modelsByBrand,
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { message: "Error fetching filters" },
      { status: 500 }
    );
  }
}

