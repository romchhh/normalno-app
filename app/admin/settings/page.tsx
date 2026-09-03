"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [telegramChatId, setTelegramChatId] = useState("");
  const [telegramPublishChannelId, setTelegramPublishChannelId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [channelInfo, setChannelInfo] = useState("");

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
          setTelegramPublishChannelId(data.telegramPublishChannelId || "");
        }
      } catch {
        setError("Помилка завантаження налаштувань");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleCheckChannel = async () => {
    setError("");
    setSuccess("");
    setChannelInfo("");
    setChecking(true);
    try {
      const res = await fetch("/api/admin/telegram-channel/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId: telegramPublishChannelId }),
      });
      const data = await res.json();
      if (data.ok) {
        const label = [data.title, data.username ? `@${data.username}` : null, data.channelId]
          .filter(Boolean)
          .join(" · ");
        setChannelInfo(`Права ОК: ${label}`);
        setTelegramPublishChannelId(String(data.channelId || telegramPublishChannelId));
        setSuccess("Бот має права публікувати в цьому каналі");
      } else {
        setError(data.error || "Немає прав у каналі");
      }
    } catch {
      setError("Помилка перевірки каналу");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setChannelInfo("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramChatId, telegramPublishChannelId }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.settings?.telegramPublishChannelId) {
          setTelegramPublishChannelId(data.settings.telegramPublishChannelId);
        }
        if (data.channelCheck?.ok) {
          const label = [
            data.channelCheck.title,
            data.channelCheck.username ? `@${data.channelCheck.username}` : null,
          ]
            .filter(Boolean)
            .join(" · ");
          setChannelInfo(label ? `Канал: ${label}` : "");
        }
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
        <p className="text-sm text-muted mt-1">Заявки, канал публікації та бот</p>
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
        {channelInfo && (
          <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-xl px-4 py-3 text-sm">
            {channelInfo}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Chat ID для заявок</label>
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

        <div>
          <label className="block text-sm font-semibold mb-2">Канал для публікації авто</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="admin-input flex-1"
              value={telegramPublishChannelId}
              onChange={(e) => setTelegramPublishChannelId(e.target.value)}
              placeholder="-100xxxxxxxxxx або @channel"
            />
            <button
              type="button"
              onClick={handleCheckChannel}
              disabled={checking || !telegramPublishChannelId.trim()}
              className="admin-btn admin-btn-secondary"
            >
              {checking ? "Перевірка..." : "Перевірити права"}
            </button>
          </div>
          <p className="text-xs text-muted mt-2">
            Додайте бота адміном каналу з правом публікувати повідомлення. При збереженні права
            перевіряються автоматично.
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
