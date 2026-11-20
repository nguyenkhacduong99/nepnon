"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { normalizeVi } from "@/lib/format";
import type { CategorySlug, Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá: thấp đến cao" },
  { value: "price-desc", label: "Giá: cao đến thấp" },
];

function sortProducts(list: Product[], sort: Sort) {
  if (sort === "featured") return list;
  // Sản phẩm báo giá (price = null) luôn ở cuối
  return [...list].sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return sort === "price-asc" ? a.price - b.price : b.price - a.price;
  });
}

export function ProductCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const category = categories.some((c) => c.slug === categoryParam) ? (categoryParam as CategorySlug) : null;
  const sortParam = params.get("sort") as Sort | null;
  const sort: Sort = sortOptions.some((o) => o.value === sortParam) ? sortParam! : "featured";
  const inStockOnly = params.get("stock") === "1";

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const s = sp.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const nq = normalizeVi(q);
    const filtered = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (inStockOnly && p.availability !== "in_stock") return false;
      if (nq) {
        const hay = normalizeVi(`${p.name} ${p.shortDescription} ${p.materials.join(" ")}`);
        if (!nq.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
    return sortProducts(filtered, sort);
  }, [q, category, sort, inStockOnly]);

  const chip = "inline-flex min-h-10 items-center border px-4 text-sm transition-colors";
  const activeFilters = Boolean(q || category || inStockOnly);

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-2" aria-label="Lọc theo danh mục">
          <li>
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => update({ category: null })}
              className={`${chip} ${!category ? "border-forest bg-forest text-ivory" : "border-line text-text hover:border-forest"}`}
            >
              Tất cả
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                aria-pressed={category === c.slug}
                onClick={() => update({ category: category === c.slug ? null : c.slug })}
                className={`${chip} ${category === c.slug ? "border-forest bg-forest text-ivory" : "border-line text-text hover:border-forest"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <label htmlFor="catalog-search" className="sr-only">
              Tìm sản phẩm
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="catalog-search"
              type="search"
              defaultValue={q}
              key={q}
              placeholder="Tìm sản phẩm…"
              onKeyDown={(e) => {
                if (e.key === "Enter") update({ q: e.currentTarget.value.trim() || null });
              }}
              onBlur={(e) => {
                if (e.currentTarget.value.trim() !== q) update({ q: e.currentTarget.value.trim() || null });
              }}
              className="min-h-11 w-full border border-line bg-white/60 pr-3 pl-9 text-sm focus:border-forest focus:outline-none sm:w-56"
            />
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => update({ stock: e.target.checked ? "1" : null })}
              className="size-4 accent-forest"
            />
            Chỉ hàng có sẵn
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sắp xếp</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
              className="min-h-11 border border-line bg-white/60 px-3 text-sm focus:border-forest focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted" aria-live="polite">
        <p>
          {results.length} sản phẩm
          {q && (
            <>
              {" "}
              cho “<span className="text-forest">{q}</span>”
            </>
          )}
        </p>
        {activeFilters && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="inline-flex min-h-10 items-center gap-1 text-forest underline underline-offset-4">
            <X className="size-4" aria-hidden="true" /> Xóa bộ lọc
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-line px-6 py-16 text-center">
          <p className="font-serif text-2xl text-forest">Không tìm thấy sản phẩm phù hợp</p>
          <p className="mt-2 text-sm text-muted">Thử từ khóa khác, hoặc liên hệ để đặt nón theo yêu cầu.</p>
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="mt-6 inline-flex min-h-11 items-center border border-forest px-5 text-sm text-forest hover:bg-forest hover:text-ivory">
            Xem tất cả sản phẩm
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductGridFallback() {
  return (
    <div className="mt-[6.5rem] grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
