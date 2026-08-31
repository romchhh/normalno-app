"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import WizardShell from "./WizardShell";
import BrandPicker from "./BrandPicker";
import { WizardAmountSheet } from "./WizardSheet";
import CarCard from "@/components/CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";
import {
  defaultWizardState,
  type MatchedCar,
  type StartOption,
  type WizardConfig,
  type WizardState,
  type WizardStep,
} from "@/lib/wizard/types";
import {
  calcBudgetProfile,
  calcTotalStartBudgetUah,
  estimateCarPrice,
  formatUsd,
  formatUah,
  formatUahShort,
} from "@/lib/wizard/calculator";
import { WIZARD_BRANDS } from "@/lib/brands";

const CASH_OPTIONS_UAH = [0, 50_000, 100_000, 200_000];
const TERM_OPTIONS = [24, 36, 48];

function haptic(type: "light" | "success" = "light") {
  if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
    if (type === "success") {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    } else {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  }
}

export default function WizardApp() {
  const [state, setState] = useState<WizardState>(defaultWizardState());
  const [config, setConfig] = useState<WizardConfig | null>(null);
  const [matchedCars, setMatchedCars] = useState<MatchedCar[]>([]);
  const [loaderStep, setLoaderStep] = useState(0);
  const [phone, setPhone] = useState("+38");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [tgUser, setTgUser] = useState<{
    firstName: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
  } | null>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [ready, setReady] = useState(false);
  const [customCashOpen, setCustomCashOpen] = useState(false);

  const update = useCallback((patch: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const goTo = useCallback((step: WizardStep) => {
    haptic();
    update({ step });
  }, [update]);

  const persist = useCallback(
    async (next: WizardState, funnelStep?: string) => {
      if (!telegramId) return;
      await fetch("/api/wizard/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramId,
          state: next,
          user: tgUser,
          funnelStep,
        }),
      });
    },
    [telegramId, tgUser]
  );

  useEffect(() => {
    fetch("/api/wizard/config")
      .then((r) => r.json())
      .then((cfg) => {
        setConfig(cfg);
        setState((s) => ({
          ...s,
          monthlyPayment: cfg.defaultMonthlyPayment,
          termMonths: cfg.defaultTermMonths,
        }));
      });
  }, []);

  useEffect(() => {
    const init = () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) return;
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#ffffff");
      tg.setBackgroundColor("#ffffff");

      const user = tg.initDataUnsafe?.user;
      if (user) {
        const id = String(user.id);
        setTelegramId(id);
        setTgUser({
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          languageCode: user.language_code,
        });

        fetch(`/api/wizard/session?telegramId=${id}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.isReturning && data.state) {
              const restored = { ...data.state, step: "results" as const };
              setState(restored);
              setIsReturning(true);
              if (restored.maxBudget) {
                fetch("/api/wizard/match", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    maxBudget: restored.maxBudget,
                    termMonths: restored.termMonths,
                    bodyTypes: restored.bodyTypes,
                    brands: restored.brands,
                  }),
                })
                  .then((r) => r.json())
                  .then((d) => setMatchedCars(d.cars || []));
              }
            }
            setReady(true);
          })
          .catch(() => setReady(true));
      } else {
        setReady(true);
      }
    };

    if (window.Telegram?.WebApp) {
      init();
    } else {
      const t = setTimeout(init, 200);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!ready || !telegramId || state.step === "hero") return;
    const t = setTimeout(() => persist(state, state.step), 400);
    return () => clearTimeout(t);
  }, [state, ready, telegramId, persist]);

  const budgetProfile =
    state.budgetProfile ??
    (config
      ? calcBudgetProfile(
          state.currentCarPrice,
          state.additionalCash,
          state.monthlyPayment,
          state.termMonths,
          config.leasing
        )
      : null);
  const totalStartUah = calcTotalStartBudgetUah(
    state.currentCarPrice,
    state.additionalCash
  );
  const maxBudget = state.maxBudget ?? budgetProfile?.recommendedBudgetUsd ?? 0;

  const handleStartOption = (option: StartOption) => {
    const next = { ...state, startOption: option, step: "car-info" as WizardStep };
    if (option === "has-cash") {
      next.step = "additional-cash";
    }
    setState(next);
  };

  const handleBack = () => {
    const map: Partial<Record<WizardStep, WizardStep>> = {
      "start-option": "hero",
      "car-info": "start-option",
      "price-valuation": "car-info",
      "additional-cash":
        state.startOption === "has-cash" ? "start-option" : "price-valuation",
      "monthly-payment": "additional-cash",
      term: "monthly-payment",
      motivation: "term",
      "car-prefs": "motivation",
      results: "car-prefs",
      strategy: "results",
    };
    const prev = map[state.step];
    if (prev) goTo(prev);
  };

  const runLoaderAndMatch = async () => {
    goTo("loader");
    setLoaderStep(0);

    const steps = [800, 600, 600, 500];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, steps[i]));
      setLoaderStep(i + 1);
    }

    const profile = calcBudgetProfile(
      state.currentCarPrice,
      state.additionalCash,
      state.monthlyPayment,
      state.termMonths,
      config?.leasing
    );
    const budget = profile.recommendedBudgetUsd;
    const totalStart = calcTotalStartBudgetUah(
      state.currentCarPrice,
      state.additionalCash
    );

    const res = await fetch("/api/wizard/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maxBudget: budget,
        termMonths: state.termMonths,
        bodyTypes: state.bodyTypes,
        brands: state.brands,
      }),
    });
    const data = await res.json();

    const next: WizardState = {
      ...state,
      maxBudget: budget,
      totalStartBudget: totalStart,
      budgetProfile: profile,
      step: "results",
    };
    setMatchedCars(data.cars || []);
    setState(next);
  };

  const handleSubmitStrategy = async () => {
    if (!telegramId || !tgUser) {
      setError("Відкрийте через Telegram");
      return;
    }
    if (phone.length < 13) {
      setError("Введіть коректний номер +38XXXXXXXXX");
      return;
    }

    setSubmitting(true);
    setError("");

    const res = await fetch("/api/wizard/strategy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegramId,
        state: { ...state, phone },
        phone,
        user: tgUser,
        initData: typeof window !== "undefined" ? window.Telegram?.WebApp?.initData : "",
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (data.success) {
      haptic("success");
      setSubmitted(true);
    } else {
      setError(data.error || "Помилка відправки. Спробуйте ще раз.");
    }
  };

  const toggleChip = (key: "motivations" | "bodyTypes" | "brands", id: string, max?: number) => {
    setState((prev) => {
      const arr = prev[key];
      const has = arr.includes(id);
      if (has) return { ...prev, [key]: arr.filter((x) => x !== id) };
      if (max && arr.length >= max) return prev;
      return { ...prev, [key]: [...arr, id] };
    });
  };

  const applySharedPhone = useCallback((raw: string) => {
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("380") && digits.length >= 12) {
      setPhone(`+${digits.slice(0, 12)}`);
      return;
    }
    if (digits.startsWith("0") && digits.length >= 10) {
      setPhone(`+38${digits.slice(0, 10)}`);
      return;
    }
    if (digits.length >= 9) {
      setPhone(`+38${digits.slice(-9)}`);
    }
  }, []);

  const handleRequestContact = useCallback(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.requestContact) {
      setError("Поділитися контактом доступно лише в Telegram. Введіть номер вручну.");
      return;
    }

    const onContact = (event: {
      status?: string;
      response?: { contact?: { phone_number?: string } };
    }) => {
      if (event.status === "sent" && event.response?.contact?.phone_number) {
        applySharedPhone(event.response.contact.phone_number);
        setError("");
        haptic("success");
      }
      tg.offEvent?.("contactRequested", onContact as (...args: unknown[]) => void);
    };

    tg.onEvent?.("contactRequested", onContact);
    tg.requestContact((shared) => {
      if (!shared) {
        setError("Контакт не надано — введіть номер вручну");
      }
    });
  }, [applySharedPhone]);

  if (!config || !ready) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  const footerBtn = (label: string, onClick: () => void, disabled = false) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-primary wizard-btn-primary disabled:opacity-50"
    >
      {label}
    </button>
  );

  // Screen 1: Hero
  if (state.step === "hero") {
    return (
      <WizardShell step="hero" showProgress={false}>
        <div className="flex flex-col items-center text-center pt-10 pb-6">
          <Image src="/logo.svg" alt="NORMALNO" width={80} height={80} className="mb-8" />
          <h1 className="wizard-title mb-4 max-w-sm">
            Оновіть авто без великої доплати
          </h1>
          <p className="wizard-subtitle mb-12 max-w-sm">
            Персональний підбір за вашим бюджетом та комфортним щомісячним платежем
          </p>
          <button
            type="button"
            onClick={() => goTo("start-option")}
            className="btn-primary wizard-btn-primary"
          >
            Підібрати авто →
          </button>
          <p className="text-sm text-muted mt-4">≈2 хв • без зобов&apos;язань</p>
          {isReturning && (
            <button
              type="button"
              onClick={() => goTo("results")}
              className="mt-8 text-base text-brand font-semibold"
            >
              Мій NORMALNO →
            </button>
          )}
        </div>
      </WizardShell>
    );
  }

  // Screen 2: Start option
  if (state.step === "start-option") {
    const options: { id: StartOption; icon: string; title: string; desc: string }[] = [
      { id: "has-car", icon: "🚗", title: "Є авто", desc: "Оцінимо ваше авто" },
      { id: "has-cash", icon: "💰", title: "Є гроші на старт", desc: "Додатковий внесок" },
      { id: "has-both", icon: "🚗💰", title: "Авто + гроші", desc: "Максимальний бюджет" },
    ];
    return (
      <WizardShell step={state.step} onBack={handleBack}>
        <h2 className="wizard-title mb-3">Що у вас є зараз?</h2>
        <p className="wizard-subtitle mb-8">Оберіть варіант — один тап</p>
        <div className="space-y-4">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => handleStartOption(o.id)}
              className="wizard-option"
            >
              <span className="text-4xl">{o.icon}</span>
              <div>
                <p className="text-lg font-bold">{o.title}</p>
                <p className="text-base text-muted mt-0.5">{o.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </WizardShell>
    );
  }

  // Screen 3: Car info
  if (state.step === "car-info") {
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("Далі →", () => {
          if (state.currentCarBrand && state.currentCarModel && state.currentCarYear) {
            const est = estimateCarPrice(state.currentCarYear, state.currentCarMileage || 0);
            update({ step: "price-valuation", currentCarPrice: est.avg });
          }
        }, !state.currentCarBrand || !state.currentCarModel || !state.currentCarYear)}
      >
        <h2 className="wizard-title mb-3">Ваше поточне авто</h2>
        <p className="wizard-subtitle mb-8">Марка, модель, рік і пробіг</p>
        <div className="space-y-4">
          <input
            className="wizard-input"
            placeholder="Марка (Toyota)"
            value={state.currentCarBrand || ""}
            onChange={(e) => update({ currentCarBrand: e.target.value })}
          />
          <input
            className="wizard-input"
            placeholder="Модель (RAV4)"
            value={state.currentCarModel || ""}
            onChange={(e) => update({ currentCarModel: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className="wizard-input"
              placeholder="Рік"
              value={state.currentCarYear || ""}
              onChange={(e) => update({ currentCarYear: parseInt(e.target.value) || undefined })}
            />
            <input
              type="number"
              className="wizard-input"
              placeholder="Пробіг, км"
              value={state.currentCarMileage || ""}
              onChange={(e) => update({ currentCarMileage: parseInt(e.target.value) || undefined })}
            />
          </div>
        </div>
      </WizardShell>
    );
  }

  // Screen 4: Price valuation
  if (state.step === "price-valuation") {
    const est = estimateCarPrice(state.currentCarYear || 2015, state.currentCarMileage || 100000);
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("Далі →", () => goTo("additional-cash"))}
      >
        <h2 className="wizard-title mb-3">Оцінка вашого авто</h2>
        <p className="wizard-subtitle mb-8">
          {state.currentCarBrand} {state.currentCarModel} {state.currentCarYear}
        </p>
        <div className="wizard-stat-card wizard-stat-card-accent mb-8 text-center">
          <p className="text-base text-muted mb-2">Орієнтовна вартість</p>
          <p className="wizard-highlight">{formatUsd(state.currentCarPrice)}</p>
          <p className="text-sm text-muted mt-3">
            Діапазон: {formatUsd(est.min)} – {formatUsd(est.max)}
          </p>
        </div>
        <label className="text-base font-semibold mb-3 block">Коригування оцінки</label>
        <input
          type="range"
          min={est.min}
          max={est.max}
          step={500}
          value={state.currentCarPrice}
          onChange={(e) => update({ currentCarPrice: parseInt(e.target.value) })}
          className="wizard-slider"
        />
        <div className="flex justify-between text-sm text-muted mt-2">
          <span>{formatUsd(est.min)}</span>
          <span>{formatUsd(est.max)}</span>
        </div>
      </WizardShell>
    );
  }

  // Screen 5: Additional cash
  if (state.step === "additional-cash") {
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("Далі →", () => goTo("monthly-payment"))}
      >
        <h2 className="wizard-title mb-3">Плануєте щось додати?</h2>
        <p className="wizard-subtitle mb-8">Додатковий стартовий внесок у гривнях</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {CASH_OPTIONS_UAH.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => update({ additionalCash: amt })}
              className={`wizard-chip ${
                state.additionalCash === amt ? "wizard-chip-selected" : ""
              }`}
            >
              {amt === 0 ? "0 ₴" : `+${formatUahShort(amt)}`}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              haptic();
              setCustomCashOpen(true);
            }}
            className={`wizard-chip col-span-2 ${
              state.additionalCash > 0 && !CASH_OPTIONS_UAH.includes(state.additionalCash)
                ? "wizard-chip-selected"
                : ""
            }`}
          >
            {state.additionalCash > 0 && !CASH_OPTIONS_UAH.includes(state.additionalCash)
              ? `${formatUahShort(state.additionalCash)} — змінити`
              : "Інша сума"}
          </button>
        </div>
        <WizardAmountSheet
          open={customCashOpen}
          title="Інша сума"
          subtitle="Додатковий стартовий внесок у гривнях"
          initialValue={
            CASH_OPTIONS_UAH.includes(state.additionalCash) ? 0 : state.additionalCash
          }
          quickOptions={[25_000, 75_000, 150_000, 300_000, 500_000]}
          onConfirm={(value) => {
            haptic();
            update({ additionalCash: value });
          }}
          onClose={() => setCustomCashOpen(false)}
        />
        <div className="wizard-stat-card wizard-stat-card-accent">
          <p className="text-base text-muted mb-1">Гроші на старті</p>
          <p className="wizard-highlight text-3xl">{formatUah(totalStartUah)}</p>
          <p className="text-sm text-muted mt-2">
            Авто {formatUsd(state.currentCarPrice)}
            {state.additionalCash > 0 ? ` + ${formatUahShort(state.additionalCash)}` : ""}
          </p>
        </div>
      </WizardShell>
    );
  }

  // Screen 6: Monthly payment
  if (state.step === "monthly-payment") {
    const adjust = (delta: number) => {
      const next = Math.min(
        config.paymentMax,
        Math.max(config.paymentMin, state.monthlyPayment + delta)
      );
      update({ monthlyPayment: next });
    };
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("Далі →", () => goTo("term"))}
      >
        <h2 className="wizard-title mb-3">Комфортний платіж</h2>
        <p className="wizard-subtitle mb-10">Підберемо авто під ваш щомісячний платіж</p>
        <div className="flex items-center justify-center gap-8 mb-8">
          <button
            type="button"
            onClick={() => adjust(-config.paymentStep)}
            className="wizard-step-btn"
          >
            −
          </button>
          <div className="text-center min-w-[10rem]">
            <p className="wizard-highlight">{formatUah(state.monthlyPayment)}</p>
            <p className="text-base text-muted mt-1">/ міс</p>
          </div>
          <button
            type="button"
            onClick={() => adjust(config.paymentStep)}
            className="wizard-step-btn"
          >
            +
          </button>
        </div>
        <input
          type="range"
          min={config.paymentMin}
          max={config.paymentMax}
          step={config.paymentStep}
          value={state.monthlyPayment}
          onChange={(e) => update({ monthlyPayment: parseInt(e.target.value) })}
          className="wizard-slider"
        />
        <div className="flex justify-between text-sm text-muted mt-3">
          <span>{formatUah(config.paymentMin)}</span>
          <span>{formatUah(config.paymentMax)}</span>
        </div>
      </WizardShell>
    );
  }

  // Screen 7: Term
  if (state.step === "term") {
    return (
      <WizardShell step={state.step} onBack={handleBack}>
        <h2 className="wizard-title mb-3">Строк</h2>
        <p className="wizard-subtitle mb-8">Оберіть термін фінансування</p>
        <div className="space-y-4">
          {TERM_OPTIONS.map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => {
                update({ termMonths: months });
                goTo("motivation");
              }}
              className={`wizard-option justify-between ${
                state.termMonths === months ? "wizard-option-selected" : ""
              }`}
            >
              <span className="text-xl font-bold">{months} міс</span>
              {months === 36 && (
                <span className="text-sm bg-brand text-white px-3 py-1 rounded-lg font-semibold">
                  ⭐ Рекомендовано
                </span>
              )}
            </button>
          ))}
        </div>
      </WizardShell>
    );
  }

  // Screen 8: Motivation
  if (state.step === "motivation") {
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("Далі →", () => goTo("car-prefs"))}
      >
        <h2 className="wizard-title mb-3">Мотивація оновлення</h2>
        <p className="wizard-subtitle mb-8">Оберіть до 3 варіантів</p>
        <div className="flex flex-wrap gap-3">
          {config.motivations.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleChip("motivations", m.id, 3)}
              className={`wizard-chip ${
                state.motivations.includes(m.id) ? "wizard-chip-selected" : ""
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </WizardShell>
    );
  }

  // Screen 9: Car prefs
  if (state.step === "car-prefs") {
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={footerBtn("⭐ Покажіть найкращі варіанти", runLoaderAndMatch)}
      >
        <h2 className="wizard-title mb-3">Побажання до авто</h2>
        <p className="text-base font-semibold mb-4">Тип кузова</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {config.bodyTypes.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => toggleChip("bodyTypes", b.id)}
              className={`wizard-body-chip ${
                state.bodyTypes.includes(b.id) ? "wizard-body-chip-selected" : ""
              }`}
            >
              {b.icon && <span className="text-xl">{b.icon}</span>}
              <span>{b.label}</span>
            </button>
          ))}
        </div>
        <p className="text-base font-semibold mb-4">Марки</p>
        <BrandPicker
          selected={state.brands}
          onToggle={(id) => toggleChip("brands", id)}
          brands={
            config.popularBrandIds?.length
              ? WIZARD_BRANDS.filter((b) => config.popularBrandIds.includes(b.id))
              : WIZARD_BRANDS
          }
        />
      </WizardShell>
    );
  }

  // Screen 10: Loader
  if (state.step === "loader") {
    const checks = [
      "Врахували ваш бюджет",
      "Перевірили комфортний платіж",
      "Аналізуємо авто в наявності",
      matchedCars.length > 0
        ? `Знайдено ${matchedCars.length} авто!`
        : "Підбираємо варіанти...",
    ];
    return (
      <WizardShell step={state.step} showProgress>
        <div className="flex flex-col items-center pt-10">
          <div className="animate-spin h-16 w-16 border-4 border-border border-t-brand rounded-full mb-10" />
          <div className="space-y-4 w-full">
            {checks.map((text, i) => (
              <div
                key={text}
                className={`flex items-center gap-4 text-base transition-opacity ${
                  i <= loaderStep ? "opacity-100" : "opacity-30"
                }`}
              >
                <span
                  className={`wizard-loader-check ${
                    i <= loaderStep ? "bg-brand text-white" : "bg-border text-muted"
                  }`}
                >
                  {i < loaderStep ? "✓" : i + 1}
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </WizardShell>
    );
  }

  // Screen 11: Results
  if (state.step === "results") {
    const name = tgUser?.firstName || "Друже";
    const profile = budgetProfile;
    return (
      <WizardShell
        step={state.step}
        onBack={handleBack}
        footer={
          matchedCars.length > 0
            ? undefined
            : footerBtn("Отримати стратегію →", () => goTo("strategy"))
        }
      >
        <h2 className="wizard-title mb-2">
          {name}, ваш бюджет дозволяє розглядати авто
        </h2>
        <p className="wizard-highlight mb-2">до {formatUsd(maxBudget)}</p>
        {profile && (
          <p className="text-base text-muted mb-6">
            Рекомендовано: {formatUah(profile.recommendedBudgetUah)} · макс.{" "}
            {formatUah(profile.maximumBudgetUah)}
          </p>
        )}

        {profile && (
          <div className="grid grid-cols-3 gap-2 mb-8">
            {[
              { label: "Комфорт", value: profile.comfortBudgetUah, hint: "40% старт" },
              { label: "Оптимум", value: profile.optimumBudgetUah, hint: "макс. платіж" },
              { label: "Максимум", value: profile.maximumBudgetUah, hint: "25%+7%" },
            ].map((item) => (
              <div key={item.label} className="wizard-stat-card text-center p-3">
                <p className="text-xs text-muted mb-1">{item.label}</p>
                <p className="text-sm font-bold leading-tight">{formatUahShort(item.value)}</p>
                <p className="text-[10px] text-muted mt-1">{item.hint}</p>
              </div>
            ))}
          </div>
        )}

        {matchedCars.length === 0 ? (
          <div className="wizard-stat-card text-center text-muted text-base py-8">
            За вашими параметрами зараз немає точних збігів. Ми підготуємо персональну стратегію.
          </div>
        ) : (
          <div className={`${CAR_CARD_GRID} mb-2`}>
            {matchedCars.map((car) => (
              <CarCard
                key={car.id}
                car={{
                  id: car.id,
                  photo: car.photo,
                  title: car.title,
                  priceUSD: car.priceUSD || String(car.price),
                  year: car.year,
                  mileage: car.mileage,
                  monthlyPayment: car.monthlyPaymentUah,
                  brand: car.brand,
                  mark: car.mark,
                }}
                showFavorite={false}
                selected={state.selectedCarId === car.id}
                onSelect={() => {
                  update({
                    selectedCarId: car.id,
                    selectedCarLabel: `${car.title} (${formatUsd(car.price)} / ${formatUah(car.monthlyPaymentUah)}/міс)`,
                    step: "strategy",
                  });
                }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => goTo("start-option")}
          className="w-full mt-6 text-base text-muted hover:text-brand font-medium"
        >
          Редагувати параметри
        </button>
      </WizardShell>
    );
  }

  // Screen 12: Strategy
  return (
    <WizardShell
      step="strategy"
      onBack={handleBack}
      footer={
        submitted
          ? undefined
          : footerBtn(
              submitting ? "Відправка..." : "Отримати NORMALNO стратегію →",
              handleSubmitStrategy,
              submitting
            )
      }
    >
      {submitted ? (
        <div className="text-center pt-12">
          <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="wizard-title mb-3">Стратегію надіслано!</h2>
          <p className="wizard-subtitle">Менеджер зв&apos;яжеться з вами найближчим часом</p>
        </div>
      ) : (
        <>
          <h2 className="wizard-title mb-4">Ваш попередній сценарій готовий ✓</h2>
          {state.selectedCarLabel && (
            <div className="wizard-stat-card mb-5">
              <p className="text-muted text-sm mb-1">Обране авто</p>
              <p className="font-semibold text-base">{state.selectedCarLabel}</p>
            </div>
          )}
          <div className="wizard-stat-card mb-8 space-y-2 text-base">
            <p>
              Бюджет: <strong>{formatUsd(maxBudget)}</strong>
              {budgetProfile && (
                <span className="text-muted text-sm"> ({formatUah(budgetProfile.recommendedBudgetUah)})</span>
              )}
            </p>
            <p>
              Платіж: <strong>{formatUah(state.monthlyPayment)}/міс</strong>
            </p>
            <p>
              На старті: <strong>{formatUah(totalStartUah)}</strong>
            </p>
            <p>
              Строк: <strong>{state.termMonths} міс</strong>
            </p>
          </div>
          <label className="text-base font-semibold mb-3 block">Телефон для зв&apos;язку</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              let v = e.target.value.replace(/[^\d+]/g, "");
              if (!v.startsWith("+38")) v = "+38";
              setPhone(v.slice(0, 13));
            }}
            className="wizard-input mb-3"
            placeholder="+38XXXXXXXXX"
          />
          <button
            type="button"
            onClick={handleRequestContact}
            className="w-full mb-3 text-base font-medium text-brand border border-brand/30 rounded-xl py-3 px-4 hover:bg-brand-light/40 transition-colors"
          >
            Поділитися контактом Telegram
          </button>
          {error && <p className="text-base text-red-500 mb-2">{error}</p>}
        </>
      )}
    </WizardShell>
  );
}
