"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollToTop from "./ScrollToTop";
import CarCardSkeleton from "./CarCardSkeleton";
import CarCard, { type CarCardData } from "./CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";

export default function Favorite() {
  const [cars, setCars] = useState<CarCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const favoriteIds = stored ? JSON.parse(stored) : [];

    if (favoriteIds.length > 0) {
      fetchFavoriteCars(favoriteIds);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavoriteCars = async (ids: number[]) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cars`);
      const allCars = await res.json();
      const favoriteCars = allCars.filter((car: CarCardData) =>
        ids.includes(Number(car.id))
      );
      setCars(favoriteCars);
    } catch (error) {
      console.error("Error fetching favorite cars:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white pb-20">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="section-title">Обране</h1>
            <p className="section-subtitle">Ваші улюблені автомобілі</p>
          </div>
          {cars.length > 0 && (
            <span className="text-sm text-muted">{cars.length}</span>
          )}
        </div>

        {loading ? (
          <div className={CAR_CARD_GRID}>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        ) : cars.length > 0 ? (
          <div className={CAR_CARD_GRID}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-border mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-foreground font-medium mb-1">
              Поки немає обраних авто
            </p>
            <p className="text-muted text-sm mb-6">
              Натисніть серце на картці, щоб зберегти авто
            </p>
            <Link href="/catalog" className="btn-primary">
              Перейти до каталогу
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
