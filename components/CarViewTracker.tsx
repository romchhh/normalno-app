"use client";

import { useEffect } from "react";
import type { CarCardData } from "./CarCard";

interface CarViewTrackerProps {
  car: CarCardData;
}

export default function CarViewTracker({ car }: CarViewTrackerProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !car) return;

    const stored = localStorage.getItem("recentViewedCars");
    let recentCars: CarCardData[] = stored ? JSON.parse(stored) : [];

    recentCars = recentCars.filter((c) => Number(c.id) !== Number(car.id));
    recentCars.unshift({
      id: car.id,
      photo: car.photo || "",
      title: car.title,
      priceUSD: car.priceUSD || "0",
      year: car.year ?? null,
      mileage: car.mileage ?? null,
      monthlyPayment: car.monthlyPayment ?? null,
      brand: car.brand ?? null,
      mark: car.mark ?? null,
    });
    recentCars = recentCars.slice(0, 10);

    localStorage.setItem("recentViewedCars", JSON.stringify(recentCars));
  }, [car]);

  return null;
}
