"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SheetModal from "./SheetModal";

export default function DeleteAllCarsButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {
    if (confirmText !== "ВИДАЛИТИ ВСЕ") {
      setError("Будь ласка, введіть 'ВИДАЛИТИ ВСЕ' для підтвердження");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cars/delete-all", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Помилка видалення автомобілів");
      }

      const data = await response.json();
      setIsModalOpen(false);
      setConfirmText("");
      router.refresh();
      alert(`Успішно видалено ${data.deletedCount} автомобілів`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Помилка видалення автомобілів";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all duration-300 border border-red-200 group"
      >
        <div className="p-3 bg-red-600 rounded-lg group-hover:scale-110 transition-transform">
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Видалити всі автомобілі</h3>
          <p className="text-sm text-gray-600">Очистити каталог перед завантаженням</p>
        </div>
      </button>

      {isModalOpen && (
        <SheetModal
          zClassName="z-50"
          onClose={() => {
            setIsModalOpen(false);
            setConfirmText("");
            setError(null);
          }}
        >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setConfirmText("");
                setError(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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

            <div className="p-6 sm:p-8 pt-4 sm:pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Видалити всі автомобілі?
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Ця дія незворотна!
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 font-medium mb-2">
                  ⚠️ Увага! Ви видалите всі автомобілі з каталогу.
                </p>
                <p className="text-sm text-red-700">
                  Ця операція незворотна. Переконайтеся, що ви хочете продовжити.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Для підтвердження введіть: <span className="font-mono text-red-600">ВИДАЛИТИ ВСЕ</span>
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="ВИДАЛИТИ ВСЕ"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setConfirmText("");
                    setError(null);
                  }}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading || confirmText !== "ВИДАЛИТИ ВСЕ"}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Видалення..." : "Видалити все"}
                </button>
              </div>
            </div>
        </SheetModal>
      )}
    </>
  );
}

