"use client";

import { useEffect, useState } from "react";

type SyncStatus = {
  configured: boolean;
  pythonReady: boolean;
  setupCommand: string;
  channelId: string;
  defaultLimit: number;
};

type SyncResult = {
  imported?: number;
  updated?: number;
  skipped?: number;
  processedGroups?: number;
  errors?: string[];
  error?: string;
};

export default function TelegramChannelSyncButton() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);

  useEffect(() => {
    fetch("/api/admin/telegram-sync")
      .then((res) => res.json())
      .then((data: SyncStatus) => setStatus(data))
      .catch(() => setStatus(null));
  }, []);

  const handleSync = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/telegram-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: status?.defaultLimit || 200 }),
      });
      const data = (await res.json()) as SyncResult;
      if (!res.ok) {
        setResult({ error: data.error || "Помилка синхронізації" });
        return;
      }
      setResult(data);
    } catch {
      setResult({ error: "Не вдалося запустити синхронізацію" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card space-y-3">
      <div>
        <h3 className="font-semibold text-gray-900">Telegram канал</h3>
        <p className="text-sm text-muted mt-1">
          Підтягнути останні {status?.defaultLimit || 200} постів з каналу{" "}
          <span className="font-mono">{status?.channelId || "-1001949651952"}</span>
        </p>
      </div>

      {!status?.pythonReady && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Встановіть Python залежності:{" "}
          <code className="font-mono">{status?.setupCommand || "pip3 install -r scripts/telegram_channel/requirements.txt"}</code>
        </p>
      )}

      {!status?.configured && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Додайте TELEGRAM_API_ID і TELEGRAM_API_HASH у .env, потім один раз виконайте{" "}
          <code className="font-mono">npm run tg-sync:login</code>
        </p>
      )}

      <button
        type="button"
        onClick={handleSync}
        disabled={loading || !status?.configured || !status?.pythonReady}
        className="admin-btn admin-btn-primary text-sm disabled:opacity-50"
      >
        {loading ? "Синхронізація..." : "Синхронізувати з каналом"}
      </button>

      {result && (
        <div
          className={`text-sm rounded-lg px-3 py-2 border ${
            result.error
              ? "text-red-700 bg-red-50 border-red-200"
              : "text-green-800 bg-green-50 border-green-200"
          }`}
        >
          {result.error ? (
            result.error
          ) : (
            <>
              Додано: {result.imported ?? 0}, оновлено: {result.updated ?? 0}, пропущено:{" "}
              {result.skipped ?? 0}
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2 text-xs text-red-700">
                  Помилки: {result.errors.slice(0, 3).join("; ")}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
