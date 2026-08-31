import { prisma } from "@/lib/db";
import Link from "next/link";
import { WIZARD_BRANDS } from "@/lib/brands";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const FUNNEL_STEPS: { id: string; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "start-option", label: "Старт" },
  { id: "car-info", label: "Авто" },
  { id: "price-valuation", label: "Оцінка" },
  { id: "additional-cash", label: "Додатково" },
  { id: "monthly-payment", label: "Платіж" },
  { id: "term", label: "Строк" },
  { id: "motivation", label: "Мотивація" },
  { id: "car-prefs", label: "Побажання" },
  { id: "loader", label: "Loader" },
  { id: "results", label: "Результати" },
  { id: "strategy", label: "Стратегія" },
];

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default async function WizardAnalyticsPage() {
  const [sessions, allForFunnel, total, avgPayment, successTotal] = await Promise.all([
    prisma.wizardSession.findMany({
      orderBy: { updatedAt: "desc" },
      take: 50,
      include: { user: true },
    }),
    prisma.wizardSession.findMany({
      select: { funnelSteps: true, brandPrefs: true, bitrixStatus: true },
    }),
    prisma.wizardSession.count(),
    prisma.wizardSession.aggregate({ _avg: { monthlyPayment: true } }),
    prisma.wizardSession.count({ where: { bitrixStatus: "success" } }),
  ]);

  const funnelCounts: Record<string, number> = {};
  for (const step of FUNNEL_STEPS) funnelCounts[step.id] = 0;
  let bitrixSuccessFromResults = 0;

  const brandCounts = new Map<string, number>();

  for (const row of allForFunnel) {
    const steps = parseJsonArray(row.funnelSteps);
    const stepSet = new Set(steps);
    // Also count current path via presence of later steps
    for (const step of FUNNEL_STEPS) {
      if (stepSet.has(step.id)) funnelCounts[step.id] += 1;
    }
    if (row.bitrixStatus === "success") {
      bitrixSuccessFromResults += 1;
    }
    for (const brandId of parseJsonArray(row.brandPrefs)) {
      brandCounts.set(brandId, (brandCounts.get(brandId) || 0) + 1);
    }
  }

  const topBrands = [...brandCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id, count]) => ({
      id,
      label: WIZARD_BRANDS.find((b) => b.id === id)?.label || id,
      count,
    }));

  const funnelBase = Math.max(total, 1);

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Wizard аналітика</h2>
          <p className="text-sm text-muted mt-1">Сесії калькулятора підбору</p>
        </div>
        <Link href="/admin/wizard" className="admin-btn admin-btn-secondary text-sm">
          Налаштування
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="admin-stat">
          <p className="admin-stat-label">Сесій</p>
          <p className="admin-stat-value">{total}</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat-label">Bitrix OK</p>
          <p className="admin-stat-value">{successTotal}</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat-label">Сер. платіж</p>
          <p className="admin-stat-value text-xl">
            {Math.round(avgPayment._avg.monthlyPayment || 0).toLocaleString("uk-UA")} ₴
          </p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat-label">Конверсія</p>
          <p className="admin-stat-value">
            {total > 0 ? Math.round((successTotal / total) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="admin-card space-y-3">
        <p className="font-semibold">Воронка по кроках</p>
        <div className="space-y-2">
          {FUNNEL_STEPS.map((step) => {
            const count = funnelCounts[step.id] || 0;
            const pct = Math.round((count / funnelBase) * 100);
            return (
              <div key={step.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{step.label}</span>
                  <span className="text-muted">
                    {count} · {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Bitrix success</span>
              <span className="text-muted">
                {bitrixSuccessFromResults} ·{" "}
                {Math.round((bitrixSuccessFromResults / funnelBase) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-brand rounded-full"
                style={{
                  width: `${Math.round((bitrixSuccessFromResults / funnelBase) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card space-y-3">
        <p className="font-semibold">ТОП марок</p>
        {topBrands.length === 0 ? (
          <p className="text-sm text-muted">Поки немає даних по марках</p>
        ) : (
          <div className="space-y-2">
            {topBrands.map((b, i) => (
              <div key={b.id} className="flex items-center justify-between text-sm">
                <span>
                  {i + 1}. {b.label}
                </span>
                <span className="admin-badge admin-badge-progress">{b.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="admin-card admin-empty">Поки немає wizard-сесій</div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold truncate">
                    {s.user
                      ? `${s.user.firstName}${s.user.lastName ? ` ${s.user.lastName}` : ""}`
                      : s.telegramId}
                  </p>
                  <p className="text-sm text-muted">
                    {s.phone || "без телефону"} · крок: {s.currentStep}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="admin-badge admin-badge-new">
                      {Math.round(s.monthlyPayment).toLocaleString("uk-UA")} ₴/міс
                    </span>
                    {s.maxBudget != null && (
                      <span className="admin-badge admin-badge-progress">
                        бюджет ${Math.round(s.maxBudget)}
                      </span>
                    )}
                    <span
                      className={`admin-badge ${
                        s.bitrixStatus === "success"
                          ? "admin-badge-done"
                          : s.bitrixStatus === "failed"
                            ? "admin-badge-spam"
                            : "admin-badge-spam"
                      }`}
                    >
                      Bitrix: {s.bitrixStatus || "—"}
                    </span>
                  </div>
                  {s.selectedCarLabel && (
                    <p className="text-xs text-muted mt-2 line-clamp-1">{s.selectedCarLabel}</p>
                  )}
                </div>
                <p className="text-xs text-muted flex-shrink-0">
                  {s.updatedAt.toLocaleString("uk-UA")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
