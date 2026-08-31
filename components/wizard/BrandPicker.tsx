"use client";

import Image from "next/image";
import { WIZARD_BRANDS, type BrandOption } from "@/lib/brands";

interface BrandPickerProps {
  selected: string[];
  onToggle: (id: string) => void;
  brands?: BrandOption[];
}

export default function BrandPicker({
  selected,
  onToggle,
  brands = WIZARD_BRANDS,
}: BrandPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
      {brands.map((brand) => {
        const isSelected = selected.includes(brand.id);
        return (
          <button
            key={brand.id}
            type="button"
            onClick={() => onToggle(brand.id)}
            className={`wizard-brand-card ${isSelected ? "wizard-brand-card-selected" : ""}`}
            aria-pressed={isSelected}
            aria-label={brand.label}
          >
            <span className="wizard-brand-icon-wrap">
              <Image
                src={brand.icon}
                alt=""
                width={36}
                height={36}
                className="wizard-brand-icon"
              />
            </span>
            <span className="wizard-brand-label">{brand.label}</span>
          </button>
        );
      })}
    </div>
  );
}
