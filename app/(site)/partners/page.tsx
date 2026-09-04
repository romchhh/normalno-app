import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { getActivePartners } from "@/lib/partners-db";
import PartnersList from "@/components/PartnersList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Наші партнери",
  description: `Партнери ${BRAND_NAME} — каталоги авто від перевірених постачальників`,
};

export default async function PartnersPage() {
  const partners = await getActivePartners();

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Наші партнери
        </h1>
        <p className="text-muted mb-8 max-w-2xl">
          Авто в каталозі надходять від перевірених партнерів. Оберіть партнера, щоб
          переглянути лише його авто.
        </p>

        {partners.length === 0 ? (
          <div className="text-center py-16 text-muted">Поки немає активних партнерів</div>
        ) : (
          <PartnersList partners={partners} showHeading={false} showAllLink={false} />
        )}
      </div>
    </div>
  );
}
