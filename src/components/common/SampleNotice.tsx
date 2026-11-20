import { siteConfig } from "@/data/site-config";

/** Nhãn nhỏ đánh dấu nội dung mẫu / ảnh minh họa. Tắt bằng siteConfig.showSampleNotices. */
export function SampleBadge({ children = "Nội dung mẫu", tone = "light" }: { children?: string; tone?: "light" | "dark" }) {
  if (!siteConfig.showSampleNotices) return null;
  const cls =
    tone === "dark"
      ? "border-ivory/40 text-ivory/80"
      : "border-wood/40 text-wood";
  return (
    <span className={`inline-flex items-center border border-dashed px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${cls}`}>
      {children}
    </span>
  );
}
