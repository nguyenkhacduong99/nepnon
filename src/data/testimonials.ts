/**
 * ĐÁNH GIÁ KHÁCH HÀNG — nằm trong content/testimonials.json.
 * `demo: true` = nội dung minh họa, chỉ hiện khi bật showSampleNotices.
 */
import data from "@content/testimonials.json";

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
  demo: boolean;
}

export const testimonials = data.items as Testimonial[];
