"use client";

import FavoriteToggle from "./FavoriteToggle";

interface FavoriteButtonProps {
  carId: number;
  className?: string;
}

export default function FavoriteButton({ carId, className = "" }: FavoriteButtonProps) {
  return <FavoriteToggle carId={carId} size="md" className={className} />;
}
