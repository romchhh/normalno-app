import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import CarCard from "@/components/CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";
import { isCarPubliclyListed } from "@/lib/car-status";
import { BRAND_NAME } from "@/lib/brand";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await prisma.partner.findUnique({ where: { slug } });
  const title = partner?.name
    ? `${partner.name} — каталог | ${BRAND_NAME}`
    : `Партнер | ${BRAND_NAME}`;
  return {
    title,
    description: partner?.description || `Авто партнера ${partner?.name || ""}`.trim(),
  };
}

export default async function PartnerCatalogPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = await prisma.partner.findUnique({
    where: { slug },
    include: {
      cars: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!partner || !partner.active) notFound();

  const cars = partner.cars.filter((c) => isCarPubliclyListed(c.status));

  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="border-b border-border bg-surface/40">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          {partner.photo && (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-border bg-white shrink-0">
              <Image
                src={partner.photo}
                alt={partner.name || "Партнер"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">
              Партнер {BRAND_NAME}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {partner.name || "Каталог партнера"}
            </h1>
            {partner.description ? (
              <p className="text-muted mt-2 max-w-2xl text-sm sm:text-base whitespace-pre-line">
                {partner.description}
              </p>
            ) : null}
            <p className="text-sm text-muted mt-3">{cars.length} авто в каталозі</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {cars.length === 0 ? (
          <div className="text-center py-16 text-muted">
            Зараз немає доступних авто цього партнера
          </div>
        ) : (
          <div className={CAR_CARD_GRID}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
