"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { partnerCatalogAbsoluteUrl } from "@/lib/partners";

type Partner = {
  id: number;
  slug: string;
  name: string;
  photo: string | null;
  description: string;
  active: boolean;
  _count?: { cars: number };
};

const emptyForm = {
  name: "",
  photo: "",
  description: "",
  active: true,
};

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners?all=1");
      const data = await res.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch {
      setError("Не вдалося завантажити партнерів");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const startEdit = (p: Partner) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      photo: p.photo || "",
      description: p.description || "",
      active: p.active,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const url = editingId ? `/api/partners/${editingId}` : "/api/partners";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка збереження");
      setMessage(editingId ? "Оновлено" : "Додано");
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Видалити партнера «${name || id}»? Авто залишаться без партнера.`)) {
      return;
    }
    const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Не вдалося видалити");
      return;
    }
    if (editingId === id) resetForm();
    await load();
  };

  const copyLink = async (p: Partner) => {
    const url = partnerCatalogAbsoluteUrl(p.slug, window.location.origin);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      prompt("Скопіюйте посилання:", url);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Партнери</h2>
        <p className="text-sm text-muted mt-1">
          Фото, назва, опис. Достатньо лише назви. Посилання веде на каталог авто партнера.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-4">
        <h3 className="font-bold">
          {editingId ? `Редагувати #${editingId}` : "Додати партнера"}
        </h3>
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl px-4 py-3 text-sm">
            {message}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-2">Назва</label>
          <input
            className="admin-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Назва партнера"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Фото (URL)</label>
          <input
            className="admin-input"
            value={form.photo}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
            placeholder="https://...jpg"
          />
          {form.photo && (
            <div className="mt-2 relative w-28 h-20 rounded-xl overflow-hidden border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Опис</label>
          <textarea
            className="admin-input min-h-[100px]"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Короткий опис (необовʼязково)"
          />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Активний
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary flex-1">
            {saving ? "Збереження…" : editingId ? "Зберегти" : "Додати"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
              Скасувати
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
        </div>
      ) : partners.length === 0 ? (
        <div className="admin-card admin-empty">Поки немає партнерів</div>
      ) : (
        <div className="space-y-3">
          {partners.map((p) => (
            <div key={p.id} className="admin-card flex gap-3 items-start">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface border border-border shrink-0 relative">
                {p.photo ? (
                  <Image src={p.photo} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                    —
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate">{p.name || "Без назви"}</p>
                <p className="text-xs text-muted">
                  /partner/{p.slug} · {p._count?.cars ?? 0} авто
                  {!p.active ? " · вимкнено" : ""}
                </p>
                {p.description && (
                  <p className="text-sm text-muted mt-1 line-clamp-2">{p.description}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => copyLink(p)}
                    className="admin-btn admin-btn-primary text-sm min-h-9"
                  >
                    {copiedId === p.id ? "Скопійовано ✓" : "Копіювати посилання"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="admin-btn admin-btn-secondary text-sm min-h-9"
                  >
                    Редагувати
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.name)}
                    className="admin-btn admin-btn-secondary text-sm min-h-9 text-red-600"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
