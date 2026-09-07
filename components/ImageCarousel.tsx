"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs, FreeMode, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { resolveCarPhotoUrl } from "@/lib/car-photo";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface ImageCarouselProps {
  photos: string[];
  title: string;
  showThumbnails?: boolean;
}

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

export default function ImageCarousel({
  photos,
  title,
  showThumbnails = true,
}: ImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const resolvedPhotos = photos.map((photo) =>
    photo.trim() ? resolveCarPhotoUrl(photo) : "/logo.svg"
  );
  const multi = resolvedPhotos.length > 1;

  return (
    <div className="w-full car-gallery">
      <div className="relative w-full aspect-[4/3] bg-surface rounded-2xl overflow-hidden mb-4">
        {multi && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 md:hidden pointer-events-none">
            <span className="bg-black/55 text-white text-xs font-medium px-3 py-1 rounded-full tabular-nums">
              {activeIndex + 1} / {resolvedPhotos.length}
            </span>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Keyboard, Thumbs, A11y]}
          slidesPerView={1}
          spaceBetween={0}
          speed={320}
          loop={resolvedPhotos.length > 2}
          grabCursor
          resistanceRatio={0.65}
          keyboard={{ enabled: true }}
          pagination={
            multi
              ? {
                  clickable: true,
                  dynamicBullets: resolvedPhotos.length > 8,
                }
              : false
          }
          navigation={multi}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {resolvedPhotos.map((photo, idx) => (
            <SwiperSlide key={`${photo}-${idx}`}>
              <div className="relative w-full h-full select-none">
                <Image
                  src={photo}
                  alt={`${title} — фото ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1120px"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  draggable={false}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showThumbnails && multi && (
        <Swiper
          modules={[FreeMode, Thumbs, A11y]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode
          watchSlidesProgress
          className="car-gallery-thumbs"
        >
          {resolvedPhotos.map((photo, idx) => (
            <SwiperSlide
              key={`thumb-${photo}-${idx}`}
              className="!w-20 !h-20 cursor-pointer"
            >
              <div
                className={`relative w-full h-full rounded-lg overflow-hidden border-2 transition-colors ${
                  idx === activeIndex
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="object-cover pointer-events-none"
                  sizes="80px"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
