import { prisma } from "@/lib/db";
import CategorySwiper from "./CategorySwiper";
import HomeClient from "./HomeClient";
import Banner from "./Banner";
import PartnersList from "./PartnersList";
import { getActivePartners } from "@/lib/partners-db";
import { stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PAGE_SIZE = 12;

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

type HomePageProps = {
  page?: number;
};

export default async function HomePage({ page = 1 }: HomePageProps) {
  const bannerTimestamp = await getBannerTimestamp();
  const currentPage = Math.max(1, page);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const carSelect = {
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
    paymentCurrency: true,
  } as const;

  let totalCars = 0;
  let pageCars: Array<{
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
    paymentCurrency: string;
  }> = [];
  let filterCars: Array<{ brand: string; mark: string }> = [];

  try {
    [totalCars, pageCars, filterCars] = await Promise.all([
      prisma.car.count(),
      prisma.car.findMany({
        select: carSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE,
      }),
      prisma.car.findMany({
        select: { brand: true, mark: true },
      }),
    ]);
  } catch (error) {
    console.error("Error fetching cars:", error);
  }

  const totalPages = Math.max(1, Math.ceil(totalCars / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  // If URL page is beyond last page, refetch last page
  if (safePage !== currentPage && totalCars > 0) {
    try {
      pageCars = await prisma.car.findMany({
        select: carSelect,
        orderBy: { createdAt: "desc" },
        skip: (safePage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
    } catch (error) {
      console.error("Error refetching cars page:", error);
    }
  }

  const uniqueBrands = Array.from(
    new Set(filterCars.map((car) => car.brand).filter(Boolean))
  ).sort() as string[];
  const modelsByBrand: Record<string, string[]> = {};

  filterCars.forEach((car) => {
    if (car.brand && car.mark) {
      if (!modelsByBrand[car.brand]) {
        modelsByBrand[car.brand] = [];
      }
      if (!modelsByBrand[car.brand].includes(car.mark)) {
        modelsByBrand[car.brand].push(car.mark);
      }
    }
  });

  Object.keys(modelsByBrand).forEach((brand) => {
    modelsByBrand[brand].sort();
  });

  const partners = await getActivePartners();

  return (
    <div className="min-h-screen bg-white pb-20">
      <Banner bannerTimestamp={bannerTimestamp} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <CategorySwiper />
      </section>

      <HomeClient
        cars={pageCars}
        totalCars={totalCars}
        currentPage={safePage}
        totalPages={totalPages}
        brands={uniqueBrands}
        modelsByBrand={modelsByBrand}
      />

      {partners.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <PartnersList partners={partners} />
        </div>
      )}
    </div>
  );
}
