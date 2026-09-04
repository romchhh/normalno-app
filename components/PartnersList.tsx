import Image from "next/image";
import Link from "next/link";
import { partnerCatalogPath, type PublicPartner } from "@/lib/partners";

type PartnersListProps = {
  partners: PublicPartner[];
  /** Compact strip for footer */
  variant?: "section" | "footer";
  showHeading?: boolean;
  showAllLink?: boolean;
  className?: string;
};

export default function PartnersList({
  partners,
  variant = "section",
  showHeading = true,
  showAllLink = true,
  className = "",
}: PartnersListProps) {
  if (partners.length === 0) return null;

  if (variant === "footer") {
    return (
      <div className={className}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
          Наші партнери
        </p>
        <div className="flex flex-wrap gap-3">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={partnerCatalogPath(partner.slug)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground hover:border-brand/40 hover:text-brand transition-colors"
              title={partner.name}
            >
              {partner.photo ? (
                <span className="relative w-6 h-6 rounded-full overflow-hidden bg-surface shrink-0">
                  <Image
                    src={partner.photo}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </span>
              ) : null}
              <span className="font-medium">{partner.name || "Партнер"}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={className || undefined}>
      {showHeading && (
        <div className="mb-6">
          <h2 className="section-title">Наші партнери</h2>
          <p className="section-subtitle">Авто від перевірених партнерів у каталозі</p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {partners.map((partner) => (
          <Link
            key={partner.id}
            href={partnerCatalogPath(partner.slug)}
            className="card p-4 flex flex-col items-center text-center gap-3 hover:border-brand/30 transition-colors"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-border bg-surface shrink-0">
              {partner.photo ? (
                <Image
                  src={partner.photo}
                  alt={partner.name || "Партнер"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand font-bold text-xl">
                  {(partner.name || "P").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 w-full">
              <p className="font-semibold text-sm sm:text-base truncate">
                {partner.name || "Партнер"}
              </p>
              {partner.description ? (
                <p className="text-xs text-muted mt-1 line-clamp-2">{partner.description}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
      {showAllLink && (
        <div className="mt-5 text-center">
          <Link
            href="/partners"
            className="text-sm text-muted hover:text-brand transition-colors"
          >
            Усі партнери →
          </Link>
        </div>
      )}
    </section>
  );
}
