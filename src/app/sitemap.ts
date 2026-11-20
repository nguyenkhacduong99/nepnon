import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { articles } from "@/data/content";
import { policies } from "@/data/policies";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["/", "/products", "/story", "/craftsmanship", "/culture", "/contact"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), lastModified: now, priority: p === "/" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), lastModified: now, priority: 0.9 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/culture/${a.slug}`), lastModified: now, priority: 0.6 })),
    ...policies.map((p) => ({ url: absoluteUrl(`/policies/${p.slug}`), lastModified: now, priority: 0.3 })),
  ];
}
