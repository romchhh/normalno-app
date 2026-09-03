import DeleteButton from "@/components/DeleteButton";
import DeactivateCarButton from "@/components/admin/DeactivateCarButton";
import TelegramChannelSyncButton from "@/components/admin/TelegramChannelSyncButton";
import CarCard from "@/components/CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";
import { CAR_STATUSES, statusLabel } from "@/lib/car-status";
import { prisma } from "@/lib/db";
import { findCarIdsByAdminQuery } from "@/lib/prisma-filters";
import Link from "next/link";

export const revalidate = 0;

const PAGE_SIZE = 24;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    status?: string;
    partnerId?: string;
  }>;
}

function statusBadgeClass(status: string | null | undefined): string {
  if (status === "available") return "admin-badge-done";
  if (status === "on_order" || status === "reserved") return "admin-badge-progress";
  if (status === "sold" || status === "inactive") return "admin-badge-spam";
  return "admin-badge-new";
}

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const q = params.q?.trim() || "";
  const category = params.category?.trim() || "";
  const status = params.status?.trim() || "";
  const partnerId = params.partnerId?.trim() || "";
  const skip = (page - 1) * PAGE_SIZE;

  const where: Record<string, unknown> = {};

  if (q) {
    const ids = await findCarIdsByAdminQuery(q);
    if (ids.length === 0) {
      where.id = { in: [-1] };
    } else {
      where.id = { in: ids };
    }
  }
  if (category) where.category = category;
  if (status) where.status = status;
  if (partnerId) where.partnerId = parseInt(partnerId, 10) || undefined;

  const [cars, totalCars, categories, partners] = await Promise.all([
    prisma.car.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: { partner: { select: { id: true, name: true, slug: true } } },
    }),
    prisma.car.count({ where }),
    prisma.car.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
    prisma.partner.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const totalPages = Math.ceil(totalCars / PAGE_SIZE) || 1;
  const from = totalCars === 0 ? 0 : skip + 1;
  const to = Math.min(skip + cars.length, totalCars);
  const hasFilters = Boolean(q || category || status || partnerId);

  const qs = (nextPage: number) => {
    const p = new URLSearchParams();
    p.set("page", String(nextPage));
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (status) p.set("status", status);
    if (partnerId) p.set("partnerId", partnerId);
    return `/admin/cars?${p.toString()}`;
  };

  const categoryOptions = categories
    .map((c) => c.category)
    .filter((value) => Boolean(value?.trim()));

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">База авто</h2>
          <p className="text-sm text-muted mt-1">
            {totalCars === 0
              ? "Нічого не знайдено"
              : `Показано ${from}–${to} з ${totalCars}`}
          </p>
        </div>
        <Link href="/admin/cars/add" className="admin-btn admin-btn-primary">
          + Додати авто
        </Link>
      </div>

      <form method="get" className="admin-card space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            name="q"
            defaultValue={q}
            className="admin-input flex-1"
            placeholder="Пошук: назва, марка, модель, рік, SKU…"
            autoComplete="off"
          />
          <button type="submit" className="admin-btn admin-btn-primary sm:w-auto">
            Знайти
          </button>
          {hasFilters && (
            <Link href="/admin/cars" className="admin-btn admin-btn-secondary text-center">
              Скинути
            </Link>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select name="category" defaultValue={category} className="admin-input sm:w-48">
            <option value="">Усі категорії</option>
            {categoryOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={status} className="admin-input sm:w-48">
            <option value="">Усі статуси</option>
            {CAR_STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <select name="partnerId" defaultValue={partnerId} className="admin-input sm:w-48">
            <option value="">Усі партнери</option>
            {partners.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name || `Партнер #${p.id}`}
              </option>
            ))}
          </select>
          <button type="submit" className="admin-btn admin-btn-secondary">
            Фільтр
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/api/cars/export?format=xlsx" className="admin-btn admin-btn-secondary text-sm">
            Export XLSX
          </Link>
          <Link href="/api/cars/export?format=csv" className="admin-btn admin-btn-secondary text-sm">
            Export CSV
          </Link>
          <Link href="/admin/partners" className="admin-btn admin-btn-secondary text-sm">
            Партнери
          </Link>
          <Link href="/admin/categories" className="admin-btn admin-btn-secondary text-sm">
            Категорії
          </Link>
          <Link href="/admin" className="admin-btn admin-btn-secondary text-sm">
            Excel імпорт
          </Link>
        </div>
      </form>

      <TelegramChannelSyncButton />

      {cars.length === 0 ? (
        <div className="admin-card admin-empty">Авто не знайдено</div>
      ) : (
        <div className={CAR_CARD_GRID}>
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              showFavorite={false}
              footer={
                <div className="space-y-2 p-3 pt-0 border-t border-border mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`admin-badge ${statusBadgeClass(car.status)}`}>
                      {statusLabel(car.status)}
                    </span>
                    {car.telegramPublished && (
                      <span className="admin-badge admin-badge-done">В каналі</span>
                    )}
                    {car.partner && (
                      <span className="admin-badge admin-badge-new">
                        {car.partner.name || "Партнер"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/cars/${car.id}`}
                      className="admin-btn admin-btn-primary flex-1 text-sm min-h-10"
                    >
                      Редагувати
                    </Link>
                    <DeactivateCarButton id={car.id} status={car.status} />
                    <DeleteButton id={car.id} />
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {page > 1 ? (
            <Link href={qs(page - 1)} className="admin-btn admin-btn-secondary">
              ← Назад
            </Link>
          ) : (
            <span className="admin-btn admin-btn-secondary opacity-40">← Назад</span>
          )}
          <span className="text-sm text-muted">
            Сторінка {page} з {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={qs(page + 1)} className="admin-btn admin-btn-secondary">
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
