"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin-rbac";

type AdminRow = {
  username: string;
  role: AdminRole;
  name: string;
  active: boolean;
};

const ROLES: AdminRole[] = ["super_admin", "content_manager", "sales"];

export default function AdminsPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    role: "content_manager" as AdminRole,
  });

  const load = useCallback(async () => {
    const [auth, res] = await Promise.all([
      fetch("/api/admin/auth").then((r) => r.json()),
      fetch("/api/admin/admins"),
    ]);
    if (!auth.authenticated) {
      router.push("/admin/login");
      return;
    }
    if (auth.user?.role !== "super_admin") {
      router.push("/admin");
      return;
    }
    if (!res.ok) {
      setError("Не вдалося завантажити адмінів");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Помилка створення");
      return;
    }
    setForm({ username: "", name: "", password: "", role: "content_manager" });
    await load();
  };

  const handleDelete = async (username: string) => {
    if (!confirm(`Видалити адміна ${username}?`)) return;
    setError("");
    const res = await fetch("/api/admin/admins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Помилка видалення");
      return;
    }
    await load();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Адміни</h2>
        <p className="text-sm text-muted mt-1">Управління доступами до панелі</p>
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      <form onSubmit={handleCreate} className="admin-card space-y-3">
        <p className="font-semibold">Новий адмін</p>
        <input
          className="admin-input"
          placeholder="Логін"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="admin-input"
          placeholder="Імʼя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="admin-input"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="admin-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as AdminRole })}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary w-full">
          {saving ? "Збереження..." : "Створити"}
        </button>
      </form>

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.username} className="admin-card flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-bold truncate">{u.name || u.username}</p>
              <p className="text-sm text-muted truncate">@{u.username}</p>
              <span className="admin-badge admin-badge-progress mt-2 inline-flex">
                {ROLE_LABELS[u.role] || u.role}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(u.username)}
              className="admin-btn admin-btn-secondary text-sm text-red-600"
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
