"use client";

import { useState } from "react";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/brand";
import SheetModal from "./SheetModal";

interface BannerProps {
  bannerTimestamp: number;
}

export default function Banner({ bannerTimestamp }: BannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-6 pb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="block w-full group"
        >
          <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-soft cursor-pointer">
            <Image
              src={`/sale-banner.png?v=${bannerTimestamp}`}
              alt="Акція, Знижки"
              fill
              className="object-cover"
            />
          </div>
        </button>
      </section>

      {isModalOpen && (
        <ContactButtonModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

function ContactButtonModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format phone number with +38 mask
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("38")) {
      return `+38${digits.slice(2, 12)}`;
    } else if (digits.startsWith("0")) {
      return `+38${digits.slice(1, 11)}`;
    } else if (digits.length > 0) {
      return `+38${digits.slice(0, 10)}`;
    }
    return "+38";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message: message || null,
          formType: "contact",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка відправки даних");
      }

      setSubmitted(true);
      setTimeout(() => {
        setName("");
        setPhone("");
        setMessage("");
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const errorMessage = err instanceof Error ? err.message : "Помилка відправки даних. Спробуйте ще раз.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetModal onClose={onClose}>
        <button
          onClick={onClose}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Зв&apos;язатися з нами
          </h2>

          {/* Telegram Link */}
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full mb-6 px-6 py-4 bg-gradient-to-r from-brand to-brand-hover text-white rounded-xl hover:from-brand-hover hover:to-brand transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span>💬 Написати менеджеру в Telegram</span>
          </a>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">або</span>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-green-600 font-semibold text-lg">
                Дані успішно надіслані!
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Ми зв&apos;яжемося з вами найближчим часом
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ім&apos;я
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ваше ім&apos;я"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+38 (XXX) XXX-XX-XX"
                  maxLength={13}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Формат: +38XXXXXXXXX</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Повідомлення (необов&apos;язково)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ваше повідомлення"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? "Відправка..." : "Надіслати"}
              </button>
            </form>
          )}
        </div>
    </SheetModal>
  );
}

