"use client";

import { useEffect, type ReactNode } from "react";

type SheetModalProps = {
  onClose: () => void;
  children: ReactNode;
  /** Extra classes for the panel (e.g. max-w-3xl overflow-hidden flex flex-col) */
  className?: string;
  zClassName?: string;
};

export default function SheetModal({
  onClose,
  children,
  className = "max-w-md overflow-y-auto",
  zClassName = "z-[70]",
}: SheetModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 ${zClassName} flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4`}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`sheet-panel relative w-full bg-white shadow-2xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" aria-hidden />
        {children}
      </div>
    </div>
  );
}
