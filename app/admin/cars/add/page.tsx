"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CarForm from "@/components/admin/CarForm";
import TelegramPostImporter from "@/components/admin/TelegramPostImporter";
import { formValuesToPayload, type CarFormValues } from "@/lib/car-form";
import type { TelegramImportMeta } from "@/lib/telegram-car-import";

export default function AddCarPage() {
  const router = useRouter();
  const [formSeed, setFormSeed] = useState(0);
  const [initialValues, setInitialValues] = useState<Partial<CarFormValues>>({});
  const [importMeta, setImportMeta] = useState<TelegramImportMeta | null>(null);
  const [importNotice, setImportNotice] = useState("");

  const handleImported = (values: Partial<CarFormValues>, meta: TelegramImportMeta) => {
    setInitialValues(values);
    setImportMeta(meta);
    setFormSeed((value) => value + 1);
    setImportNotice(
      `Дані з Telegram підставлено (${meta.photoCount} фото). Перевірте поля та натисніть «Додати авто».`
    );
    window.scrollTo({ top: document.body.scrollHeight * 0.25, behavior: "smooth" });
  };

  const handleSubmit = async (values: CarFormValues) => {
    const payload = {
      ...formValuesToPayload(values),
      externalId: importMeta?.externalId || undefined,
      sourceUrl: importMeta?.sourceUrl || undefined,
    };
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
        <p className="text-sm text-muted mt-1">
          Імпортуйте з Telegram або заповніть параметри вручну
        </p>
      </div>

      <TelegramPostImporter onImported={handleImported} />

      {importNotice && (
        <div className="admin-card border-green-200 bg-green-50 text-green-800 text-sm">
          {importNotice}
        </div>
      )}

      <CarForm
        key={formSeed}
        initial={initialValues}
        submitLabel="Додати авто"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
