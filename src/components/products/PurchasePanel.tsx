"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";
import { QuantitySelector } from "./QuantitySelector";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <QuantitySelector value={qty} onChange={setQty} />
      <AddToCartButton slug={product.slug} quantity={qty} disabled={product.availability === "out_of_stock"} className="flex-1" />
    </div>
  );
}
