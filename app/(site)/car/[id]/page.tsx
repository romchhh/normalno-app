import { SOCIAL_LINKS } from "@/lib/brand";
import { prisma } from "@/lib/db";
import { formatUahMoney } from "@/lib/car-form";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import DropdownCar from "@/components/DropdownCar";
import Order from "@/components/Order";
import { formatPrice } from "@/lib/price-format";
import FavoriteButton from "@/components/FavoriteButton";
import CarCard from "@/components/CarCard";
import { CAR_CARD_GRID } from "@/lib/car-card";
import CarViewTracker from "@/components/CarViewTracker";
import ShareButton from "@/components/ShareButton";
import ScrollToTop from "@/components/ScrollToTop";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id: parseInt(id) },
  });

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Авто не знайдено</p>
          <Link href="/" className="text-muted hover:text-brand underline">
            На головну
          </Link>
        </div>
      </div>
    );
  }

  const photos = car.photo?.split(" ").filter(Boolean) || [];
  const monthly = formatUahMoney(car.monthlyPayment);
  const advance = formatUahMoney(car.advancePayment);
  const videoEmbed = car.video ? youtubeEmbed(car.video) : null;
  const description = car.description || car.text;

  const randomCars = await prisma.car.findMany({
    take: 4,
    where: { id: { not: car.id } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      priceUSD: true,
      photo: true,
      year: true,
      mileage: true,
      monthlyPayment: true,
    },
  });

  return (
    <div className="min-h-screen bg-white pb-40 md:pb-28">
      <CarViewTracker
        car={{
          id: car.id,
          photo: car.photo,
          title: car.title,
          priceUSD: car.priceUSD,
          year: car.year,
          mileage: car.mileage,
          monthlyPayment: car.monthlyPayment,
          brand: car.brand,
          mark: car.mark,
        }}
      />
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {photos.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <FavoriteButton carId={car.id} />
              <ShareButton carId={car.id} title={car.title} />
            </div>
            <ImageCarousel photos={photos} title={car.title} />
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {car.title}
        </h1>
        <p className="text-sm text-muted mb-6">
          {[car.brand, car.mark, car.year].filter(Boolean).join(" · ")}
          {car.mileage ? ` · ${car.mileage.toLocaleString("uk-UA")} км` : ""}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="space-y-2">
            <div>
              <p
                className={`text-2xl md:text-3xl font-bold ${
                  !car.priceUSD || car.priceUSD === "0" || car.priceUSD === "0.00"
                    ? "text-muted"
                    : "text-foreground"
                }`}
              >
                {formatPrice(car.priceUSD)}
              </p>
              <p className="text-sm text-muted">Повна ціна</p>
            </div>
            {(monthly || advance) && (
              <div className="flex flex-wrap gap-3 pt-1">
                {monthly && (
                  <div className="px-3 py-2 rounded-xl bg-brand-light border border-brand/20">
                    <p className="text-xs text-muted">Щомісячний платіж</p>
                    <p className="font-bold text-brand">{monthly}</p>
                  </div>
                )}
                {advance && (
                  <div className="px-3 py-2 rounded-xl bg-surface border border-border">
                    <p className="text-xs text-muted">Аванс</p>
                    <p className="font-bold">{advance}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-stretch sm:items-end gap-3 w-full sm:w-auto">
            <Order
              stickyOnScroll
              carInfo={{
                id: car.id,
                title: car.title,
                brand: car.brand,
                mark: car.mark,
                year: car.year,
                priceUSD: car.priceUSD,
              }}
            />
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-foreground font-medium rounded-xl hover:bg-surface border border-border transition-colors"
            >
              Написати менеджеру
            </a>
          </div>
        </div>

        <div className="mb-10">
          <DropdownCar car={car} />
        </div>

        {description && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">Опис</h2>
            <div className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {description.replace(/<[^>]+>/g, "")}
            </div>
          </div>
        )}

        {car.video && (
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3">Відео</h2>
            {videoEmbed ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-black">
                <iframe
                  src={videoEmbed}
                  title={`Відео ${car.title}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={car.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-semibold underline"
              >
                Відкрити відео
              </a>
            )}
          </div>
        )}

        {randomCars.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Переглянути інші авто</h2>
            <div className={CAR_CARD_GRID}>
              {randomCars.map((randomCar) => (
                <CarCard key={randomCar.id} car={randomCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
