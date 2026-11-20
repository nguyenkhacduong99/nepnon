"use client";

import { useRef, type ReactNode } from "react";
import { Download } from "lucide-react";

/** Bọc một SVG và cho phép tải về thành file .svg (dùng cho bao bì, nhãn, logo). */
export function DownloadSvg({ filename, children }: { filename: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function download() {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // Thay biến CSS font bằng tên font thật để file mở được ngoài website
    const markup = new XMLSerializer()
      .serializeToString(clone)
      .replace(/var\(--font-lora\),\s*/g, "")
      .replace(/var\(--font-be-vietnam\),\s*/g, "")
      .replace(/var\(--font-dancing\),\s*/g, "")
      .replace(/var\(--color-forest\)/g, "#263D25")
      .replace(/var\(--color-wood\)/g, "#8B6846")
      .replace(/var\(--color-ivory\)/g, "#F8F4EA")
      .replace(/var\(--color-text\)/g, "#292820");
    const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div ref={ref}>{children}</div>
      <button
        type="button"
        onClick={download}
        className="type-caption mt-3 inline-flex min-h-10 items-center gap-2 text-forest underline decoration-wood/50 underline-offset-4 hover:decoration-forest"
      >
        <Download className="size-4" aria-hidden="true" /> Tải file SVG
      </button>
    </div>
  );
}
