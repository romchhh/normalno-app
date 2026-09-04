"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import SheetModal from "./SheetModal";

export type OrderCarInfo = {
  id?: number;
  title?: string;
  brand?: string | null;
  mark?: string | null;
  year?: number | null;
  priceUSD?: string | null;
};

interface OrderProps {
  carInfo?: OrderCarInfo;
  /** Закріплена кнопка знизу після скролу минули основної CTA */
  stickyOnScroll?: boolean;
}

export default function Order({ carInfo, stickyOnScroll = false }: OrderProps = {}) {
  const router = useRouter();
  const primaryRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!stickyOnScroll || !primaryRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "-40px 0px 0px 0px" }
    );

    observer.observe(primaryRef.current);
    return () => observer.disconnect();
  }, [stickyOnScroll]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("38")) return `+38${digits.slice(2, 12)}`;
    if (digits.startsWith("0")) return `+38${digits.slice(1, 11)}`;
    if (digits.length > 0) return `+38${digits.slice(0, 10)}`;
    return "+38";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          formType: "order",
          carInfo: carInfo || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка відправки даних");
      }

      setSubmitted(true);

      if (phone && typeof window !== "undefined") {
        localStorage.setItem("userPhone", phone);
      }

      setTimeout(() => {
        setName("");
        setPhone("");
        setSubmitted(false);
        closeModal();
        if (carInfo?.id) {
          router.push(`/car/${carInfo.id}`);
        }
      }, carInfo?.id ? 5000 : 2000);
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error ? err.message : "Помилка відправки даних. Спробуйте ще раз."
      );
    } finally {
      setLoading(false);
    }
  };

  const modal: ReactNode = isModalOpen ? (
    <SheetModal onClose={closeModal}>
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-surface rounded-full transition-colors z-10"
        aria-label="Закрити"
      >
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-6 sm:p-8 pt-4 sm:pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Сподобалося авто?
        </h2>
        <p className="text-muted text-sm mb-6 text-center">
          Залишіть заявку — менеджер зв&apos;яжеться з вами
        </p>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-semibold text-lg">Дані успішно надіслані!</p>
            <p className="text-muted text-sm mt-2">Ми зв&apos;яжемося з вами найближчим часом</p>
            {carInfo?.id && (
              <p className="text-muted text-xs mt-3">
                Повертаємось на сторінку авто через 5 секунд...
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Ім&apos;я
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ваше ім'я"
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Телефон
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                placeholder="+38XXXXXXXXX"
                maxLength={13}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
              <p className="text-xs text-muted mt-1">Формат: +38XXXXXXXXX</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {loading ? "Відправка..." : "Залишити заявку"}
            </button>
          </form>
        )}
      </div>
    </SheetModal>
  ) : null;

  return (
    <>
      <button
        ref={primaryRef}
        type="button"
        onClick={openModal}
        className="w-full sm:w-auto btn-primary px-6 py-3 text-base"
      >
        Зацікавило авто
      </button>

      {stickyOnScroll && (
        <div
          className={`fixed inset-x-0 z-40 transition-all duration-300 bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:bottom-0 ${
            showSticky
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="md:hidden max-w-lg mx-auto px-3 pb-2">
            <div className="rounded-2xl border border-border bg-white/95 backdrop-blur-md shadow-soft p-3 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  Зацікавило авто?
                </p>
                <p className="text-xs text-muted truncate">
                  Залиште заявку — передзвонимо
                </p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className="shrink-0 btn-primary px-4 py-2.5 text-sm"
              >
                Заявка
              </button>
            </div>
          </div>

          <div className="hidden md:block border-t border-border bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {carInfo?.title || "Зацікавило авто?"}
                </p>
                <p className="text-sm text-muted">
                  Залиште заявку — менеджер зв&apos;яжеться з вами
                </p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className="shrink-0 btn-primary px-6 py-3"
              >
                Залишити заявку
              </button>
            </div>
          </div>
        </div>
      )}

      {modal}
    </>
  );
}
