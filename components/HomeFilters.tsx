"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { convertUSDToUAH, convertUAHToUSD, formatUAH } from "@/lib/currency-converter";
import SheetModal from "./SheetModal";
import BrandIcon from "./BrandIcon";

interface BrandModel {
  value: string;
  title: string;
  models: Array<{
    value: string;
    title: string;
  }>;
}

interface HomeFiltersProps {
  onClose: () => void;
  brands: string[];
  modelsByBrand: Record<string, string[]>;
}

export default function HomeFilters({
  onClose,
  brands,
  modelsByBrand,
}: HomeFiltersProps) {
  const router = useRouter();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(100000);
  const [currency, setCurrency] = useState<"USD" | "UAH">("USD");
  const [brandsData, setBrandsData] = useState<BrandModel[]>([]);
  const [searchBrand, setSearchBrand] = useState<string>("");
  const [searchModel, setSearchModel] = useState<string>("");

  // Load models.json
  useEffect(() => {
    fetch("/models.json")
      .then((res) => res.json())
      .then((data: BrandModel[]) => {
        setBrandsData(data);
      })
      .catch((err) => {
        console.error("Error loading models.json:", err);
      });
  }, []);

  // Get available models from selected brands using models.json
  const getAvailableModels = () => {
    if (brandsData.length === 0) return [];
    
    const models: Array<{ value: string; title: string; brand: string }> = [];
    
    selectedBrands.forEach((selectedBrand) => {
      // Try to find brand in models.json (case-insensitive, handle variations)
      const brandData = brandsData.find((b) => {
        const brandValue = b.value.toUpperCase();
        const brandTitle = b.title.toUpperCase();
        const selected = selectedBrand.toUpperCase();
        
        // Exact match
        if (brandValue === selected || brandTitle === selected) return true;
        
        // Handle common variations
        if (selected === "MERCEDES" && (brandValue.includes("MERCEDES") || brandTitle.includes("MERCEDES"))) return true;
        if (selected === "MINI" && (brandValue.includes("MINI") || brandTitle.includes("MINI"))) return true;
        
        // Partial match for compound names
        if (brandTitle.includes(selected) || selected.includes(brandTitle)) return true;
        
        return false;
      });
      
      if (brandData) {
        brandData.models.forEach((model) => {
          models.push({
            value: model.value,
            title: model.title,
            brand: brandData.title,
          });
        });
      } else {
        // Fallback to modelsByBrand from database
        const dbModels = modelsByBrand[selectedBrand] || [];
        dbModels.forEach((model) => {
          models.push({
            value: model,
            title: model,
            brand: selectedBrand,
          });
        });
      }
    });
    
    // Remove duplicates
    const uniqueModels = models.filter((model, index, self) =>
      index === self.findIndex((m) => m.value === model.value && m.brand === model.brand)
    );
    
    return uniqueModels;
  };

  const availableModels = getAvailableModels();

  // Get all brands from models.json or use provided brands
  // Merge brands from models.json with brands from database
  const allBrands = (() => {
    const jsonBrands = brandsData.map((b) => b.title);
    const dbBrands = brands;
    const merged = Array.from(new Set([...jsonBrands, ...dbBrands]));
    return merged.sort();
  })();

  // Filter brands by search
  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  // Filter models by search
  const filteredModels = availableModels.filter((model) =>
    model.title.toLowerCase().includes(searchModel.toLowerCase())
  );

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
    // Clear models when brand is deselected
    if (selectedBrands.includes(brand)) {
      const brandData = brandsData.find(
        (b) => b.title === brand || b.value.toUpperCase() === brand.toUpperCase()
      );
      const modelsToRemove = brandData
        ? brandData.models.map((m) => m.value)
        : modelsByBrand[brand] || [];
      
      setSelectedModels((prev) =>
        prev.filter((m) => !modelsToRemove.includes(m))
      );
    }
  };

  const toggleModel = (modelValue: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelValue)
        ? prev.filter((m) => m !== modelValue)
        : [...prev, modelValue]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    const currentPath = window.location.pathname;

    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedModels.length > 0) {
      params.set("models", selectedModels.join(","));
    }
    if (yearFrom) {
      params.set("yearFrom", yearFrom);
    }
    if (yearTo) {
      params.set("yearTo", yearTo);
    }
    // Convert to USD for filtering (database stores prices in USD)
    const priceFromUSD = currency === "UAH" ? convertUAHToUSD(priceFrom) : priceFrom;
    const priceToUSD = currency === "UAH" ? convertUAHToUSD(priceTo) : priceTo;
    
    if (priceFromUSD > 0) {
      params.set("priceFrom", priceFromUSD.toString());
    }
    if (priceToUSD < (currency === "UAH" ? 3750000 : 100000)) {
      params.set("priceTo", priceToUSD.toString());
    }

    router.push(`${currentPath}?${params.toString()}`);
    onClose();
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setYearFrom("");
    setYearTo("");
    setPriceFrom(0);
    setPriceTo(currency === "UAH" ? 3750000 : 100000);
    setCurrency("USD");
    setSearchBrand("");
    setSearchModel("");
  };

  const selectedCount = selectedBrands.length + selectedModels.length + (yearFrom ? 1 : 0) + (yearTo ? 1 : 0) + (priceFrom > 0 ? 1 : 0) + (priceTo < (currency === "UAH" ? 3750000 : 100000) ? 1 : 0);

  return (
    <SheetModal
      onClose={onClose}
      zClassName="z-[60]"
      className="max-w-3xl overflow-hidden flex flex-col"
    >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 sm:py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Фільтри</h2>
            {selectedCount > 0 && (
              <p className="text-xs text-gray-500 mt-0.5">
                Обрано {selectedCount} {selectedCount === 1 ? 'фільтр' : selectedCount < 5 ? 'фільтри' : 'фільтрів'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
          {/* Марка */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Марка
            </label>
            
            {/* Search for brands */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Пошук..."
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1 bg-gray-50">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors ${
                        isSelected
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <BrandIcon
                        brand={brand}
                        size={20}
                        className={isSelected ? "brightness-0 invert" : ""}
                      />
                      <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>
                        {brand}
                      </span>
                    </label>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center text-sm py-4">Не знайдено</p>
              )}
            </div>
          </div>

          {/* Модель */}
          {selectedBrands.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Модель
              </label>
              
              {/* Search for models */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Пошук..."
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1 bg-gray-50">
                {filteredModels.length > 0 ? (
                  filteredModels.map((model) => {
                    const isSelected = selectedModels.includes(model.value);
                    return (
                      <label
                        key={`${model.brand}-${model.value}`}
                        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors ${
                          isSelected
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleModel(model.value)}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>
                            {model.title}
                          </span>
                          <span className={`text-xs ml-1.5 ${isSelected ? "text-gray-300" : "text-gray-400"}`}>
                            ({model.brand})
                          </span>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-center text-sm py-4">
                    {availableModels.length === 0 ? "Оберіть марку" : "Не знайдено"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Рік */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Рік випуску
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="Від"
                  min="1900"
                  max="2030"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="До"
                  min="1900"
                  max="2030"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Ціна */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-900">
                Ціна
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currency === "UAH") {
                      setPriceFrom(convertUAHToUSD(priceFrom));
                      setPriceTo(convertUAHToUSD(priceTo));
                    }
                    setCurrency("USD");
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    currency === "USD"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => {
                    if (currency === "USD") {
                      setPriceFrom(convertUSDToUAH(priceFrom));
                      setPriceTo(convertUSDToUAH(priceTo));
                    }
                    setCurrency("UAH");
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    currency === "UAH"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  UAH
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={priceFrom}
                    onChange={(e) =>
                      setPriceFrom(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    placeholder="Від"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={priceTo}
                    onChange={(e) =>
                      setPriceTo(
                        Math.min(currency === "USD" ? 1000000 : 37500000, parseInt(e.target.value) || (currency === "USD" ? 100000 : 3750000))
                      )
                    }
                    placeholder="До"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max={currency === "USD" ? 100000 : 3750000}
                  step={currency === "USD" ? 1000 : 37500}
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {currency === "USD"
                      ? `${priceFrom.toLocaleString()} $`
                      : formatUAH(priceFrom)}
                  </span>
                  <span>
                    {currency === "USD"
                      ? `${priceTo.toLocaleString()} $`
                      : formatUAH(priceTo)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={currency === "USD" ? 100000 : 3750000}
                  step={currency === "USD" ? 1000 : 37500}
                  value={priceTo}
                  onChange={(e) => setPriceTo(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900 mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={resetFilters}
            className="flex-1 px-4 py-2.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Скинути
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Застосувати
          </button>
        </div>
    </SheetModal>
  );
}
