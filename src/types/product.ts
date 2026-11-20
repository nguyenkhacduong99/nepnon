export type CategorySlug = "truyen-thong" | "dac-biet" | "qua-tang" | "dat-theo-yeu-cau";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true = ảnh minh họa, cần thay bằng ảnh chụp thật */
  placeholder?: boolean;
}

export type Availability = "in_stock" | "made_to_order" | "out_of_stock";

export interface ProductSpec {
  label: string;
  value: string;
  /** true = thông số mẫu, cần xác nhận lại với xưởng */
  unverified?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Giá bán (VND). null = báo giá theo yêu cầu */
  price: number | null;
  /** true = giá mẫu, chưa phải giá bán chính thức */
  samplePrice: boolean;
  shortDescription: string;
  description: string[];
  images: ImageAsset[];
  availability: Availability;
  /** Thời gian chuẩn bị dự kiến, ví dụ "1–3 ngày" */
  leadTime?: string;
  materials: string[];
  specs: ProductSpec[];
  handmadeNotes: string[];
  care: string[];
  featured?: boolean;
  /** Đơn hàng tối thiểu (dành cho sản phẩm đặt riêng) */
  minQuantity?: number;
}
