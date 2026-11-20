import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const defaultKeywords = [
  "nón lá Việt Nam",
  "nón lá thủ công",
  "nón lá truyền thống",
  "mua nón lá",
  "nón lá Thái Bình",
  "nón lá làng nghề Quảng Nạp",
  "nón lá làm quà tặng",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  // Ảnh Open Graph chỉ dùng khi là ảnh thật (không phải SVG minh họa)
  const ogImage = image && !image.endsWith(".svg") ? [{ url: image }] : undefined;
  return {
    title,
    description,
    keywords: [...keywords, ...defaultKeywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: siteConfig.brandName,
      title,
      description,
      url: path,
      images: ogImage,
    },
  };
}
