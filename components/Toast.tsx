"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "info";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div
        className={`px-4 py-2.5 rounded-xl shadow-medium text-sm font-medium animate-slide-up ${
          type === "success"
            ? "bg-foreground text-white"
            : "bg-brand text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
