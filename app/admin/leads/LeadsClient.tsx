"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SheetModal from "@/components/SheetModal";

type Lead = {
  id: number;
  name: string;
  phone: string;
  message: string | null;
  source: string;
  status: string;
  carId: number | null;
  carLabel: string | null;
  telegramId: string | null;
  telegramUsername: string | null;
  bitrixLeadId: number | null;
  bitrixStatus: string | null;
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  new: "Нова",
  in_progress: "В роботі",
  done: "Готово",
  spam: "Спам",
};

const SOURCE_LABELS: Record<string, string> = {
  contact: "Контакт",
  order: "Замовлення",
  wizard: "Wizard",
  modal: "Модалка",
  section: "Секція",
};

function badgeClass(status: string) {
  if (status === "new") return "admin-badge-new";
  if (status === "in_progress") return "admin-badge-progress";
  if (status === "done") return "admin-badge-done";
  return "admin-badge-spam";
}

export default function LeadsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ newCount: 0, inProgressCount: 0, doneCount: 0 });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [source, setSource] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      status,
      source,
    });
    if (q.trim()) params.set("q", q.trim());
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setStats(data.stats || { newCount: 0, inProgressCount: 0, doneCount: 0 });
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);

    const focusId = searchParams.get("id");
    if (focusId && data.leads) {
      const found = data.leads.find((l: Lead) => String(l.id) === focusId);
      if (found) setSelected(found);
    }
  }, [page, status, source, q, searchParams]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: number, nextStatus: string) => {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
      if (selected?.id === id) setSelected(data.lead);
      load();
    }
  };

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: "new", label: "Нові", value: stats.newCount },
          { key: "in_progress", label: "В роботі", value: stats.inProgressCount },
          { key: "done", label: "Готово", value: stats.doneCount },
        ].map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => {
              setStatus(s.key);
              setPage(1);
            }}
            className={`admin-stat text-left ${status === s.key ? "border-brand" : ""}`}
          >
            <p className="admin-stat-label">{s.label}</p>
            <p className="admin-stat-value text-xl">{s.value}</p>
          </button>
        ))}
      </div>

      <div className="admin-card space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="admin-input flex-1"
            placeholder="Пошук: імʼя, телефон, авто..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                load();
              }
            }}
          />
          <select
            className="admin-input sm:w-40"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">Усі джерела</option>
            <option value="wizard">Wizard</option>
            <option value="order">Замовлення</option>
            <option value="contact">Контакт</option>
            <option value="modal">Модалка</option>
          </select>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => {
              setPage(1);
              load();
            }}
          >
            Знайти
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "Усі" },
            { key: "new", label: "Нові" },
            { key: "in_progress", label: "В роботі" },
            { key: "done", label: "Готово" },
            { key: "spam", label: "Спам" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setStatus(f.key);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                status === f.key
                  ? "bg-brand text-white border-brand"
                  : "bg-white border-border text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">Знайдено: {total}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
        </div>
      ) : leads.length === 0 ? (
        <div className="admin-card admin-empty">Заявок не знайдено</div>
      ) : (
        <div className="space-y-2">
          {leads.map((lead) => (
            <button
              key={lead.id}
              type="button"
              onClick={() => setSelected(lead)}
              className="admin-card w-full text-left hover:border-brand/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-bold truncate">{lead.name}</p>
                    <span className={`admin-badge ${badgeClass(lead.status)}`}>
                      {STATUS_LABELS[lead.status] || lead.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{lead.phone}</p>
                  {lead.carLabel && (
                    <p className="text-sm text-muted mt-1 line-clamp-1">{lead.carLabel}</p>
                  )}
                  <p className="text-xs text-muted mt-2">
                    {SOURCE_LABELS[lead.source] || lead.source} ·{" "}
                    {new Date(lead.createdAt).toLocaleString("uk-UA")}
                  </p>
                </div>
                <svg className="w-5 h-5 text-muted flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
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

      {selected && (
        <SheetModal
          zClassName="z-50"
          className="sm:max-w-lg overflow-y-auto"
          onClose={() => {
            setSelected(null);
            router.replace("/admin/leads");
          }}
        >
            <div className="p-5 pt-2 sm:pt-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-extrabold">{selected.name}</h3>
                <a href={`tel:${selected.phone}`} className="text-brand font-semibold text-lg">
                  {selected.phone}
                </a>
              </div>
              <span className={`admin-badge ${badgeClass(selected.status)}`}>
                {STATUS_LABELS[selected.status] || selected.status}
              </span>
            </div>

            <div className="space-y-3 text-sm mb-5">
              <p>
                <span className="text-muted">Джерело:</span>{" "}
                {SOURCE_LABELS[selected.source] || selected.source}
              </p>
              {selected.carLabel && (
                <p>
                  <span className="text-muted">Авто:</span> {selected.carLabel}
                  {selected.carId ? (
                    <>
                      {" "}
                      <Link href={`/car/${selected.carId}`} className="text-brand" target="_blank">
                        відкрити
                      </Link>
                    </>
                  ) : null}
                </p>
              )}
              {selected.message && (
                <p>
                  <span className="text-muted">Повідомлення:</span> {selected.message}
                </p>
              )}
              {selected.telegramUsername && (
                <p>
                  <span className="text-muted">Telegram:</span> @{selected.telegramUsername}
                </p>
              )}
              {selected.bitrixLeadId && (
                <p>
                  <span className="text-muted">Bitrix ID:</span> {selected.bitrixLeadId} (
                  {selected.bitrixStatus || "—"})
                </p>
              )}
              <p>
                <span className="text-muted">Створено:</span>{" "}
                {new Date(selected.createdAt).toLocaleString("uk-UA")}
              </p>
            </div>

            <p className="text-sm font-semibold mb-2">Статус</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(["new", "in_progress", "done", "spam"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateStatus(selected.id, s)}
                  className={`admin-btn ${
                    selected.status === s ? "admin-btn-primary" : "admin-btn-secondary"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>

            <a href={`tel:${selected.phone}`} className="admin-btn admin-btn-primary w-full mb-2">
              Подзвонити
            </a>
            <button
              type="button"
              className="admin-btn admin-btn-secondary w-full"
              onClick={() => {
                setSelected(null);
                router.replace("/admin/leads");
              }}
            >
              Закрити
            </button>
            </div>
        </SheetModal>
      )}
    </div>
  );
}
