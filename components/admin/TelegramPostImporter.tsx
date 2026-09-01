"use client";

import Link from "next/link";
import { useState } from "react";
import {
  isValidTelegramPostUrl,
  telegramPreviewToFormValues,
  type TelegramImportMeta,
} from "@/lib/telegram-car-import";
import type { CarFormValues } from "@/lib/car-form";
import type { TelegramPostPreview } from "@/lib/telegram-post-import";

type Props = {
  onImported: (values: Partial<CarFormValues>, meta: TelegramImportMeta) => void;
};

export default function TelegramPostImporter({ onImported }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<TelegramPostPreview | null>(null);

  const handleImport = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Вставте посилання на пост Telegram");
      return;
    }
    if (!isValidTelegramPostUrl(trimmed)) {
      setError("Невірне посилання. Приклад: https://t.me/normalno_auto/123");
      return;
    }

    setLoading(true);
    setError("");
    setPreview(null);

    try {
      const res = await fetch("/api/admin/telegram-post/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await res.json()) as TelegramPostPreview & { error?: string };
      if (!res.ok) {
        setError(data.error || "Не вдалося завантажити пост");
        return;
      }
      setPreview(data);
    } catch {
      setError("Помилка мережі під час імпорту");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!preview?.ok) return;
    const { values, meta } = telegramPreviewToFormValues(preview);
    if (!meta) {
      setError("Не вдалося підготувати дані для форми");
      return;
    }
    onImported(values, meta);
  };

  const photos = preview?.photos || [];

  return (
    <section className="admin-card overflow-hidden border-brand/20 bg-gradient-to-br from-brand-light/30 via-white to-white">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-brand text-white flex items-center justify-center shrink-0 text-xl">
          ✈️
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900">Імпорт з Telegram</h3>
          <p className="text-sm text-muted mt-1">
            Вставте посилання на пост — ми підтягнемо текст, ціну, характеристики та{" "}
            <strong>усі фото з медіагрупи</strong>. Потім відредагуйте і збережіть.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          className="admin-input flex-1"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="https://t.me/c/1949651952/123"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void handleImport();
            }
          }}
        />
        <button
          type="button"
          onClick={() => void handleImport()}
          disabled={loading}
          className="admin-btn admin-btn-primary shrink-0 disabled:opacity-60"
        >
          {loading ? "Завантаження..." : "Завантажити пост"}
        </button>
      </div>

      <p className="text-xs text-muted mt-2">
        Підтримуються публічні канали та посилання формату{" "}
        <code className="font-mono">t.me/c/...</code>
      </p>

      {error && (
        <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {error}
        </div>
      )}

      {preview?.ok && preview.parsed && (
        <div className="mt-4 rounded-2xl border border-border bg-white/80 p-4 space-y-4">
          {preview.duplicateCarId && (
            <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              Таке авто вже є в базі:{" "}
              <Link
                href={`/admin/cars/${preview.duplicateCarId}`}
                className="font-semibold underline"
              >
                {preview.duplicateCarTitle || `#${preview.duplicateCarId}`}
              </Link>
              . Можете оновити дані вручну або зберегти як нове.
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted font-semibold">Попередній перегляд</p>
              <h4 className="font-bold text-lg leading-snug">{preview.parsed.title}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <PreviewChip label="Марка" value={preview.parsed.brand} />
                <PreviewChip label="Модель" value={preview.parsed.mark} />
                <PreviewChip label="Рік" value={preview.parsed.year ? String(preview.parsed.year) : "—"} />
                <PreviewChip
                  label="Пробіг"
                  value={preview.parsed.mileage ? `${preview.parsed.mileage.toLocaleString("uk-UA")} км` : "—"}
                />
                <PreviewChip label="Ціна" value={preview.parsed.priceUSD ? `$${preview.parsed.priceUSD}` : "—"} />
                <PreviewChip label="Двигун" value={preview.parsed.engineType || "—"} />
                <PreviewChip label="КПП" value={preview.parsed.transmission || "—"} />
                <PreviewChip label="Привід" value={preview.parsed.driveType || "—"} />
              </div>
              <p className="text-xs text-muted">
                Фото з медіагрупи: {preview.photoCount || photos.length}
              </p>
            </div>

            {photos.length > 0 && (
              <div className="lg:w-[280px] shrink-0">
                <div className="grid grid-cols-3 gap-2">
                  {photos.slice(0, 6).map((photo, index) => (
                    <div
                      key={`${photo}-${index}`}
                      className="aspect-square rounded-xl overflow-hidden border border-border bg-surface"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {photos.length > 6 && (
                  <p className="text-xs text-muted mt-2 text-center">+ ще {photos.length - 6} фото</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={handleApply}
              className="admin-btn admin-btn-primary flex-1"
            >
              Заповнити форму нижче
            </button>
            <a
              href={preview.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="admin-btn admin-btn-secondary text-center"
            >
              Відкрити пост
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

function PreviewChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-3 py-2 bg-surface/40">
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <p className="font-semibold text-sm mt-0.5 truncate">{value}</p>
    </div>
  );
}
