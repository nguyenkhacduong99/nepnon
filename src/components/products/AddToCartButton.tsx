"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { cart } from "@/lib/cart";
import { buttonClass } from "@/components/common/Button";

export function AddToCartButton({
  slug,
  quantity = 1,
  disabled,
  compact,
  className = "",
}: {
  slug: string;
  quantity?: number;
  disabled?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2400);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          cart.add(slug, quantity);
          setAdded(true);
        }}
        className={buttonClass("primary", compact ? "min-h-11 w-full px-4 text-sm" : "w-full")}
      >
        {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" strokeWidth={1.5} aria-hidden="true" />}
        {disabled ? "Tạm hết hàng" : added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
      </button>
      <p aria-live="polite" className={`text-center text-xs text-muted ${added && !compact ? "" : "sr-only"}`}>
        {added && (
          <>
            Đã thêm vào giỏ hàng.{" "}
            <Link href="/cart" className="text-forest underline underline-offset-4">
              Xem giỏ hàng
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
