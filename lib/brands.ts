export interface BrandOption {
  id: string;
  label: string;
  icon: string;
  /** Підрядки для пошуку в полі car.brand */
  matchTerms: string[];
}

export const WIZARD_BRANDS: BrandOption[] = [
  { id: "toyota", label: "Toyota", icon: "/brands/toyota.svg", matchTerms: ["toyota"] },
  { id: "lexus", label: "Lexus", icon: "/brands/lexus.svg", matchTerms: ["lexus"] },
  { id: "bmw", label: "BMW", icon: "/brands/bmw.svg", matchTerms: ["bmw"] },
  {
    id: "mercedes-benz",
    label: "Mercedes",
    icon: "/brands/mercedes-benz.svg",
    matchTerms: ["mercedes", "mercedes-benz", "mb"],
  },
  {
    id: "volkswagen",
    label: "Volkswagen",
    icon: "/brands/volkswagen.svg",
    matchTerms: ["volkswagen", "vw"],
  },
  { id: "tesla", label: "Tesla", icon: "/brands/tesla.svg", matchTerms: ["tesla"] },
  { id: "audi", label: "Audi", icon: "/brands/audi.svg", matchTerms: ["audi"] },
  { id: "porsche", label: "Porsche", icon: "/brands/porsche.svg", matchTerms: ["porsche"] },
  { id: "hyundai", label: "Hyundai", icon: "/brands/hyundai.svg", matchTerms: ["hyundai"] },
  { id: "kia", label: "Kia", icon: "/brands/kia.svg", matchTerms: ["kia"] },
  { id: "volvo", label: "Volvo", icon: "/brands/volvo.svg", matchTerms: ["volvo"] },
  { id: "mazda", label: "Mazda", icon: "/brands/mazda.svg", matchTerms: ["mazda"] },
  { id: "nissan", label: "Nissan", icon: "/brands/nissan.svg", matchTerms: ["nissan"] },
  { id: "skoda", label: "Škoda", icon: "/brands/skoda.svg", matchTerms: ["skoda", "škoda"] },
  { id: "byd", label: "BYD", icon: "/brands/byd.svg", matchTerms: ["byd"] },
  {
    id: "land-rover",
    label: "Land Rover",
    icon: "/brands/land-rover.svg",
    matchTerms: ["land rover", "land-rover"],
  },
];

const brandById = new Map(WIZARD_BRANDS.map((b) => [b.id, b]));

export function resolveBrandLabels(ids: string[]): string[] {
  return ids.map((id) => {
    const brand = brandById.get(id);
    if (brand) return brand.label;
    const byLabel = WIZARD_BRANDS.find((b) => b.label.toLowerCase() === id.toLowerCase());
    return byLabel?.label ?? id;
  });
}

export function carMatchesBrandIds(carBrand: string, selectedIds: string[]): boolean {
  const normalized = carBrand.toLowerCase();
  return selectedIds.some((id) => {
    const brand = brandById.get(id);
    if (!brand) {
      return normalized.includes(id.toLowerCase());
    }
    return brand.matchTerms.some((term) => normalized.includes(term));
  });
}
