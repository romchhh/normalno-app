"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import HomeFilters from "./HomeFilters";

interface CategoryClientProps {
  brands: string[];
  modelsByBrand: Record<string, string[]>;
  categorySlug: string;
}

export default function CategoryClient({
  brands,
  modelsByBrand,
}: CategoryClientProps) {
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;
  const filterCount = searchParams
    .toString()
    .split("&")
    .filter((p) => p && !p.includes("page=")).length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Авто</h2>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="btn-secondary relative"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Фільтри
          {hasFilters && (
            <span className="ml-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-brand text-white text-[10px] font-semibold rounded-full">
              {filterCount}
            </span>
          )}
        </button>
      </div>

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
