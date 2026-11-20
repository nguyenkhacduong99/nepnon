import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { BrandSectionHeading } from "@/components/brand/BrandSectionHeading";
import { pages } from "@/data/pages";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);
  return (
    <section className="py-20 lg:py-28" aria-labelledby="featured-title">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="featured-title">
            <BrandSectionHeading
              eyebrow={pages.home.featured.eyebrow}
              title={pages.home.featured.title}
              intro={pages.home.featured.intro}
            />
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 self-start text-sm text-forest underline decoration-wood/50 underline-offset-[6px] hover:decoration-forest md:self-auto">
            {pages.home.featured.linkLabel} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Danh mục sản phẩm">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/products?category=${c.slug}`}
                className="inline-flex min-h-10 items-center border border-line px-4 text-sm text-text transition-colors hover:border-forest hover:text-forest"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
