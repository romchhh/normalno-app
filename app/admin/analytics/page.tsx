"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CatalogVisit {
  id: number;
  phone: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  visitedAt: string;
  user?: {
    telegramId: string;
    username: string | null;
    firstName: string;
    lastName: string | null;
  } | null;
}

export default function AnalyticsPage() {
  const [visits, setVisits] = useState<CatalogVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/catalog-visits?page=${page}&limit=30`)
      .then((r) => r.json())
      .then((data) => {
        setVisits(data.visits || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const name = (v: CatalogVisit) => {
    if (v.user) return `${v.user.firstName}${v.user.lastName ? ` ${v.user.lastName}` : ""}`;
    if (v.firstName) return `${v.firstName}${v.lastName ? ` ${v.lastName}` : ""}`;
    if (v.username) return `@${v.username}`;
    if (v.phone) return v.phone;
    return "Анонім";
  };

  return (
    <div className="space-y-4 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Відвідування каталогу</h2>
        <p className="text-sm text-muted mt-1">Всього записів: {total}</p>
      </div>

      <div className="flex gap-2">
        <Link href="/admin/wizard/analytics" className="admin-btn admin-btn-secondary text-sm">
          Wizard аналітика
        </Link>
        <Link href="/admin/leads" className="admin-btn admin-btn-secondary text-sm">
          Заявки
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
        </div>
      ) : visits.length === 0 ? (
        <div className="admin-card admin-empty">Немає відвідувань</div>
      ) : (
        <div className="space-y-2">
          {visits.map((v) => (
            <div key={v.id} className="admin-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold truncate">{name(v)}</p>
                  <p className="text-sm text-muted truncate">
                    {v.phone || (v.username ? `@${v.username}` : v.user?.telegramId || "—")}
                  </p>
                  {v.ipAddress && (
                    <p className="text-xs text-muted mt-1">IP: {v.ipAddress}</p>
                  )}
                </div>
                <p className="text-xs text-muted flex-shrink-0">
                  {new Date(v.visitedAt).toLocaleString("uk-UA")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="admin-btn admin-btn-secondary disabled:opacity-40"
          >
            ←
          </button>
          <span className="text-sm text-muted">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="admin-btn admin-btn-secondary disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
