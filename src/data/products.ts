/**
 * DỮ LIỆU SẢN PHẨM — nằm trong content/products.json
 * - `samplePrice: true`  → giá đang là giá mẫu (hiển thị nhãn "Giá mẫu").
 * - `unverified: true`   → thông số mẫu, cần xác nhận với xưởng.
 * - `price: null`        → báo giá theo yêu cầu.
 */
import data from "@content/products.json";
import type { Product } from "@/types/product";

type RawProduct = Omit<Product, "price"> & { price?: number | string | null };

/** Chuẩn hoá dữ liệu từ CMS: ô giá để trống = báo giá; danh sách thiếu = rỗng */
function normalize(p: RawProduct): Product {
  const price = p.price === "" || p.price === undefined || p.price === null ? null : Number(p.price);
  return {
    ...p,
    price: Number.isFinite(price) ? price : null,
    description: p.description ?? [],
    images: p.images ?? [],
    materials: p.materials ?? [],
    specs: p.specs ?? [],
    handmadeNotes: p.handmadeNotes ?? [],
    care: p.care ?? [],
  };
}

export const products = (data.items as RawProduct[]).map(normalize).filter((p) => p.images.length > 0);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3) {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}
