import { prisma } from "@/lib/db";
import CategorySwiper from "./CategorySwiper";
import HomeClient from "./HomeClient";
import Banner from "./Banner";
import { stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

async function getBannerTimestamp() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "sale-banner.png");
    
    if (existsSync(filePath)) {
      const stats = await stat(filePath);
      return stats.mtime.getTime();
    }
  } catch (err) {
    console.error("Error getting banner timestamp:", err);
  }
  return Date.now();
}

export default async function HomePage() {
  const bannerTimestamp = await getBannerTimestamp();
  // Fetch all cars
  let allCars: Array<{
    id: number;
    title: string;
    priceUSD: string;
    photo: string | null;
    category: string;
    createdAt: Date;
    brand: string;
    mark: string;
    year: number;
    mileage: number;
    monthlyPayment: number | null;
  }> = [];
  try {
    allCars = await prisma.car.findMany({
      select: {
        id: true,
        title: true,
        priceUSD: true,
        photo: true,
        category: true,
        createdAt: true,
        brand: true,
        mark: true,
        year: true,
        mileage: true,
        monthlyPayment: true,
      },
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    allCars = [];
  }

  // Get unique brands and models
  const uniqueBrands = Array.from(
    new Set(allCars.map((car: { brand: string }) => car.brand).filter(Boolean))
  ).sort() as string[];
  const modelsByBrand: Record<string, string[]> = {};
  
  allCars.forEach((car: { brand: string; mark: string }) => {
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

  // Take first 10 cars (deterministic selection for server-side rendering)
  // Randomization should be handled client-side if needed
  const randomCars = allCars.slice(0, 10);

  // Pick top 4 cars (for example top by newest)
  const topCars = allCars
    .sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- Hero Banner Section --- */}
      <Banner bannerTimestamp={bannerTimestamp} />

      {/* --- Categories Section --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <CategorySwiper />
      </section>

      <HomeClient
        randomCars={randomCars}
        topCars={topCars}
        brands={uniqueBrands}
        modelsByBrand={modelsByBrand}
      />
    </div>
  );
}
