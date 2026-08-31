"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/lib/brand";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-soft py-2.5"
          : "bg-white/95 backdrop-blur-md py-3.5 border-b border-border/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          <Image
            src="/logo-wordmark.png"
            alt={BRAND_NAME}
            width={200}
            height={48}
            className={`w-auto h-auto transition-all duration-300 ${
              scrolled ? "max-h-9" : "max-h-11"
            }`}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
