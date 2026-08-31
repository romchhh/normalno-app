"use client";

import { useState, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";
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

export default function Catalog() {
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

  // Відстеження відвідувань каталогу
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Отримати інформацію про користувача з Telegram WebApp (якщо доступна)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let telegramData: any = null;
        let phone: string | null = null;
        let username: string | null = null;
        let firstName: string | null = null;
        let lastName: string | null = null;
        let telegramId: string | null = null;

        if (typeof window !== "undefined" && window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          telegramData = tg.initDataUnsafe?.user;

          if (telegramData) {
            telegramId = telegramData.id?.toString() || null;
            username = telegramData.username || null;
            firstName = telegramData.first_name || null;
            lastName = telegramData.last_name || null;
            phone = telegramData.phone_number || null;
          }
        }

        // Спробувати отримати телефон з localStorage (якщо користувач вводив його раніше)
        if (!phone && typeof window !== "undefined") {
          const savedPhone = localStorage.getItem("userPhone");
          if (savedPhone) {
            phone = savedPhone;
          }
        }

        // Отримати User Agent
        const userAgent = typeof window !== "undefined" ? navigator.userAgent : null;

        // Відправити дані про відвідування
        await fetch("/api/analytics/catalog-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            username,
            firstName,
            lastName,
            telegramId,
            userAgent,
          }),
        });
      } catch (error) {
        // Тихо ігнорувати помилки відстеження, щоб не порушувати роботу сайту
        console.error("Error tracking catalog visit:", error);
      }
    };

    trackVisit();
  }, []);

  // Filter out "main" category and get only categories with names, sorted by priority
  const displayCategories = Object.keys(categories)
    .filter((key) => key !== "main" && categories[key]?.name)
    .map((key) => ({
      key,
      ...categories[key],
      slug: categories[key].slug || key,
      priority: categories[key].priority !== undefined ? categories[key].priority : 999,
    }))
    .sort((a, b) => a.priority - b.priority);

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="section-title">Виберіть категорію</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : displayCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Категорії не знайдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayCategories.map((category) => (
              <CategoryLinkCard
                key={category.key}
                href={`/catalog/${category.slug}`}
                name={category.name}
                description={category.description}
                image={category.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
