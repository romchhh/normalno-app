import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import ScrollToTop from "@/components/ScrollToTop";
import TelegramWebApp from "@/components/TelegramWebApp";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_URL } from "@/lib/brand";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s · ${BRAND_NAME}`,
  },
  description: BRAND_TAGLINE,
  metadataBase: new URL(BRAND_URL),
  openGraph: {
    title: BRAND_NAME,
    description: BRAND_TAGLINE,
    siteName: BRAND_NAME,
    locale: "uk_UA",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport = {
  themeColor: "#FF8800",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <TelegramWebApp />
        <Header />
        <main className="pt-[72px]">{children}</main>
        <BottomNav />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
