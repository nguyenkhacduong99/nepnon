import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Leaf, Sparkles } from "lucide-react";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { siteConfig } from "@/data/site-config";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/common/PageHeader";
import { ProductGallery } from "@/components/products/ProductGallery";
import { PurchasePanel } from "@/components/products/PurchasePanel";
import { ProductCard } from "@/components/products/ProductCard";
import { availabilityLabel } from "@/components/products/AvailabilityTag";
import { ZaloButton } from "@/components/common/ZaloButton";
import { SampleBadge } from "@/components/common/SampleNotice";
import { JsonLd, productJsonLd } from "@/components/common/JsonLd";
import { pages } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  return pageMetadata({
    title: product.name,
    description: `${product.shortDescription} Nón lá thủ công từ làng nghề Quảng Nạp, Thái Bình.`,
    path: `/products/${product.slug}`,
    image: product.images[0]?.src,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <>
      <div className="container-page pt-8">
        <Breadcrumbs items={[{ href: "/products", label: "Sản phẩm" }, { label: product.name }]} />
      </div>

      <section className="container-page grid gap-10 pt-8 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{category?.name}</p>
          <h1 className="mt-3 type-page text-forest">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-2xl text-text">{formatPrice(product.price)}</p>
            {product.samplePrice && <SampleBadge>Giá mẫu — sẽ cập nhật</SampleBadge>}
          </div>
          <p className="mt-5 text-lg text-muted">{product.shortDescription}</p>

          <dl className="mt-6 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-wood" strokeWidth={1.5} aria-hidden="true" />
              <dt className="sr-only">Tình trạng</dt>
              <dd>{availabilityLabel(product.availability)}</dd>
            </div>
            {product.leadTime && (
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-wood" strokeWidth={1.5} aria-hidden="true" />
                <dt className="sr-only">Thời gian chuẩn bị</dt>
                <dd>{product.leadTime}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <PurchasePanel product={product} />
          </div>
          <div className="mt-3">
            <ZaloButton className="w-full" label="Đặt nhanh qua Zalo" />
          </div>
          <p className="mt-3 text-xs text-muted">{siteConfig.commerce.shippingNote}</p>

          <aside className="mt-8 flex gap-4 border-l-2 border-wood bg-bamboo/40 p-5">
            <Leaf className="mt-0.5 size-5 shrink-0 text-wood" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-serif text-lg leading-snug text-forest italic">
              {pages.products.handmadeNote}
            </p>
          </aside>

          <div className="mt-10 divide-y divide-line border-y border-line">
            <details open className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl text-forest">
                Mô tả sản phẩm <span className="text-wood transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="prose-story mt-4 text-[0.95rem] text-text/85">
                {product.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl text-forest">
                Chất liệu & thông số <span className="text-wood transition-transform group-open:rotate-45">+</span>
              </summary>
              <dl className="mt-4 grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3 text-sm">
                <dt className="text-muted">Chất liệu</dt>
                <dd>{product.materials.join(", ")}</dd>
                {product.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-muted">{s.label}</dt>
                    <dd>
                      {s.value}
                      {s.unverified && siteConfig.showSampleNotices && <span className="ml-2 text-xs text-wood">(cần xác nhận)</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl text-forest">
                Đặc điểm thủ công <span className="text-wood transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text/85 marker:text-wood">
                {product.handmadeNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl text-forest">
                Hướng dẫn bảo quản <span className="text-wood transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text/85 marker:text-wood">
                {product.care.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white/40 py-20" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="type-section text-forest">
              Có thể bạn cũng thích
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <JsonLd data={productJsonLd(product)} />
    </>
  );
}
