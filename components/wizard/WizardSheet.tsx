"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

function parseAmount(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function formatAmountInput(value: number): string {
  if (value <= 0) return "";
  return value.toLocaleString("uk-UA");
}

interface WizardAmountSheetProps {
  open: boolean;
  title: string;
  subtitle?: string;
  initialValue?: number;
  suffix?: string;
  quickOptions?: number[];
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (value: number) => void;
  onClose: () => void;
}

export function WizardAmountSheet({
  open,
  title,
  subtitle,
  initialValue = 0,
  suffix = "₴",
  quickOptions = [25_000, 75_000, 150_000, 300_000, 500_000],
  confirmLabel = "Зберегти",
  cancelLabel = "Скасувати",
  onConfirm,
  onClose,
}: WizardAmountSheetProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rawValue, setRawValue] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setRawValue(formatAmountInput(initialValue));
      requestAnimationFrame(() => setVisible(true));
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [open, initialValue]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const amount = parseAmount(rawValue);

  const handleConfirm = useCallback(() => {
    onConfirm(amount);
    onClose();
  }, [amount, onConfirm, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={`wizard-sheet-root ${visible ? "wizard-sheet-root-visible" : ""}`}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`wizard-sheet ${visible ? "wizard-sheet-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wizard-sheet-handle" aria-hidden />

        <h3 id={titleId} className="wizard-sheet-title">
          {title}
        </h3>
        {subtitle && <p className="wizard-sheet-subtitle">{subtitle}</p>}

        <div className="wizard-sheet-input-wrap">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={rawValue}
            placeholder="0"
            onChange={(e) => {
              const next = parseAmount(e.target.value);
              setRawValue(next > 0 ? formatAmountInput(next) : "");
            }}
            className="wizard-sheet-input"
            aria-label={title}
          />
          <span className="wizard-sheet-suffix">{suffix}</span>
        </div>


        {quickOptions.length > 0 && (
          <div className="wizard-sheet-quick">
            {quickOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setRawValue(formatAmountInput(opt))}
                className={`wizard-sheet-quick-btn ${
                  amount === opt ? "wizard-sheet-quick-btn-active" : ""
                }`}
              >
                {opt.toLocaleString("uk-UA")} {suffix}
              </button>
            ))}
          </div>
        )}

        <div className="wizard-sheet-actions">
          <button type="button" onClick={onClose} className="wizard-sheet-btn-secondary">
            {cancelLabel}
          </button>
          <button type="button" onClick={handleConfirm} className="wizard-sheet-btn-primary">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

interface WizardAlertSheetProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
}

export function WizardAlertSheet({
  open,
  title,
  message,
  confirmLabel = "Зрозуміло",
  onClose,
}: WizardAlertSheetProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={`wizard-sheet-root ${visible ? "wizard-sheet-root-visible" : ""}`}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`wizard-sheet wizard-sheet-compact ${visible ? "wizard-sheet-visible" : ""}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wizard-sheet-handle" aria-hidden />
        <div className="wizard-sheet-icon">!</div>
        <h3 id={titleId} className="wizard-sheet-title text-center">
          {title}
        </h3>
        <p className="wizard-sheet-subtitle text-center mb-6">{message}</p>
        <button type="button" onClick={onClose} className="wizard-sheet-btn-primary w-full">
          {confirmLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
