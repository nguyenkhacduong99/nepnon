import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { BrandLogo } from "@/components/brand/BrandLogo";

/** Logo có link về trang chủ — dùng ở header, footer, menu di động. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label={`${siteConfig.brandName} – Trang chủ`}>
      <BrandLogo variant="horizontal" tone={tone === "light" ? "reverse" : "color"} className="h-9 w-auto lg:h-10" title={siteConfig.brandName} />
    </Link>
  );
}
