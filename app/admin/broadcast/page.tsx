"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type LinkButton = { id: string; text: string; url: string };

function newButton(): LinkButton {
  return { id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, text: "", url: "" };
}

export default function BroadcastPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [audience, setAudience] = useState(0);
  const [text, setText] = useState("");
  const [withAppButton, setWithAppButton] = useState(true);
  const [buttons, setButtons] = useState<LinkButton[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    total: number;
    sent: number;
    failed: number;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/auth").then((r) => r.json()),
      fetch("/api/admin/broadcast").then((r) => r.json()),
    ]).then(([auth, data]) => {
      if (!auth.authenticated) {
        router.push("/admin/login");
        return;
      }
      if (auth.user?.role && auth.user.role !== "super_admin") {
        router.push("/admin");
        return;
      }
      setConfigured(!!data.configured);
      setAudience(data.audience || 0);
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const wrapSelection = (before: string, after: string) => {
    const el = textareaRef.current;
    if (!el) {
      setText((prev) => `${before}${prev}${after}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.slice(start, end) || "текст";
    const next = text.slice(0, start) + before + selected + after + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + before.length + selected.length + after.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const insertLink = () => {
    const url = prompt("URL посилання:", "https://");
    if (!url) return;
    wrapSelection(`<a href="${url}">`, "</a>");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Оберіть зображення");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Максимальний розмір фото — 10MB");
      return;
    }
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError("");
  };

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Введіть текст повідомлення");
      return;
    }

    const validButtons = buttons.filter((b) => b.text.trim() && b.url.trim());
    for (const b of validButtons) {
      if (!/^https?:\/\//i.test(b.url.trim()) && !/^tg:\/\//i.test(b.url.trim())) {
        setError(`Кнопка «${b.text}»: URL має починатися з https://`);
        return;
      }
    }

    const ok = confirm(
      `Надіслати розсилку ${audience} користувачам бота?\n\nЦе не можна скасувати.`
    );
    if (!ok) return;

    setSending(true);
    try {
      const form = new FormData();
      form.append("text", text.trim());
      form.append("withAppButton", String(withAppButton));
      form.append("parseMode", "HTML");
      form.append(
        "buttons",
        JSON.stringify(validButtons.map((b) => ({ text: b.text.trim(), url: b.url.trim() })))
      );
      if (photo) form.append("photo", photo);

      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Помилка розсилки");
      } else {
        setResult({ total: data.total, sent: data.sent, failed: data.failed });
      }
    } catch {
      setError("Помилка з'єднання");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  const formatButtons = [
    { label: "B", title: "Жирний", action: () => wrapSelection("<b>", "</b>") },
    { label: "I", title: "Курсив", action: () => wrapSelection("<i>", "</i>") },
    { label: "U", title: "Підкреслення", action: () => wrapSelection("<u>", "</u>") },
    { label: "S", title: "Закреслення", action: () => wrapSelection("<s>", "</s>") },
    { label: "</>", title: "Код", action: () => wrapSelection("<code>", "</code>") },
    { label: "🔗", title: "Посилання в тексті", action: insertLink },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Розсилка</h2>
          <p className="text-sm text-muted mt-1">
            Повідомлення всім користувачам Telegram-бота
          </p>
        </div>
        <Link href="/admin/users" className="admin-btn admin-btn-secondary text-sm">
          Користувачі →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="admin-stat">
          <p className="admin-stat-label">Аудиторія</p>
          <p className="admin-stat-value">{audience}</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat-label">Бот</p>
          <p className={`admin-stat-value text-lg ${configured ? "text-green-600" : "text-red-600"}`}>
            {configured ? "OK" : "немає токена"}
          </p>
        </div>
      </div>

      {!configured && (
        <div className="admin-card border-amber-200 bg-amber-50 text-amber-900 text-sm">
          Додайте <code className="font-mono">TELEGRAM_BOT_TOKEN</code> у{" "}
          <code className="font-mono">.env</code> і запустіть бота (
          <code className="font-mono">npm run bot</code>) або webhook.
        </div>
      )}

      <form onSubmit={handleSend} className="admin-card space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {result && (
          <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl px-4 py-3 text-sm">
            Готово: надіслано {result.sent} з {result.total}
            {result.failed > 0 ? `, помилок ${result.failed}` : ""}.
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Фото (необовʼязково)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="admin-input"
          />
          {photoPreview && (
            <div className="mt-3 relative w-full h-48 rounded-xl overflow-hidden border border-border bg-surface">
              <Image src={photoPreview} alt="Превʼю" fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={clearPhoto}
                className="absolute top-2 right-2 admin-btn admin-btn-secondary text-xs"
              >
                Прибрати
              </button>
            </div>
          )}
          <p className="text-xs text-muted mt-1">
            Якщо є фото — текст піде в підпис (до 1024 символів у Telegram).
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Текст повідомлення</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formatButtons.map((btn) => (
              <button
                key={btn.title}
                type="button"
                title={btn.title}
                onClick={btn.action}
                className="admin-btn admin-btn-secondary text-xs min-w-9 px-2"
              >
                {btn.label}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className="admin-input min-h-[180px] font-mono text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Наприклад:\n<b>Нові авто цього тижня</b>\nДивіться каталог 🚗"}
            maxLength={3500}
            required
          />
          <p className="text-xs text-muted mt-1">
            {text.length} / 3500 · HTML: виділіть текст і натисніть B / I / U або 🔗
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label className="block text-sm font-semibold">Кнопки-посилання</label>
            <button
              type="button"
              onClick={() => setButtons((prev) => [...prev, newButton()].slice(0, 8))}
              className="admin-btn admin-btn-secondary text-xs"
              disabled={buttons.length >= 8}
            >
              + Додати кнопку
            </button>
          </div>

          {buttons.length === 0 && (
            <p className="text-xs text-muted">Можна додати до 8 кнопок з URL (https://…).</p>
          )}

          {buttons.map((btn, index) => (
            <div key={btn.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_auto] gap-2">
              <input
                className="admin-input"
                placeholder="Текст кнопки"
                value={btn.text}
                maxLength={64}
                onChange={(e) =>
                  setButtons((prev) =>
                    prev.map((b, i) => (i === index ? { ...b, text: e.target.value } : b))
                  )
                }
              />
              <input
                className="admin-input"
                placeholder="https://..."
                value={btn.url}
                onChange={(e) =>
                  setButtons((prev) =>
                    prev.map((b, i) => (i === index ? { ...b, url: e.target.value } : b))
                  )
                }
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary text-sm"
                onClick={() => setButtons((prev) => prev.filter((_, i) => i !== index))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={withAppButton}
            onChange={(e) => setWithAppButton(e.target.checked)}
            className="rounded border-border"
          />
          Додати кнопку «Відкрити застосунок»
        </label>

        <button
          type="submit"
          disabled={sending || !configured || audience === 0}
          className="admin-btn admin-btn-primary w-full disabled:opacity-50"
        >
          {sending ? "Надсилаємо…" : `Надіслати ${audience} користувачам`}
        </button>
      </form>
    </div>
  );
}
