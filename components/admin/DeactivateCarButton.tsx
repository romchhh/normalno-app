"use client";

export default function DeactivateCarButton({
  id,
  status,
}: {
  id: number;
  status: string | null;
}) {
  const isInactive = status === "inactive" || status === "sold";

  const handleClick = async () => {
    const next = isInactive ? "available" : "inactive";
    const ok = confirm(
      isInactive ? "Повернути авто в наявність?" : "Деактивувати авто (прибрати з підбору)?"
    );
    if (!ok) return;
    await fetch(`/api/cars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="admin-btn admin-btn-secondary text-sm min-h-10 px-3"
      title={isInactive ? "Активувати" : "Деактивувати"}
    >
      {isInactive ? "On" : "Off"}
    </button>
  );
}
