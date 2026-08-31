import Link from "next/link";
import { prisma } from "@/lib/db";
import { sqliteContains } from "@/lib/prisma-filters";
import { CATEGORY_NAMES, REVERSE_CATEGORY_MAP } from "@/lib/categories";
import CategoryClient from "./CategoryClient";
import CarCard from "./CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";
import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PAGE_SIZE = 12;

interface CategoryProps {
  category: string;
  page: number;
  filters?: Record<string, string | undefined>;
}

export default async function Category({
  category,
  page,
  filters = {},
}: CategoryProps) {
  const skip = (page - 1) * PAGE_SIZE;

  // Fetch all cars to get brands and models for filters
  let allCars: Array<{ brand: string; mark: string }> = [];
  try {
    allCars = await prisma.car.findMany({
      select: {
        brand: true,
        mark: true,
      },
    });
  } catch (error) {
    console.error("Error fetching cars for filters:", error);
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

  // Get category image and description
  let categoryImage: string | null = null;
  let categoryDescription: string | null = null;
  try {
    const categoriesFile = path.join(process.cwd(), "data", "categories.json");
    
    if (existsSync(categoriesFile)) {
      const fileContent = await readFile(categoriesFile, "utf-8");
      const categoryData = JSON.parse(fileContent);
      categoryImage = categoryData[category]?.image || null;
      categoryDescription = categoryData[category]?.description || null;
    }
  } catch (err) {
    console.error("Error fetching category data:", err);
  }

  // Build "where" filter for Prisma
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  // CATEGORY FILTER USING MAP
  if (category) {
    const dbCategories = REVERSE_CATEGORY_MAP[category];
    if (dbCategories?.length) {
      where.OR = dbCategories.map((ukr) => ({
        category: sqliteContains(ukr),
      }));
    } else {
      // Fallback: try to match category directly
      where.category = sqliteContains(category);
    }
  }

  // Apply URL filters (brands, models, year, price)
  if (filters.brands) {
    const brands = (filters.brands as string).split(",");
    where.brand = { in: brands };
  }
  if (filters.models) {
    const models = (filters.models as string).split(",");
    where.mark = { in: models };
  }
  if (filters.yearFrom || filters.yearTo) {
    where.year = {};
    if (filters.yearFrom) {
      where.year.gte = parseInt(filters.yearFrom);
    }
    if (filters.yearTo) {
      where.year.lte = parseInt(filters.yearTo);
    }
  }
  if (filters.priceFrom || filters.priceTo) {
    // Include cars with no price (null, 0, or "0") along with cars in the price range
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const priceConditions: any[] = [];
    
    // Cars with price in the specified range
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const priceRange: any = {};
    if (filters.priceFrom) {
      priceRange.gte = parseFloat(filters.priceFrom);
    }
    if (filters.priceTo) {
      priceRange.lte = parseFloat(filters.priceTo);
    }

    if (Object.keys(priceRange).length > 0) {
      priceConditions.push({ price: priceRange });
  }

    // Cars with no price or price = 0
    priceConditions.push({ price: null });
    priceConditions.push({ price: 0 });
    
    // Combine with OR
    if (where.OR) {
      // If OR already exists (from category filter), we need to combine
      const existingOR = where.OR;
      where.AND = [
        { OR: existingOR },
        { OR: priceConditions }
      ];
      delete where.OR;
    } else {
      where.OR = priceConditions;
    }
  }

  // Fetch cars with the filters applied
  let cars: Array<{
    id: number;
    title: string;
    priceUSD: string;
    photo: string | null;
    category: string;
    year: number;
    mileage: number;
    monthlyPayment: number | null;
  }> = [];
  let totalCars = 0;
  try {
    cars = await prisma.car.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        priceUSD: true,
        photo: true,
        category: true,
        year: true,
        mileage: true,
        monthlyPayment: true,
      },
    });

    totalCars = await prisma.car.count({ where });
  } catch (error) {
    console.error("Error fetching cars:", error);
    cars = [];
    totalCars = 0;
  }
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white pb-20">
      <ScrollToTop />
      {/* Category Banner with Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 mb-8">
        {categoryImage && (
          <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={categoryImage}
              alt={CATEGORY_NAMES[category] || "Категорія"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {CATEGORY_NAMES[category] || category}
              </h1>
            </div>
          </div>
        )}

        {categoryDescription && (
          <p className="text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
            {categoryDescription}
          </p>
        )}

        {!categoryImage && (
          <div className="mb-4">
            <h1 className="section-title">
              {CATEGORY_NAMES[category] || category}
            </h1>
          </div>
        )}
      </section>

      {/* Filters Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <CategoryClient
          brands={uniqueBrands}
          modelsByBrand={modelsByBrand}
          categorySlug={category}
        />
      </section>

      {cars.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center py-20 px-4 bg-white rounded-3xl shadow-xl">
            <div className="relative inline-block mb-6">
              <svg
                className="mx-auto h-20 w-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-700 text-xl font-bold mb-2">Немає автомобілів за обраними фільтрами</p>
            <p className="text-gray-500 text-base mb-6">Спробуйте змінити параметри пошуку</p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">Рекомендації:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Спробуйте змінити фільтри марки або моделі</li>
                <li>• Збільште діапазон року випуску</li>
                <li>• Розширте діапазон ціни</li>
              </ul>
              <Link
                href={`/catalog/${category}`}
                className="inline-block mt-4 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand transition-colors"
              >
                Скинути фільтри
              </Link>
            </div>
              </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mb-4 text-sm text-muted">
            Знайдено{" "}
            <span className="font-semibold text-foreground">{totalCars}</span>{" "}
            {totalCars === 1 ? "автомобіль" : totalCars < 5 ? "автомобілі" : "автомобілів"}
          </div>
          <div className={CAR_CARD_GRID}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
        </div>
        </section>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/catalog/${category}`}
        filters={filters}
      />
    </div>
  );
}
