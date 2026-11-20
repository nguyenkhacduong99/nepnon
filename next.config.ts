import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ảnh thật (.jpg/.png/.webp) sẽ được Next.js tự tối ưu sang AVIF/WebP.
    // Ảnh minh họa .svg được hiển thị trực tiếp (xem components/brand/BrandImage.tsx).
    formats: ["image/avif", "image/webp"],
  },
  // Trang quản trị Decap CMS nằm ở public/admin/index.html
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
