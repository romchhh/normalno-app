"use client";

import { useState } from "react";
import Toast from "./Toast";

interface FavoriteToggleProps {
  carId: number;
  size?: "sm" | "md";
  className?: string;
}

export default function FavoriteToggle({
  carId,
  size = "sm",
  className = "",
}: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      return favorites.includes(carId);
    }
    return false;
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const iconSize = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const btnSize = size === "md" ? "p-2" : "p-1.5";

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    const wasFavorite = isFavorite;
    const newFavorites = wasFavorite
      ? favorites.filter((id: number) => id !== carId)
      : [...favorites, carId];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!wasFavorite);
    setToastMessage(wasFavorite ? "Видалено з обраного" : "Додано до обраного");
    setShowToast(true);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleFavorite}
        className={`icon-btn ${btnSize} ${className}`}
        aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
        aria-pressed={isFavorite}
      >
        <svg
          className={`${iconSize} transition-colors duration-200 ${
            isFavorite
              ? "fill-brand text-brand"
              : "fill-none text-muted hover:text-brand"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
