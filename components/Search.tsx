"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import ScrollToTop from "./ScrollToTop";
import HomeFilters from "./HomeFilters";
import { CAR_CARD_GRID } from "@/lib/car-card";
import type { CarCardData } from "./CarCard";

type Car = CarCardData & { category?: string };

export default function Search() {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  // Lazy initialization for localStorage values
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedSearches = localStorage.getItem("recentSearches");
      if (storedSearches) {
        try {
          return JSON.parse(storedSearches);
        } catch (e) {
          console.error("Error parsing recent searches:", e);
        }
      }
    }
    return [];
  });
  
  const [recentCars, setRecentCars] = useState<Car[]>(() => {
    if (typeof window !== "undefined") {
      const storedCars = localStorage.getItem("recentViewedCars");
      if (storedCars) {
        try {
          return JSON.parse(storedCars);
        } catch (e) {
          console.error("Error parsing recent cars:", e);
        }
      }
    }
    return [];
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [modelsByBrand, setModelsByBrand] = useState<Record<string, string[]>>({});

  // Load brands and models for filters
  useEffect(() => {
    fetch("/api/cars/filters")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands || []);
        setModelsByBrand(data.modelsByBrand || {});
      })
      .catch((err) => {
        console.error("Error fetching filters:", err);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setCars([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const fetchCars = async () => {
      setLoading(true);
      const res = await fetch(`/api/cars?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setCars(data);
      setLoading(false);
      
      // Save search query if we have results
      if (data.length > 0 && query.trim()) {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("recentSearches");
          let searches: string[] = stored ? JSON.parse(stored) : [];
          
          // Remove if already exists
          searches = searches.filter((s) => s.toLowerCase() !== query.toLowerCase());
          // Add to beginning
          searches.unshift(query);
          // Keep only last 10
          searches = searches.slice(0, 10);
          
          localStorage.setItem("recentSearches", JSON.stringify(searches));
          setRecentSearches(searches);
        }
      }
    };

    const debounce = setTimeout(() => {
    fetchCars();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const clearRecentSearches = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches");
      setRecentSearches([]);
    }
  };

  // Popular search suggestions
  const popularSearches = ["BMW", "Mercedes", "Tesla", "Toyota", "Audi", "Lexus"];

  return (
    <section className="min-h-screen bg-white pb-20">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="section-title">Пошук автомобілів</h1>
            <p className="section-subtitle">Знайдіть свій ідеальний автомобіль</p>
          </div>
          <button type="button" onClick={() => setShowFilters(true)} className="btn-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden sm:inline">Фільтри</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          <input
            type="text"
              placeholder="Введіть марку, модель або рік..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="w-full pl-11 pr-10 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40 transition-colors text-foreground placeholder-muted"
              autoFocus
              list="search-suggestions"
            />
            <datalist id="search-suggestions">
              {popularSearches.map((suggestion, idx) => (
                <option key={idx} value={suggestion} />
              ))}
            </datalist>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mt-4 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-gray-600 mb-3">Популярні пошуки:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches and Viewed Cars */}
          {!query && (recentSearches.length > 0 || recentCars.length > 0) && (
            <div className="mt-4 max-w-2xl mx-auto space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-600">Останні пошуки:</p>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Очистити
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors flex items-center gap-2 group"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Viewed Cars */}
              {recentCars.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-600">Останні переглянуті:</p>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("recentViewedCars");
                          setRecentCars([]);
                        }
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Очистити
                    </button>
                  </div>
                  <div className={CAR_CARD_GRID}>
                    {recentCars.map((car) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && cars.length > 0 && (
          <div className="mb-6 px-4 py-3 bg-white rounded-2xl shadow-md border-l-4 border-gray-900 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600">
              Знайдено <span className="font-semibold text-foreground">{cars.length}</span>{" "}
              <span className="font-semibold">
                {cars.length === 1 ? "автомобіль" : cars.length < 5 ? "автомобілі" : "автомобілів"}
              </span>
            </p>
          </div>
        )}

        {/* Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {loading ? (
            <div className={CAR_CARD_GRID}>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className={CAR_CARD_GRID}>
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20 px-4 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
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
              <p className="text-gray-700 text-xl font-bold mb-2">
                Нічого не знайдено за запитом &quot;{query}&quot;
              </p>
              <p className="text-gray-500 text-base mb-6">
                Спробуйте змінити запит або перевірте правильність написання
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">Рекомендації:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Перевірте правильність написання марки або моделі</li>
                  <li>• Спробуйте використати популярні пошуки вище</li>
                  <li>• Використайте фільтри для більш точного пошуку</li>
                </ul>
                <Link
                  href="/catalog"
                  className="inline-block mt-4 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand transition-colors"
                >
                  Переглянути всі авто
                </Link>
                  </div>
                </div>
          ) : (
            <div className="text-center py-20 px-4">
              <svg
                className="mx-auto h-24 w-24 text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">
                Почніть вводити для пошуку
              </p>
            </div>
          )}
        </section>
      </div>

      {showFilters && (
        <HomeFilters
          onClose={() => setShowFilters(false)}
          brands={brands}
          modelsByBrand={modelsByBrand}
        />
      )}
    </section>
  );
}
