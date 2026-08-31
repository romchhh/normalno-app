import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "../(site)/globals.css";
import "./wizard.css";
import TelegramWebApp from "@/components/TelegramWebApp";
import { BRAND_NAME } from "@/lib/brand";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Підбір авто · ${BRAND_NAME}`,
};

export const viewport = {
  themeColor: "#FF8800",
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <TelegramWebApp />
        {children}
      </body>
    </html>
  );
}
