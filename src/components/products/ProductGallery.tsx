"use client";

import { useState } from "react";
import type { ImageAsset } from "@/types/product";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";

export function ProductGallery({ images, name }: { images: ImageAsset[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-bamboo/50">
        <BrandImage key={current.src} image={current} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        {current.placeholder && (
          <span className="absolute top-3 right-3">
            <SampleBadge>Ảnh minh họa</SampleBadge>
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3 lg:w-20 lg:grid-cols-1" aria-label={`Ảnh của ${name}`}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Xem ảnh ${i + 1}: ${img.alt}`}
                aria-current={i === active}
                className={`relative block aspect-[4/5] w-full overflow-hidden bg-bamboo/50 ring-offset-2 ring-offset-ivory transition ${
                  i === active ? "ring-1 ring-forest" : "opacity-70 hover:opacity-100"
                }`}
              >
                <BrandImage image={img} fill sizes="100px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
