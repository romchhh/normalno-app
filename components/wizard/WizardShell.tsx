"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND_NAME } from "@/lib/brand";
import { PROGRESS_LABELS, getProgressSegment } from "@/lib/wizard/types";
import type { WizardStep } from "@/lib/wizard/types";

interface WizardShellProps {
  step: WizardStep;
  onBack?: () => void;
  showProgress?: boolean;
  footer?: ReactNode;
  children: ReactNode;
}

export default function WizardShell({
  step,
  onBack,
  showProgress = true,
  footer,
  children,
}: WizardShellProps) {
  const segment = getProgressSegment(step);

  return (
    <div className="min-h-dvh flex flex-col bg-white text-foreground">
      {step !== "hero" && (
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="p-2.5 -ml-1 text-muted hover:text-foreground rounded-full hover:bg-surface"
                aria-label="Назад"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div className="w-11" />
            )}
            <Link href="/wizard" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt={BRAND_NAME} width={32} height={32} />
              <span className="text-base font-bold text-brand">NORMALNO</span>
            </Link>
            <div className="w-11" />
          </div>

          {showProgress && segment >= 0 && (
            <div className="max-w-lg mx-auto mt-4">
              <div className="flex gap-1.5">
                {PROGRESS_LABELS.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div
                      className={`wizard-progress-bar transition-colors ${
                        i <= segment ? "bg-brand" : "bg-border"
                      }`}
                    />
                    <p
                      className={`text-[10px] mt-1.5 text-center truncate ${
                        i === segment ? "text-brand font-semibold" : "text-muted"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
      )}

      <main className="flex-1 px-5 py-7 max-w-lg mx-auto w-full">{children}</main>

      {footer && (
        <footer className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-border px-5 py-5 safe-area-pb">
          <div className="max-w-lg mx-auto">{footer}</div>
        </footer>
      )}
    </div>
  );
}
