import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import AdminShell from "@/components/admin/AdminShell";
import "./globals.css";

export const metadata: Metadata = {
  title: `Admin · ${BRAND_NAME}`,
  description: `Панель адміністратора ${BRAND_NAME}`,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF8800",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
