"use client";

export default function DeleteButton({
  id,
  carId,
}: {
  id?: number;
  carId?: number;
}) {
  const targetId = id ?? carId;
  if (!targetId) return null;

  return (
    <button
      type="button"
      className="admin-btn admin-btn-secondary text-red-600 border-red-200 text-sm px-3"
      onClick={async () => {
        if (!confirm("Видалити це авто?")) return;
        await fetch(`/api/cars/${targetId}`, { method: "DELETE" });
        window.location.reload();
      }}
    >
      Видалити
    </button>
  );
}
