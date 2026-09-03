"use client";

import { useState } from "react";
import Link from "next/link";
import CarCard from "./CarCard";
import HomeFilters from "./HomeFilters";
import ScrollToTop from "./ScrollToTop";
import { CAR_CARD_GRID } from "@/lib/car-card";
import type { CarCardData } from "./CarCard";

interface HomeClientProps {
  randomCars: CarCardData[];
  topCars: CarCardData[];
  brands: string[];
  modelsByBrand: Record<string, string[]>;
}

export default function HomeClient({
  randomCars,
  topCars,
  brands,
  modelsByBrand,
}: HomeClientProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <ScrollToTop />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">Всі авто</h2>
            <p className="section-subtitle">Широкий вибір автомобілів у лізинг</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="btn-secondary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="hidden sm:inline">Фільтри</span>
            </button>
            <Link
              href="/catalog"
              className="hidden sm:inline-flex items-center text-sm text-muted hover:text-foreground transition-colors"
            >
              Дивитись всі
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={CAR_CARD_GRID}>
          {randomCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/catalog" className="text-sm text-muted hover:text-foreground transition-colors">
            Дивитись всі →
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="mb-6">
          <h2 className="section-title">Топ авто</h2>
          <p className="section-subtitle">Найпопулярніші та найновіші моделі</p>
        </div>
        <div className={CAR_CARD_GRID}>
          {topCars.map((car) => (
            <CarCard key={car.id} car={car} badge="Новинка" />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="text-center mb-8">
          <h2 className="section-title">Чому обирають нас</h2>
          <p className="section-subtitle">Прозорий процес від підбору до отримання авто</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: "Перевірена історія",
              text: "Ретельна перевірка кожного авто перед оформленням",
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            },
            {
              title: "Вигідні ціни",
              text: "Без прихованих платежів — лише зрозумілі умови",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Швидке оформлення",
              text: "Супровід на кожному етапі — від підбору до ключів",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              title: "Підтримка 24/7",
              text: "Завжди на зв'язку в Telegram",
              icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
            },
          ].map((item) => (
            <div key={item.title} className="card p-4">
              <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {showFilters && (
        <HomeFilters
          onClose={() => setShowFilters(false)}
          brands={brands}
          modelsByBrand={modelsByBrand}
        />
      )}
    </>
  );
}
