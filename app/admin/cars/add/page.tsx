"use client";

import { useRouter } from "next/navigation";
import CarForm from "@/components/admin/CarForm";
import { formValuesToPayload, type CarFormValues } from "@/lib/car-form";

export default function AddCarPage() {
  const router = useRouter();

  const handleSubmit = async (values: CarFormValues) => {
    const payload = formValuesToPayload(values);
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Не вдалося додати авто");
    }
    router.push("/admin/cars");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Додати авто</h2>
        <p className="text-sm text-muted mt-1">Заповніть основні параметри для каталогу</p>
      </div>
      <CarForm submitLabel="Додати авто" onSubmit={handleSubmit} />
    </div>
  );
}
