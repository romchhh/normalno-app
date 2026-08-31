import BannerUpload from "@/components/admin/BannerUpload";
import Link from "next/link";

export default function AdminBannerPage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Рекламний банер</h2>
        <p className="text-sm text-muted mt-1">
          Зображення на головній сторінці. Після збереження воно одразу зʼявиться на сайті.
        </p>
      </div>

      <div className="admin-card">
        <BannerUpload />
      </div>

      <Link href="/" target="_blank" className="admin-btn admin-btn-secondary text-sm inline-flex">
        Відкрити головну →
      </Link>
    </div>
  );
}
