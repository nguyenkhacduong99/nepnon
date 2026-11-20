"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";
import type { CartItem } from "@/types/order";

const STORAGE_KEY = "nepnon.cart.v1";
const EMPTY: CartItem[] = [];
const MAX_QTY = 99;

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed)
      ? parsed.filter(
          (i): i is CartItem =>
            typeof i?.slug === "string" && typeof i?.quantity === "number" && !!getProduct(i.slug),
        )
      : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage không khả dụng (chế độ ẩn danh...) — giỏ hàng vẫn hoạt động trong phiên
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.round(n)));

export const cart = {
  add(slug: string, quantity = 1) {
    const items = read();
    const existing = items.find((i) => i.slug === slug);
    write(
      existing
        ? items.map((i) => (i.slug === slug ? { ...i, quantity: clamp(i.quantity + quantity) } : i))
        : [...items, { slug, quantity: clamp(quantity) }],
    );
  },
  setQuantity(slug: string, quantity: number) {
    write(read().map((i) => (i.slug === slug ? { ...i, quantity: clamp(quantity) } : i)));
  },
  remove(slug: string) {
    write(read().filter((i) => i.slug !== slug));
  },
  clear() {
    write([]);
  },
};

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const lines = items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((l) => l !== null);
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + (l.product.price ?? 0) * l.quantity, 0);
  const hasQuoteItems = lines.some((l) => l.product.price === null);
  return { lines, count, subtotal, hasQuoteItems };
}

export const CART_MAX_QTY = MAX_QTY;
