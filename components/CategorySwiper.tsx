"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import CategoryLinkCard from "./CategoryLinkCard";

interface Category {
  name: string;
  image: string | null;
  description: string | null;
  slug: string;
  priority: number;
}

interface Categories {
  [key: string]: Category;
}

export default function CategorySwiper() {
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  const displayCategories = Object.keys(categories)
    .filter((key) => key !== "main" && categories[key]?.name)
    .map((key) => ({
      key,
      ...categories[key],
      slug: categories[key].slug || key,
      priority: categories[key].priority !== undefined ? categories[key].priority : 999,
    }))
    .sort((a, b) => a.priority - b.priority);

  if (loading) {
    return (
      <div>
        <h2 className="section-title mb-4">Виберіть категорію</h2>
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-border border-t-brand" />
        </div>
      </div>
    );
  }

  if (displayCategories.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Виберіть категорію</h2>
        <Link href="/catalog" className="hidden sm:inline-flex text-sm text-muted hover:text-brand transition-colors">
          Показати всі →
        </Link>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={1.35}
        freeMode
        breakpoints={{
          400: { slidesPerView: 1.6, spaceBetween: 10 },
          640: { slidesPerView: 2.2, spaceBetween: 12 },
          768: { slidesPerView: 2.8, spaceBetween: 12 },
          1024: { slidesPerView: 3.4, spaceBetween: 12 },
        }}
      >
        {displayCategories.map((category) => (
          <SwiperSlide key={category.key}>
            <CategoryLinkCard
              href={`/catalog/${category.slug}`}
              name={category.name}
              image={category.image}
              compact
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
