import { ZaloIcon } from "@/components/common/BrandIcons";
import { buttonClass } from "@/components/common/Button";
import { getZaloUrl } from "@/lib/contact";

/**
 * Nút mở chat Zalo. Nếu chưa cấu hình số Zalo trong site-config.ts:
 * - production: không hiển thị (tránh nút giả)
 * - development: hiển thị nhãn nhắc cấu hình
 */
export function ZaloButton({
  label = "Nhắn Zalo đặt hàng",
  variant = "secondary",
  className = "",
}: {
  label?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const url = getZaloUrl();
  if (!url) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <span
        className={`inline-flex min-h-12 items-center gap-2 border border-dashed border-wood/60 px-4 text-xs text-wood ${className}`}
        title="Điền contact.zaloPhone trong src/data/site-config.ts"
      >
        <ZaloIcon className="size-5" /> Zalo chưa cấu hình (site-config.ts)
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      <ZaloIcon className="size-5" />
      {label}
    </a>
  );
}
