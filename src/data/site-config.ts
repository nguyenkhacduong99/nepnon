/**
 * CẤU HÌNH TRUNG TÂM — dữ liệu nằm trong content/site.json
 * (sửa bằng Trình chỉnh sửa NẾP NÓN hoặc trực tiếp file JSON).
 * Các trường để trống ("") sẽ được ẩn khỏi giao diện cho đến khi điền.
 */
import site from "@content/site.json";

export const siteConfig = {
  ...site,
  /** URL chính thức khi deploy — dùng cho canonical, sitemap, Open Graph */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;

export const navigation = site.navigation;
