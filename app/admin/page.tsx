import Link from "next/link";
import { prisma } from "@/lib/db";
import CarExcelUpload from "@/components/CarExcelUpload";
import DeleteAllCarsButton from "@/components/DeleteAllCarsButton";
import BannerUpload from "@/components/admin/BannerUpload";

export const revalidate = 0;

function formatDate(date: Date) {
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDashboard() {
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalCars,
    totalUsers,
    totalLeads,
    newLeads,
    wizardSessions,
    visitsWeek,
    leadsToday,
    recentLeads,
    recentUsers,
  ] = await Promise.all([
    prisma.car.count(),
    prisma.user.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.wizardSession.count(),
    prisma.catalogVisit.count({ where: { visitedAt: { gte: weekAgo } } }),
    prisma.lead.count({ where: { createdAt: { gte: dayAgo } } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Нові заявки", value: newLeads, href: "/admin/leads?status=new", accent: true },
    { label: "Заявок сьогодні", value: leadsToday, href: "/admin/leads" },
    { label: "Авто в базі", value: totalCars, href: "/admin/cars" },
    { label: "Користувачі бота", value: totalUsers, href: "/admin/users" },
    { label: "Wizard сесії", value: wizardSessions, href: "/admin/wizard/analytics" },
    { label: "Візити за 7 днів", value: visitsWeek, href: "/admin/analytics" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight mb-1">Дашборд</h2>
        <p className="text-muted text-sm">Огляд бізнесу · {totalLeads} заявок усього</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="admin-stat">
            <p className="admin-stat-label">{s.label}</p>
            <p className={`admin-stat-value ${s.accent ? "text-brand" : ""}`}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">Останні заявки</h3>
            <Link href="/admin/leads" className="text-sm text-brand font-semibold">
              Усі →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="admin-empty py-8">Поки немає заявок</p>
          ) : (
            <div className="space-y-2">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads?id=${lead.id}`}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl border border-border hover:border-brand/40 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{lead.name}</p>
                    <p className="text-sm text-muted">{lead.phone}</p>
                    {lead.carLabel && (
                      <p className="text-xs text-muted mt-1 truncate">{lead.carLabel}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`admin-badge ${
                        lead.status === "new"
                          ? "admin-badge-new"
                          : lead.status === "done"
                            ? "admin-badge-done"
                            : lead.status === "in_progress"
                              ? "admin-badge-progress"
                              : "admin-badge-spam"
                      }`}
                    >
                      {lead.status === "new"
                        ? "Нова"
                        : lead.status === "done"
                          ? "Готово"
                          : lead.status === "in_progress"
                            ? "В роботі"
                            : lead.status}
                    </span>
                    <p className="text-xs text-muted mt-1">{formatDate(lead.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">Нові в боті</h3>
            <Link href="/admin/users" className="text-sm text-brand font-semibold">
              Усі →
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <p className="admin-empty py-8">Ще немає користувачів Telegram</p>
          ) : (
            <div className="space-y-2">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {user.firstName}
                      {user.lastName ? ` ${user.lastName}` : ""}
                    </p>
                    <p className="text-sm text-muted truncate">
                      {user.username ? `@${user.username}` : user.telegramId}
                    </p>
                  </div>
                  <p className="text-xs text-muted flex-shrink-0">{formatDate(user.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="admin-card">
        <h3 className="font-bold text-base mb-3">Швидкі дії</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Link href="/admin/cars/add" className="admin-btn admin-btn-primary">
            + Додати авто
          </Link>
          <Link href="/admin/leads" className="admin-btn admin-btn-secondary">
            Заявки
          </Link>
          <Link href="/admin/categories" className="admin-btn admin-btn-secondary">
            Категорії
          </Link>
          <Link href="/admin/wizard" className="admin-btn admin-btn-secondary">
            Калькулятор
          </Link>
        </div>
      </section>

      <section className="admin-card space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-base">Рекламний банер</h3>
          <Link href="/admin/banner" className="text-sm text-brand font-semibold">
            Відкрити сторінку →
          </Link>
        </div>
        <BannerUpload />
      </section>

      <section className="admin-card space-y-4">
        <h3 className="font-bold text-base">Імпорт Excel</h3>
        <CarExcelUpload />
      </section>

      <section className="admin-card border-red-200">
        <h3 className="font-bold text-base text-red-700 mb-3">Небезпечна зона</h3>
        <DeleteAllCarsButton />
      </section>
    </div>
  );
}
