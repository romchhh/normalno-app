"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState<string>("/sale-banner.png");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current banner on mount
  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data.path) {
          setCurrentBanner(data.path + "?t=" + Date.now()); // Add timestamp to force refresh
        }
      })
      .catch(() => {
        // Use default if API fails
        setCurrentBanner("/sale-banner.png");
      });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Будь ласка, оберіть файл зображення");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Розмір файлу не повинен перевищувати 10MB");
        return;
      }

      setSelectedImage(file);
      setError(null);
      setSuccess(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Будь ласка, оберіть файл");
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

    if (res.ok) {
        setSuccess(true);
      setSelectedImage(null);
      setPreviewSrc(null);
        // Update current banner with timestamp to force refresh
        setCurrentBanner("/sale-banner.png?t=" + Date.now());
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTimeout(() => setSuccess(false), 3000);
    } else {
        setError(data.message || "Помилка при завантаженні");
      }
    } catch {
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-brand-hover rounded-xl">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Управління головним банером</h2>
          <p className="text-sm text-gray-500">Змініть головний банер на головній сторінці</p>
        </div>
      </div>

      {/* Current Banner Preview */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Поточний банер:
        </label>
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
          <Image
            src={currentBanner}
            alt="Поточний банер"
            fill
            className="object-cover"
            unoptimized
            onError={() => setCurrentBanner("/sale-banner.png")}
          />
        </div>
      </div>

      {/* File Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Новий банер:
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light cursor-pointer"
        />
        <p className="mt-2 text-xs text-gray-500">
          Підтримуються формати: JPG, PNG, WebP. Максимальний розмір: 10MB
        </p>
      </div>

      {/* Preview */}
      {previewSrc && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Попередній перегляд:
          </label>
          <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border-2 border-blue-300 bg-gray-100">
            <Image
              src={previewSrc}
              alt="Попередній перегляд"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !selectedImage}
        className="w-full px-6 py-4 bg-gradient-to-r from-brand to-brand-hover text-white font-semibold rounded-xl hover:from-brand-hover hover:to-brand-hover disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
      >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Завантаження...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>Завантажити банер</span>
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-700 font-medium">Банер успішно завантажено!</p>
          </div>
        </div>
      )}
    </div>
  );
}

