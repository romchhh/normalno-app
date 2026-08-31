"use client";

import { useState } from "react";
import { getBrandIconCandidates } from "@/lib/brand-icons";

interface BrandIconProps {
  brand: string;
  size?: number;
  className?: string;
}

export default function BrandIcon({
  brand,
  size = 20,
  className = "",
}: BrandIconProps) {
  const candidates = getBrandIconCandidates(brand);
  const [index, setIndex] = useState(0);

  if (index >= candidates.length) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[index]}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}
