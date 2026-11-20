import { siteConfig } from "@/data/site-config";
import { absoluteUrl } from "@/lib/seo";
import type { Product } from "@/types/product";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify + thay "<" để tránh chèn mã
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd() {
  const sameAs = [siteConfig.social.facebook, siteConfig.social.tiktok].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl(siteConfig.logo.horizontal),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    address: { "@type": "PostalAddress", addressRegion: "Thái Bình", addressCountry: "VN" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function productJsonLd(product: Product) {
  const realImages = product.images.filter((i) => !i.placeholder).map((i) => absoluteUrl(i.src));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    ...(realImages.length ? { image: realImages } : {}),
    brand: { "@type": "Brand", name: siteConfig.brandName },
    // Chỉ khai báo giá khi là giá bán chính thức (không phải giá mẫu)
    ...(product.price !== null && !product.samplePrice
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: siteConfig.commerce.currency,
            url: absoluteUrl(`/products/${product.slug}`),
            availability:
              product.availability === "out_of_stock"
                ? "https://schema.org/OutOfStock"
                : product.availability === "made_to_order"
                  ? "https://schema.org/PreOrder"
                  : "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
