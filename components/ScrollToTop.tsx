"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ContactButton from "./ContactButton";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  // On car pages the sticky Order CTA replaces these FABs
  const hideOnCarPage = pathname?.startsWith("/car/");

  useEffect(() => {
    if (hideOnCarPage) {
      setIsVisible(false);
      return;
    }

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [hideOnCarPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (hideOnCarPage || !isVisible) return null;

  return (
    <>
      <ContactButton />
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 sm:right-6 z-50 p-2.5 bg-white text-muted border border-border rounded-full shadow-soft hover:text-brand hover:border-brand/30 transition-colors"
        aria-label="Повернутися наверх"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}

