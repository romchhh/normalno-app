"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SheetModal from "./SheetModal";

interface OrderProps {
  carInfo?: {
    id?: number;
    title?: string;
    brand?: string | null;
    mark?: string | null;
    year?: number | null;
    priceUSD?: string | null;
  };
}

export default function Order({ carInfo }: OrderProps = {}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Format phone number with +38 mask
  const formatPhone = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // If starts with 38, keep it, otherwise add +38
    // Ukrainian phone: +38 (10 digits) = 13 characters total
    if (digits.startsWith("38")) {
      return `+38${digits.slice(2, 12)}`; // 10 digits after +38
    } else if (digits.startsWith("0")) {
      return `+38${digits.slice(1, 11)}`; // 10 digits after +38
    } else if (digits.length > 0) {
      return `+38${digits.slice(0, 10)}`; // 10 digits after +38
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
          formType: "order",
          carInfo: carInfo || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Помилка відправки даних");
      }

      setSubmitted(true);
      
      // Зберегти телефон в localStorage для аналітики
      if (phone && typeof window !== "undefined") {
        localStorage.setItem("userPhone", phone);
      }
      
      // If on car page, redirect after 5 seconds
      if (carInfo?.id) {
        setTimeout(() => {
          setName("");
          setPhone("");
          setSubmitted(false);
          closeModal();
          router.push(`/car/${carInfo.id}`);
        }, 5000);
      } else {
        setTimeout(() => {
          setName("");
          setPhone("");
          setSubmitted(false);
          closeModal();
        }, 2000);
      }
    } catch (err: unknown) {
      console.error("Error submitting form:", err);
      const errorMessage = err instanceof Error ? err.message : "Помилка відправки даних. Спробуйте ще раз.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
            <button
              onClick={openModal}
              className="w-full sm:w-auto btn-primary px-6 py-3 text-base"
            >
              Зацікавило авто
            </button>

      {isModalOpen && (
        <SheetModal onClose={closeModal}>
            <button
              onClick={closeModal}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Сподобалося авто?
              </h2>
              <p className="text-gray-600 text-sm mb-6 text-center">
                Залишіть ваш запит і наш менеджер з вами сконтактує
              </p>

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
                  {carInfo?.id && (
                    <p className="text-gray-500 text-xs mt-3">
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

                         <button
                           type="submit"
                           disabled={loading}
                           className="w-full btn-primary py-3 disabled:opacity-50"
                         >
                           {loading ? "Відправка..." : "Надіслати"}
                         </button>
            </form>
              )}
            </div>
        </SheetModal>
      )}
    </>
  );
}
