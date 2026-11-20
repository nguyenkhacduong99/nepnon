"use client";

import { Minus, Plus } from "lucide-react";
import { CART_MAX_QTY } from "@/lib/cart";

export function QuantitySelector({
  value,
  onChange,
  label = "Số lượng",
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-10" : "h-12";
  const btn = `inline-flex ${h} w-10 items-center justify-center text-forest transition-colors hover:bg-bamboo/60 disabled:opacity-30`;
  return (
    <div className={`inline-flex items-center border border-line bg-white/60`} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Giảm số lượng">
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={CART_MAX_QTY}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(Math.max(1, Math.min(CART_MAX_QTY, Math.round(n))));
        }}
        className={`${h} w-12 [appearance:textfield] bg-transparent text-center text-sm focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= CART_MAX_QTY} aria-label="Tăng số lượng">
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
