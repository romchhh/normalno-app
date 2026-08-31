"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [telegramChatId, setTelegramChatId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const auth = await fetch("/api/admin/auth").then((r) => r.json());
        if (!auth.authenticated) {
          router.push("/admin/login");
          return;
        }
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setTelegramChatId(data.telegramChatId || "");
        }
      } catch {
        setError("Помилка завантаження налаштувань");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramChatId }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Збережено");
        setTimeout(() => setSuccess(""), 2500);
      } else {
        setError(data.error || "Помилка збереження");
      }
    } catch {
      setError("Помилка підключення");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Telegram / Система</h2>
        <p className="text-sm text-muted mt-1">Куди слати заявки з сайту</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Telegram Chat ID</label>
          <input
            className="admin-input"
            value={telegramChatId}
            onChange={(e) => setTelegramChatId(e.target.value)}
            placeholder="-100xxxxxxxxxx"
          />
          <p className="text-xs text-muted mt-2">
            ID чату/групи, куди бот надсилає заявки з форм сайту
          </p>
        </div>

        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary w-full">
          {saving ? "Збереження..." : "Зберегти"}
        </button>
      </form>

      <div className="admin-card text-sm text-muted space-y-2">
        <p>
          <strong className="text-foreground">Telegram-бот:</strong> додайте{" "}
          <code className="font-mono text-xs">TELEGRAM_BOT_TOKEN</code> і{" "}
          <code className="font-mono text-xs">WEB_APP_URL</code> у{" "}
          <code className="font-mono text-xs">.env</code>, потім{" "}
          <code className="font-mono text-xs">npm run bot</code>.
        </p>
        <p>
          Команда <code className="font-mono text-xs">/start</code> — привітання, кнопки Mini App і
          запис користувача в БД. Розсилка — у розділі{" "}
          <a href="/admin/broadcast" className="text-brand font-semibold">
            Розсилка
          </a>
          .
        </p>
        <p>
          Логін адмінки — <code className="font-mono text-xs">ADMIN_USERNAME</code> /{" "}
          <code className="font-mono text-xs">ADMIN_PASSWORD</code>. Bitrix —{" "}
          <code className="font-mono text-xs">BITRIX_URL</code>.
        </p>
      </div>
    </div>
  );
}
