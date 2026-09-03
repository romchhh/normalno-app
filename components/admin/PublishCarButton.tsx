"use client";

import { useState } from "react";

type Props = {
  carId: number;
  published?: boolean;
  publishedAt?: string | null;
};

export default function PublishCarButton({ carId, published, publishedAt }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(published || false);
  const [publishedLabel, setPublishedLabel] = useState(
    publishedAt
      ? new Date(publishedAt).toLocaleString("uk-UA")
      : ""
  );

  const handlePublish = async () => {
    const confirmText = done
      ? "Авто вже опубліковане. Опублікувати ще раз?"
      : "Опублікувати це авто в Telegram-канал?";
    if (!window.confirm(confirmText)) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/cars/${carId}/publish`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Не вдалося опублікувати");
      }
      setDone(true);
      setPublishedLabel(new Date().toLocaleString("uk-UA"));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Помилка публікації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-base">Telegram-канал</h3>
          <p className="text-sm text-muted mt-1">
            {done
              ? `Опубліковано${publishedLabel ? ` · ${publishedLabel}` : ""}`
              : "Ще не публікувалось у канал"}
          </p>
        </div>
        <button
          type="button"
          onClick={handlePublish}
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Публікація..." : done ? "Опублікувати знову" : "Опублікувати в канал"}
        </button>
      </div>
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
