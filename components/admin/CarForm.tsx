"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CarFormValues,
  ENGINE_OPTIONS,
  TRANSMISSION_OPTIONS,
  EMPTY_CAR_FORM,
  parseMoney,
} from "@/lib/car-form";
import { resolveCarPhotoUrl } from "@/lib/car-photo";
import {
  BODY_TYPE_OPTIONS,
  CAR_STATUSES,
  DRIVE_TYPE_OPTIONS,
  calcPaymentScheduleFromPriceUsd,
  type PaymentScheduleItem,
} from "@/lib/car-status";
import { DEFAULT_LEASING_PARAMS } from "@/lib/wizard/leasing";

type BrandModel = {
  value: string;
  title: string;
  models: { value: string; title: string }[];
};

type CategoryOption = { key: string; name: string; slug: string };
type PartnerOption = { id: number; name: string; slug: string };

interface CarFormProps {
  initial?: Partial<CarFormValues>;
  submitLabel: string;
  onSubmit: (values: CarFormValues) => Promise<void>;
}

export default function CarForm({ initial, submitLabel, onSubmit }: CarFormProps) {
  const [values, setValues] = useState<CarFormValues>({
    ...EMPTY_CAR_FORM,
    ...initial,
  });
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [partners, setPartners] = useState<PartnerOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoDraft, setPhotoDraft] = useState("");
  const [schedule, setSchedule] = useState<PaymentScheduleItem[]>([]);

  useEffect(() => {
    setValues({ ...EMPTY_CAR_FORM, ...initial });
  }, [initial]);

  const applyAutoPayments = (priceRaw?: string) => {
    const price = parseMoney(priceRaw ?? values.priceUSD);
    const next = calcPaymentScheduleFromPriceUsd(price, DEFAULT_LEASING_PARAMS);
    setSchedule(next);
    const m36 = next.find((x) => x.termMonths === 36);
    if (m36) {
      setValues((prev) => ({
        ...prev,
        priceUSD: priceRaw ?? prev.priceUSD,
        monthlyPayment: String(m36.monthlyUah),
        advancePayment: String(m36.advanceUah),
      }));
    }
  };

  useEffect(() => {
    const price = parseMoney(values.priceUSD);
    if (price > 0) {
      setSchedule(calcPaymentScheduleFromPriceUsd(price, DEFAULT_LEASING_PARAMS));
    } else {
      setSchedule([]);
    }
  }, [values.priceUSD]);

  useEffect(() => {
    fetch("/models.json")
      .then((r) => r.json())
      .then((data) => setBrands(Array.isArray(data) ? data : []))
      .catch(() => setBrands([]));

    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        const list = Object.keys(data || {})
          .filter((k) => k !== "main" && data[k]?.name)
          .map((key) => ({
            key,
            name: data[key].name as string,
            slug: (data[key].slug || key) as string,
          }))
          .sort((a, b) => a.name.localeCompare(b.name, "uk"));
        setCategories(list);
      })
      .catch(() => setCategories([]));

    fetch("/api/partners?all=1")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setPartners([]);
          return;
        }
        setPartners(
          data
            .filter((p: PartnerOption & { active?: boolean }) => p.active !== false)
            .map((p: PartnerOption) => ({
              id: p.id,
              name: p.name || `Партнер #${p.id}`,
              slug: p.slug,
            }))
        );
      })
      .catch(() => setPartners([]));
  }, []);

  const models = useMemo(() => {
    const brandName = values.brand.trim().toLowerCase();
    if (!brandName) return [];
    const brand = brands.find(
      (b) =>
        b.title.toLowerCase() === brandName ||
        b.value.toLowerCase() === brandName ||
        b.title.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase() ===
          brandName.normalize("NFD").replace(/\p{M}/gu, "")
    );
    return brand?.models || [];
  }, [brands, values.brand]);

  const photos = values.photo
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const setField = <K extends keyof CarFormValues>(key: K, value: CarFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handlePriceChange = (raw: string) => {
    setField("priceUSD", raw);
    const price = parseMoney(raw);
    if (price > 0) {
      const next = calcPaymentScheduleFromPriceUsd(price, DEFAULT_LEASING_PARAMS);
      setSchedule(next);
      const m36 = next.find((x) => x.termMonths === 36);
      if (m36) {
        setValues((prev) => ({
          ...prev,
          priceUSD: raw,
          monthlyPayment: String(m36.monthlyUah),
          advancePayment: String(m36.advanceUah),
        }));
      }
    }
  };

  const addPhoto = () => {
    const url = photoDraft.trim();
    if (!url) return;
    const next = [...photos, url].join(" ");
    setField("photo", next);
    setPhotoDraft("");
  };

  const removePhoto = (index: number) => {
    const next = photos.filter((_, i) => i !== index).join(" ");
    setField("photo", next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Вкажіть назву авто");
      return;
    }
    if (!values.brand.trim() || !values.mark.trim()) {
      setError("Оберіть марку і модель");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка збереження");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="admin-card border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <section className="admin-card space-y-4">
        <h3 className="font-bold text-base">Медіа</h3>
        <div>
          <label className="block text-sm font-semibold mb-2">Фото (URL)</label>
          <div className="flex gap-2">
            <input
              className="admin-input flex-1"
              value={photoDraft}
              onChange={(e) => setPhotoDraft(e.target.value)}
              placeholder="https://...jpg"
            />
            <button type="button" onClick={addPhoto} className="admin-btn admin-btn-secondary">
              +
            </button>
          </div>
          <p className="text-xs text-muted mt-2">Можна додати кілька фото по черзі</p>
          {photos.length > 0 && (
            <div className="mt-3 space-y-2">
              {photos.map((url, i) => (
                <div
                  key={`${url}-${i}`}
                  className="flex items-center gap-2 p-2 rounded-xl border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveCarPhotoUrl(url)} alt="" className="w-14 h-10 object-cover rounded-lg bg-surface" />
                  <p className="text-xs text-muted truncate flex-1">{url}</p>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="text-red-600 text-sm font-semibold px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Відео (URL YouTube / файл)</label>
          <input
            className="admin-input"
            value={values.video}
            onChange={(e) => setField("video", e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </section>

      <section className="admin-card space-y-4">
        <h3 className="font-bold text-base">Основне</h3>
        <div>
          <label className="block text-sm font-semibold mb-2">Назва</label>
          <input
            className="admin-input"
            value={values.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Toyota RAV4 2021"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Марка</label>
            <input
              className="admin-input"
              list="car-brands-list"
              value={values.brand}
              onChange={(e) => setField("brand", e.target.value)}
              placeholder="Toyota, BYD, Škoda…"
              required
              autoComplete="off"
            />
            <datalist id="car-brands-list">
              {brands.map((b) => (
                <option key={b.value} value={b.title} />
              ))}
            </datalist>
            <p className="text-xs text-muted mt-1">Оберіть зі списку або введіть свою</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Модель</label>
            <input
              className="admin-input"
              list="car-models-list"
              value={values.mark}
              onChange={(e) => setField("mark", e.target.value)}
              placeholder="RAV4, Model Y, Octavia…"
              required
              autoComplete="off"
            />
            <datalist id="car-models-list">
              {models.map((m) => (
                <option key={m.value} value={m.title} />
              ))}
            </datalist>
            <p className="text-xs text-muted mt-1">Оберіть зі списку або введіть свою</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Категорія</label>
          <select
            className="admin-input"
            value={values.category}
            onChange={(e) => setField("category", e.target.value)}
          >
            <option value="">Без категорії</option>
            {categories.map((c) => (
              <option key={c.key} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Партнер</label>
          <select
            className="admin-input"
            value={values.partnerId}
            onChange={(e) => setField("partnerId", e.target.value)}
          >
            <option value="">Без партнера</option>
            {partners.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted mt-1">
            Авто зʼявиться в каталозі партнера за окремим посиланням
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Рік</label>
            <input
              className="admin-input"
              type="number"
              min={1990}
              max={2035}
              value={values.year}
              onChange={(e) => setField("year", e.target.value)}
              placeholder="2021"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Пробіг, км</label>
            <input
              className="admin-input"
              inputMode="numeric"
              value={values.mileage}
              onChange={(e) => setField("mileage", e.target.value)}
              placeholder="45000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Двигун</label>
            <select
              className="admin-input"
              value={values.engineType}
              onChange={(e) => setField("engineType", e.target.value)}
            >
              <option value="">Оберіть</option>
              {ENGINE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              {values.engineType && !ENGINE_OPTIONS.includes(values.engineType) && (
                <option value={values.engineType}>{values.engineType}</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Коробка передач</label>
            <select
              className="admin-input"
              value={values.transmission}
              onChange={(e) => setField("transmission", e.target.value)}
            >
              <option value="">Оберіть</option>
              {TRANSMISSION_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              {values.transmission &&
                !TRANSMISSION_OPTIONS.includes(values.transmission) && (
                  <option value={values.transmission}>{values.transmission}</option>
                )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Тип кузова</label>
            <select
              className="admin-input"
              value={values.bodyType}
              onChange={(e) => setField("bodyType", e.target.value)}
            >
              <option value="">Оберіть</option>
              {BODY_TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              {values.bodyType && !BODY_TYPE_OPTIONS.includes(values.bodyType) && (
                <option value={values.bodyType}>{values.bodyType}</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Привід</label>
            <select
              className="admin-input"
              value={values.driveType}
              onChange={(e) => setField("driveType", e.target.value)}
            >
              <option value="">Оберіть</option>
              {DRIVE_TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              {values.driveType && !DRIVE_TYPE_OPTIONS.includes(values.driveType) && (
                <option value={values.driveType}>{values.driveType}</option>
              )}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Статус</label>
          <select
            className="admin-input"
            value={values.status}
            onChange={(e) => setField("status", e.target.value)}
          >
            {CAR_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="admin-card space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-base">Ціна і фінансування</h3>
            <p className="text-xs text-muted mt-1">
              Платежі 24 / 36 / 48 рахуються з ціни ($) за лізинговою моделлю
            </p>
          </div>
          <button
            type="button"
            onClick={() => applyAutoPayments()}
            className="admin-btn admin-btn-secondary text-sm shrink-0"
          >
            Перерахувати
          </button>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Повна ціна, $</label>
          <input
            className="admin-input"
            inputMode="decimal"
            value={values.priceUSD}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="18500"
          />
        </div>
        {schedule.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {schedule.map((item) => (
              <div
                key={item.termMonths}
                className={`rounded-xl border p-3 text-center ${
                  item.termMonths === 36 ? "border-brand bg-brand-light/40" : "border-border"
                }`}
              >
                <p className="text-xs text-muted mb-1">{item.termMonths} міс</p>
                <p className="text-sm font-bold">
                  {item.monthlyUah.toLocaleString("uk-UA")} ₴
                </p>
                <p className="text-[10px] text-muted mt-1">
                  аванс {Math.round(item.advanceUah / 1000)}k
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Щомісячний платіж, ₴ (36 міс)</label>
            <input
              className="admin-input"
              inputMode="decimal"
              value={values.monthlyPayment}
              onChange={(e) => setField("monthlyPayment", e.target.value)}
              placeholder="18000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Авансовий внесок, ₴</label>
            <input
              className="admin-input"
              inputMode="decimal"
              value={values.advancePayment}
              onChange={(e) => setField("advancePayment", e.target.value)}
              placeholder="200000"
            />
          </div>
        </div>
      </section>

      <section className="admin-card space-y-3">
        <h3 className="font-bold text-base">Опис</h3>
        <textarea
          className="admin-input min-h-[140px]"
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Короткий опис авто для клієнта"
          rows={5}
        />
      </section>

      <button type="submit" disabled={saving} className="admin-btn admin-btn-primary w-full">
        {saving ? "Збереження..." : submitLabel}
      </button>
    </form>
  );
}
