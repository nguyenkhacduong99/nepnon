import Link from "next/link";
import type { Product } from "@/types/product";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { AddToCartButton } from "./AddToCartButton";
import { AvailabilityTag } from "./AvailabilityTag";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const [first, second] = product.images;
  const href = `/products/${product.slug}`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-bamboo/50" aria-label={`Xem chi tiết ${product.name}`}>
        <BrandImage
          image={first}
          fill
          priority={priority}
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />
        {second && (
          <BrandImage
            image={second}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <span className="absolute top-3 left-3">
          <AvailabilityTag availability={product.availability} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.7rem] tracking-[0.18em] text-muted uppercase">{getCategory(product.category)?.name}</p>
        <h3 className="type-product mt-1.5 text-forest">
          <Link href={href} className="hover:text-wood">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{product.shortDescription}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-[1.05rem] font-medium text-text">{formatPrice(product.price)}</p>
          {product.samplePrice && <SampleBadge>Giá mẫu</SampleBadge>}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center justify-center border border-forest/70 px-3 text-sm text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            Xem chi tiết
          </Link>
          <AddToCartButton slug={product.slug} compact disabled={product.availability === "out_of_stock"} />
        </div>
      </div>
    </article>
  );
}
