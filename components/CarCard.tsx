"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { formatPrice } from "@/lib/price-format";
import { formatUahMoney } from "@/lib/car-form";
import { resolveCarPhotoUrl } from "@/lib/car-photo";
import FavoriteToggle from "./FavoriteToggle";

export type CarCardData = {
  id: number | string;
  photo: string | null;
  title: string;
  priceUSD: string | number;
  year?: number | null;
  mileage?: number | null;
  monthlyPayment?: number | null;
  brand?: string | null;
  mark?: string | null;
};

interface CarCardProps {
  car: CarCardData;
  badge?: string;
  /** Показати серце (за замовчуванням true) */
  showFavorite?: boolean;
  /** Клік замість переходу на сторінку (wizard / вибір) */
  onSelect?: () => void;
  /** Додаткові дії під карткою (адмінка) */
  footer?: ReactNode;
  className?: string;
  selected?: boolean;
}

function CarCardBody({
  car,
  badge,
  showFavorite,
  showDetailsButton = true,
}: {
  car: CarCardData;
  badge?: string;
  showFavorite: boolean;
  showDetailsButton?: boolean;
}) {
  const priceStr = String(car.priceUSD ?? "0");
  const hasPrice = priceStr && priceStr !== "0" && priceStr !== "0.00";
  const monthly = formatUahMoney(car.monthlyPayment);
  const meta = [
    car.year || null,
    car.mileage ? `${Number(car.mileage).toLocaleString("uk-UA")} км` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const photoSrc = car.photo?.split(/\s+/)[0]
    ? resolveCarPhotoUrl(car.photo.split(/\s+/)[0]!)
    : "/logo.svg";

  return (
    <>
      <div className="relative w-full aspect-[4/3] bg-surface overflow-hidden">
        <Image
          src={photoSrc}
          alt={String(car.title)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
        />

        {badge && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-brand text-white text-[10px] font-semibold rounded-md">
            {badge}
          </span>
        )}

        {showFavorite && (
          <div
            className="absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteToggle carId={Number(car.id)} />
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 min-h-[2.5rem] leading-snug">
          {car.title}
        </h3>
        {meta ? (
          <p className="text-xs text-muted mb-2">{meta}</p>
        ) : (
          <p className="text-xs text-muted mb-2 opacity-0">—</p>
        )}
        <p
          className={`text-base font-bold mt-auto ${
            hasPrice ? "text-foreground" : "text-muted"
          }`}
        >
          {formatPrice(priceStr)}
        </p>
        {monthly ? (
          <p className="text-sm text-brand font-semibold mt-0.5">від {monthly}/міс</p>
        ) : (
          <p className="text-sm mt-0.5 opacity-0">—</p>
        )}
        {showDetailsButton && (
          <span className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-foreground transition-colors group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white">
            Переглянути деталі
          </span>
        )}
      </div>
    </>
  );
}

export default function CarCard({
  car,
  badge,
  showFavorite = true,
  onSelect,
  footer,
  className = "",
  selected = false,
}: CarCardProps) {
  const shellClass = `card group flex flex-col h-full ${
    selected ? "border-brand ring-2 ring-brand/20" : ""
  } ${className}`;

  const body = (
    <CarCardBody
      car={car}
      badge={badge}
      showFavorite={showFavorite && !onSelect && !footer}
      showDetailsButton={!onSelect}
    />
  );

  if (onSelect) {
    return (
      <div className={shellClass}>
        <button type="button" onClick={onSelect} className="text-left w-full flex flex-col flex-1">
          <CarCardBody car={car} badge={badge} showFavorite={false} showDetailsButton={false} />
        </button>
        {footer}
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <Link href={`/car/${car.id}`} className="flex flex-col flex-1 min-h-0">
        {body}
      </Link>
      {footer}
    </div>
  );
}
