"use client";

import { formatUahMoney } from "@/lib/car-form";

type CarSpecs = {
  brand?: string | null;
  mark?: string | null;
  year?: number | null;
  engineType?: string | null;
  transmission?: string | null;
  mileage?: number | null;
  monthlyPayment?: number | null;
  advancePayment?: number | null;
  category?: string | null;
};

export default function DropdownCar({ car }: { car: CarSpecs }) {
  const characteristics = [
    { label: "Марка", value: car.brand },
    { label: "Модель", value: car.mark },
    { label: "Рік", value: car.year || null },
    { label: "Двигун", value: car.engineType },
    { label: "Коробка передач", value: car.transmission },
    {
      label: "Пробіг",
      value: car.mileage ? `${car.mileage.toLocaleString("uk-UA")} км` : null,
    },
    {
      label: "Щомісячний платіж",
      value: formatUahMoney(car.monthlyPayment),
    },
    {
      label: "Авансовий внесок",
      value: formatUahMoney(car.advancePayment),
    },
    { label: "Категорія", value: car.category },
  ].filter((field) => field.value);

  if (characteristics.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 bg-surface border-b border-border">
        <h3 className="text-lg font-bold">Характеристики</h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {characteristics.map((field) => (
            <div
              key={field.label}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-border/70 last:border-0"
            >
              <span className="text-sm font-medium text-muted">{field.label}</span>
              <span className="text-base font-semibold text-foreground">{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
