import { prisma } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0;

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const q = params.q?.trim() || "";
  const skip = (page - 1) * PAGE_SIZE;

  const where = q
    ? {
        OR: [
          { firstName: { contains: q } },
          { lastName: { contains: q } },
          { username: { contains: q } },
          { telegramId: { contains: q } },
          { phone: { contains: q } },
        ],
      }
    : {};

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        wizardSession: { select: { id: true, currentStep: true, maxBudget: true } },
        _count: { select: { catalogVisits: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE) || 1;

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Користувачі бота</h2>
          <p className="text-sm text-muted mt-1">
            Хто натиснув Start у Telegram · всього {totalUsers}
          </p>
        </div>
        <Link href="/admin/broadcast" className="admin-btn admin-btn-primary">
          Розсилка
        </Link>
      </div>

      <form className="admin-card flex flex-col sm:flex-row gap-2">
        <input
          name="q"
          defaultValue={q}
          className="admin-input flex-1"
          placeholder="Пошук: імʼя, @username, телефон, Telegram ID"
        />
        <button type="submit" className="admin-btn admin-btn-primary">
          Знайти
        </button>
      </form>

      {users.length === 0 ? (
        <div className="admin-card admin-empty">
          {q ? "Нікого не знайдено" : "Поки немає користувачів. Вони зʼявляться після /start у боті."}
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="admin-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-base truncate">
                    {user.firstName}
                    {user.lastName ? ` ${user.lastName}` : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {user.username ? `@${user.username}` : "без username"} · ID {user.telegramId}
                  </p>
                  {user.phone && (
                    <a href={`tel:${user.phone}`} className="text-sm text-brand font-medium block mt-1">
                      {user.phone}
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="admin-badge admin-badge-new">
                      Візитів: {user._count.catalogVisits}
                    </span>
                    {user.wizardSession ? (
                      <span className="admin-badge admin-badge-progress">
                        Wizard: {user.wizardSession.currentStep}
                      </span>
                    ) : (
                      <span className="admin-badge admin-badge-spam">Без wizard</span>
                    )}
                    <span className="admin-badge admin-badge-spam">
                      {user.languageCode?.toUpperCase() || "—"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted flex-shrink-0">
                  {user.createdAt.toLocaleDateString("uk-UA")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          {page > 1 ? (
            <Link
              href={`/admin/users?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className="admin-btn admin-btn-secondary"
            >
              ← Назад
            </Link>
          ) : (
            <span className="admin-btn admin-btn-secondary opacity-40">← Назад</span>
          )}
          <span className="text-sm text-muted">
            {page} / {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/admin/users?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className="admin-btn admin-btn-secondary"
            >
              Далі →
            </Link>
          ) : (
            <span className="admin-btn admin-btn-secondary opacity-40">Далі →</span>
          )}
        </div>
      )}
    </div>
  );
}
