import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Lora, Dancing_Script } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/data/site-config";
import { defaultKeywords } from "@/lib/seo";

const serif = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});
const script = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["500"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} – Nón lá thủ công làng nghề Quảng Nạp, Thái Bình`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  alternates: { canonical: "/", languages: { "vi-VN": "/" } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} – Nón lá thủ công Việt Nam`,
    description: siteConfig.description,
    url: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#263D25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
