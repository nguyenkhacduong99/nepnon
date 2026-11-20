import { siteConfig } from "@/data/site-config";

const vnd = new Intl.NumberFormat(siteConfig.commerce.locale, {
  style: "currency",
  currency: siteConfig.commerce.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number | null): string {
  if (value === null) return "Báo giá theo yêu cầu";
  return vnd.format(value);
}

/** Chuẩn hóa chuỗi tiếng Việt để tìm kiếm không dấu */
export function normalizeVi(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim();
}
