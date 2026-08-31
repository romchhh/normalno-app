"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WIZARD_BRANDS } from "@/lib/brands";
import type { LeasingConfig, WizardConfig } from "@/lib/wizard/types";

type WizardConfigForm = WizardConfig & { telegramChatId: string };

function toPct(v: number) {
  return Math.round(v * 10000) / 100;
}

function fromPct(v: number) {
  return v / 100;
}

export default function WizardSettingsClient() {
  const router = useRouter();
  const [config, setConfig] = useState<WizardConfigForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/auth").then((r) => r.json()),
      fetch("/api/admin/wizard-config").then((r) => r.json()),
    ]).then(([auth, cfg]) => {
      if (!auth.authenticated) {
        router.push("/admin/login");
        return;
      }
      if (auth.user?.role !== "super_admin") {
        setForbidden(true);
        setLoading(false);
        return;
      }
      setConfig({
        ...cfg,
        popularBrandIds: Array.isArray(cfg.popularBrandIds) ? cfg.popularBrandIds : [],
        motivations: Array.isArray(cfg.motivations) ? cfg.motivations : [],
        bodyTypes: Array.isArray(cfg.bodyTypes) ? cfg.bodyTypes : [],
        leasing: cfg.leasing || {},
        telegramChatId: cfg.telegramChatId || "",
      });
      setLoading(false);
    });
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/wizard-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setMessage(res.ok ? "Збережено" : "Помилка збереження");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="admin-card admin-empty max-w-xl">
        Доступ лише для Super Admin
      </div>
    );
  }

  if (!config) return null;

  const setNumber = (key: keyof WizardConfigForm, value: number) => {
    setConfig({ ...config, [key]: value });
  };

  const setLeasingPct = (key: keyof LeasingConfig, pct: number) => {
    setConfig({
      ...config,
      leasing: { ...config.leasing, [key]: fromPct(pct) },
    });
  };

  const setLeasingNum = (key: keyof LeasingConfig, value: number) => {
    setConfig({
      ...config,
      leasing: { ...config.leasing, [key]: value },
    });
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Калькулятор / Wizard</h2>
          <p className="text-sm text-muted mt-1">Параметри, довідники та Bitrix</p>
        </div>
        <Link href="/admin/wizard/analytics" className="admin-btn admin-btn-secondary text-sm">
          Аналітика →
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="admin-card space-y-4">
          <p className="font-semibold">Платіж / калькулятор</p>
          {(
            [
              ["k", "Коефіцієнт k (legacy)"],
              ["defaultTermMonths", "Строк за замовчуванням (міс)"],
              ["paymentMin", "Мін. платіж (₴)"],
              ["paymentMax", "Макс. платіж (₴)"],
              ["paymentStep", "Крок слайдера (₴)"],
              ["defaultMonthlyPayment", "Платіж за замовчуванням (₴)"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-semibold mb-2">{label}</label>
              <input
                type="number"
                step="any"
                value={config[key]}
                onChange={(e) => setNumber(key, parseFloat(e.target.value) || 0)}
                className="admin-input"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold mb-2">Bitrix webhook (опційно)</label>
            <input
              type="text"
              value={config.bitrixWebhookUrl}
              onChange={(e) => setConfig({ ...config, bitrixWebhookUrl: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Telegram Chat ID</label>
            <input
              type="text"
              value={config.telegramChatId}
              onChange={(e) => setConfig({ ...config, telegramChatId: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <p className="font-semibold">Лізинг (%)</p>
          {(
            [
              ["annualRate", "Річна ставка"],
              ["optimalAdvance", "Оптимальний аванс"],
              ["accessibleAdvance", "Доступний аванс"],
              ["orgFee", "Орг. внесок"],
              ["kaskoRate", "КАСКО"],
              ["serviceRate", "Сервіс"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-semibold mb-2">{label} (%)</label>
              <input
                type="number"
                step="0.01"
                value={toPct(config.leasing[key])}
                onChange={(e) => setLeasingPct(key, parseFloat(e.target.value) || 0)}
                className="admin-input"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold mb-2">Місяців страхування</label>
            <input
              type="number"
              value={config.leasing.insuranceMonths}
              onChange={(e) => setLeasingNum("insuranceMonths", parseInt(e.target.value, 10) || 0)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Множник макс. платежу</label>
            <input
              type="number"
              step="any"
              value={config.leasing.maxPaymentMultiplier}
              onChange={(e) =>
                setLeasingNum("maxPaymentMultiplier", parseFloat(e.target.value) || 0)
              }
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-card space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">Мотивації</p>
            <button
              type="button"
              className="admin-btn admin-btn-secondary text-sm"
              onClick={() =>
                setConfig({
                  ...config,
                  motivations: [...config.motivations, { id: "", label: "" }],
                })
              }
            >
              + Додати
            </button>
          </div>
          {config.motivations.map((m, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <input
                className="admin-input sm:w-40"
                placeholder="id"
                value={m.id}
                onChange={(e) => {
                  const motivations = [...config.motivations];
                  motivations[i] = { ...m, id: e.target.value };
                  setConfig({ ...config, motivations });
                }}
              />
              <input
                className="admin-input flex-1"
                placeholder="Назва"
                value={m.label}
                onChange={(e) => {
                  const motivations = [...config.motivations];
                  motivations[i] = { ...m, label: e.target.value };
                  setConfig({ ...config, motivations });
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary text-sm text-red-600"
                onClick={() =>
                  setConfig({
                    ...config,
                    motivations: config.motivations.filter((_, j) => j !== i),
                  })
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="admin-card space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">Типи кузова</p>
            <button
              type="button"
              className="admin-btn admin-btn-secondary text-sm"
              onClick={() =>
                setConfig({
                  ...config,
                  bodyTypes: [...config.bodyTypes, { id: "", label: "", icon: "" }],
                })
              }
            >
              + Додати
            </button>
          </div>
          {config.bodyTypes.map((b, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <input
                className="admin-input sm:w-28"
                placeholder="id"
                value={b.id}
                onChange={(e) => {
                  const bodyTypes = [...config.bodyTypes];
                  bodyTypes[i] = { ...b, id: e.target.value };
                  setConfig({ ...config, bodyTypes });
                }}
              />
              <input
                className="admin-input flex-1"
                placeholder="Назва"
                value={b.label}
                onChange={(e) => {
                  const bodyTypes = [...config.bodyTypes];
                  bodyTypes[i] = { ...b, label: e.target.value };
                  setConfig({ ...config, bodyTypes });
                }}
              />
              <input
                className="admin-input sm:w-20"
                placeholder="icon"
                value={b.icon || ""}
                onChange={(e) => {
                  const bodyTypes = [...config.bodyTypes];
                  bodyTypes[i] = { ...b, icon: e.target.value };
                  setConfig({ ...config, bodyTypes });
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary text-sm text-red-600"
                onClick={() =>
                  setConfig({
                    ...config,
                    bodyTypes: config.bodyTypes.filter((_, j) => j !== i),
                  })
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="admin-card space-y-3">
          <p className="font-semibold">Популярні марки (екран 9)</p>
          <p className="text-xs text-muted">Якщо нічого не обрано — показуються всі марки</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {WIZARD_BRANDS.map((brand) => {
              const checked = config.popularBrandIds.includes(brand.id);
              return (
                <label
                  key={brand.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const popularBrandIds = checked
                        ? config.popularBrandIds.filter((id) => id !== brand.id)
                        : [...config.popularBrandIds, brand.id];
                      setConfig({ ...config, popularBrandIds });
                    }}
                  />
                  {brand.label}
                </label>
              );
            })}
          </div>
        </div>

        {message && (
          <p
            className={`text-sm font-medium ${
              message === "Збережено" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary w-full">
          {saving ? "Збереження..." : "Зберегти"}
        </button>
      </form>
    </div>
  );
}
