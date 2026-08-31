"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BannerUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState("/sale-banner.png");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshCurrent = () => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data.path) {
          setCurrentBanner(`${data.path}?t=${data.timestamp || Date.now()}`);
        }
      })
      .catch(() => {
        setCurrentBanner(`/sale-banner.png?t=${Date.now()}`);
      });
  };

  useEffect(() => {
    refreshCurrent();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Оберіть файл зображення (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Максимальний розмір файлу — 10MB");
      return;
    }

    setSelectedImage(file);
    setError(null);
    setSuccess(false);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Оберіть файл");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("banner", selectedImage);

    try {
      const res = await fetch("/api/banner", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Помилка при завантаженні");
        return;
      }

      setSuccess(true);
      setSelectedImage(null);
      setPreviewSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCurrentBanner(`${data.path || "/sale-banner.png"}?t=${data.timestamp || Date.now()}`);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Поточний банер на головній
        </label>
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-border bg-surface">
          <Image
            src={currentBanner}
            alt="Поточний банер"
            fill
            className="object-cover"
            unoptimized
            onError={() => setCurrentBanner(`/sale-banner.png?t=${Date.now()}`)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Нове зображення
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleImageChange}
          className="admin-input"
        />
        <p className="mt-2 text-xs text-muted">
          Рекомендовано широкий банер (наприклад 1600×600). JPG, PNG або WebP до 10MB.
        </p>
      </div>

      {previewSrc && (
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Попередній перегляд
          </label>
          <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-brand/30 bg-surface">
            <Image src={previewSrc} alt="Попередній перегляд" fill className="object-cover" unoptimized />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || !selectedImage}
        className="admin-btn admin-btn-primary disabled:opacity-50"
      >
        {loading ? "Завантаження..." : "Зберегти банер"}
      </button>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Банер оновлено. Оновіть головну сторінку, щоб побачити зміни.
        </p>
      )}
    </div>
  );
}
