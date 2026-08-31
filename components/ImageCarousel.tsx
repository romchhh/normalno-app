"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageCarouselProps {
  photos: string[];
  title: string;
  showThumbnails?: boolean;
}

export default function ImageCarousel({ 
  photos, 
  title, 
  showThumbnails = true 
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const goToImage = (idx: number) => setIndex(idx);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="w-full">
      {/* Main Image - Scrollable Container */}
      <div 
        className="relative w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-4 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {photos.map((photo, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-full h-full">
      <Image
                src={photo.trim() || "/placeholder.png"}
                alt={`${title} photo ${idx + 1}`}
        fill
                className="object-cover"
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          ))}
        </div>
        
        {/* Scroll indicator for mobile */}
        {photos.length > 1 && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10 md:hidden">
            {index + 1} / {photos.length}
          </div>
        )}
        
        {/* Pagination Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToImage(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows (Desktop) */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
              className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
          </button>
          <button
            onClick={next}
              className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-10"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
          </button>
        </>
        )}
      </div>

      {/* Thumbnail Gallery - Scrollable */}
      {showThumbnails && photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory scroll-smooth">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                idx === index
                  ? "border-gray-900 scale-105"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={photo.trim() || "/placeholder.png"}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
