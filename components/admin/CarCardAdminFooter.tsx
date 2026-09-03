"use client";

import Link from "next/link";
import { useState } from "react";
import { isCarPubliclyListed, statusLabel } from "@/lib/car-status";

type Props = {
  id: number;
  status: string | null;
  telegramPublished?: boolean;
  partnerName?: string | null;
};

function statusBadgeClass(status: string | null | undefined): string {
  if (status === "available") return "admin-badge-done";
  if (status === "on_order" || status === "reserved") return "admin-badge-progress";
  if (status === "sold" || status === "inactive") return "admin-badge-spam";
  return "admin-badge-new";
}

function IconEdit() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export default function CarCardAdminFooter({
  id,
  status,
  telegramPublished,
  partnerName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const listed = isCarPubliclyListed(status);

  const setListed = async (nextListed: boolean) => {
    if (loading) return;
    const nextStatus = nextListed ? "available" : "inactive";
    if (nextListed === listed) return;

    const ok = confirm(
      nextListed
        ? "Показати авто на сайті?"
        : "Приховати авто з сайту (деактивувати)?"
    );
    if (!ok) return;

    setLoading(true);
    try {
      await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm("Видалити це авто?")) return;
    setLoading(true);
    try {
      await fetch(`/api/cars/${id}`, { method: "DELETE" });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-car-footer">
      <div className="flex flex-wrap gap-1.5">
        <span className={`admin-badge ${statusBadgeClass(status)}`}>
          {statusLabel(status)}
        </span>
        {telegramPublished && <span className="admin-badge admin-badge-done">В каналі</span>}
        {partnerName && <span className="admin-badge admin-badge-new">{partnerName}</span>}
      </div>

      <div className="admin-toggle-row">
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">На сайті</p>
          <p className="text-xs text-muted">{listed ? "Видно в каталозі" : "Приховано"}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={listed}
          aria-label={listed ? "Приховати з сайту" : "Показати на сайті"}
          disabled={loading}
          onClick={() => setListed(!listed)}
          className={`admin-toggle ${listed ? "admin-toggle-on" : ""}`}
        >
          <span className="admin-toggle-thumb" />
        </button>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/admin/cars/${id}`}
          className="admin-icon-btn admin-icon-btn-primary flex-1"
          title="Редагувати"
        >
          <IconEdit />
          <span>Редагувати</span>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="admin-icon-btn admin-icon-btn-danger shrink-0"
          title="Видалити"
          aria-label="Видалити"
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
}
