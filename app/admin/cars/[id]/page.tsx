"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CarForm from "@/components/admin/CarForm";
import PublishCarButton from "@/components/admin/PublishCarButton";
import {
  carToFormValues,
  formValuesToPayload,
  type CarFormValues,
} from "@/lib/car-form";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [car, setCar] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID не знайдено");
      setLoading(false);
      return;
    }
    fetch(`/api/cars/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Не вдалося завантажити");
        }
        return res.json();
      })
      .then((data) => setCar(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Помилка"))
      .finally(() => setLoading(false));
  }, [id]);

  const initial = useMemo(
    () => (car ? carToFormValues(car) : undefined),
    [car]
  );

  const handleSubmit = async (values: CarFormValues) => {
    if (!id || !car) return;
    const payload = formValuesToPayload(values, String(car.uid || ""));
    const res = await fetch(`/api/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Не вдалося оновити");
    }
    router.push("/admin/cars");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-border border-t-brand rounded-full" />
      </div>
    );
  }

  if (error || !car || !initial) {
    return (
      <div className="admin-card text-center space-y-3">
        <p className="font-semibold">{error || "Авто не знайдено"}</p>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => router.push("/admin/cars")}
        >
          До списку
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Редагувати авто</h2>
        <p className="text-sm text-muted mt-1">
          #{id}
          {car.telegramPublished ? " · опубліковано в канал" : ""}
        </p>
      </div>
      <PublishCarButton
        carId={Number(id)}
        published={Boolean(car.telegramPublished)}
        publishedAt={
          typeof car.telegramPublishedAt === "string"
            ? car.telegramPublishedAt
            : car.telegramPublishedAt
              ? String(car.telegramPublishedAt)
              : null
        }
      />
      <CarForm initial={initial} submitLabel="Зберегти зміни" onSubmit={handleSubmit} />
    </div>
  );
}
