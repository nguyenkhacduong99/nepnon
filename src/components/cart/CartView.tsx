"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { cart, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/data/site-config";
import { BrandImage } from "@/components/brand/BrandImage";
import { ButtonLink } from "@/components/common/Button";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { useHydrated } from "@/lib/use-hydrated";

export function CartView() {
  const { lines, subtotal, hasQuoteItems, count } = useCart();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <div className="h-64 animate-pulse bg-bamboo/30" aria-busy="true" aria-label="Đang tải giỏ hàng" />;
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center border border-dashed border-line px-6 py-20 text-center">
        <ShoppingBag className="size-10 text-wood" strokeWidth={1.2} aria-hidden="true" />
        <p className="mt-5 font-serif text-3xl text-forest">Giỏ hàng đang trống</p>
        <p className="mt-2 max-w-sm text-muted">Hãy chọn cho mình một chiếc nón lá làm bằng tay từ làng nghề Quảng Nạp.</p>
        <ButtonLink href="/products" className="mt-8">
          Khám phá sản phẩm
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
      <ul className="divide-y divide-line border-y border-line">
        {lines.map(({ product, quantity }) => (
          <li key={product.slug} className="grid grid-cols-[5.5rem_1fr] gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-bamboo/50">
              <BrandImage image={product.images[0]} fill sizes="112px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/products/${product.slug}`} className="font-serif text-xl leading-tight text-forest hover:text-wood sm:text-2xl">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{formatPrice(product.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => cart.remove(product.slug)}
                  className="inline-flex size-10 shrink-0 items-center justify-center text-muted transition-colors hover:text-wood"
                  aria-label={`Xóa ${product.name} khỏi giỏ`}
                >
                  <Trash2 className="size-4.5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <QuantitySelector size="sm" value={quantity} onChange={(n) => cart.setQuantity(product.slug, n)} label={`Số lượng ${product.name}`} />
                <p className="font-medium text-text">{product.price === null ? "Cần báo giá" : formatPrice(product.price * quantity)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit bg-white/60 p-6 ring-1 ring-line lg:sticky lg:top-28" aria-labelledby="summary-title">
        <h2 id="summary-title" className="type-title text-forest">
          Tóm tắt đơn hàng
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Số sản phẩm</dt>
            <dd>{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Tạm tính</dt>
            <dd className="font-medium">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Vận chuyển</dt>
            <dd className="text-right">Báo khi xác nhận đơn</dd>
          </div>
        </dl>
        {hasQuoteItems && <p className="mt-4 text-xs text-wood">Giỏ hàng có sản phẩm đặt theo yêu cầu — shop sẽ báo giá khi xác nhận.</p>}
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Tiếp tục đặt hàng
        </ButtonLink>
        <Link href="/products" className="mt-4 block text-center text-sm text-forest underline underline-offset-4">
          Tiếp tục mua sắm
        </Link>
        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">{siteConfig.commerce.shippingNote}</p>
      </aside>
    </div>
  );
}
