import { siteConfig } from "@/data/site-config";
import { formatPrice } from "@/lib/format";
import { getZaloUrl } from "@/lib/contact";
import type { CustomerInfo, OrderDraft, OrderSubmitter } from "@/types/order";
import type { Product } from "@/types/product";

export function buildOrderDraft(
  customer: CustomerInfo,
  lines: { product: Product; quantity: number }[],
): OrderDraft {
  const orderLines = lines.map(({ product, quantity }) => ({
    slug: product.slug,
    name: product.name,
    quantity,
    unitPrice: product.price,
    lineTotal: product.price === null ? null : product.price * quantity,
  }));
  return {
    customer,
    lines: orderLines,
    subtotal: orderLines.reduce((s, l) => s + (l.lineTotal ?? 0), 0),
    hasQuoteItems: orderLines.some((l) => l.unitPrice === null),
    createdAt: new Date().toISOString(),
  };
}

export function formatOrderMessage(order: OrderDraft): string {
  const rows = order.lines.map(
    (l, i) =>
      `${i + 1}. ${l.name} × ${l.quantity}` + (l.lineTotal === null ? " — cần báo giá" : ` — ${formatPrice(l.lineTotal)}`),
  );
  const parts = [
    `ĐƠN ĐẶT HÀNG ${siteConfig.brandName}`,
    "",
    `Họ tên: ${order.customer.name}`,
    `Điện thoại: ${order.customer.phone}`,
    `Địa chỉ nhận: ${order.customer.address}`,
    "",
    "Sản phẩm:",
    ...rows,
    "",
    `Tạm tính: ${formatPrice(order.subtotal)}${order.hasQuoteItems ? " (chưa gồm sản phẩm cần báo giá)" : ""}`,
    "Phí vận chuyển: shop báo khi xác nhận đơn",
  ];
  if (order.customer.note.trim()) parts.push("", `Ghi chú: ${order.customer.note.trim()}`);
  return parts.join("\n");
}

/**
 * Kênh gửi đơn hiện tại: sao chép nội dung + mở Zalo của shop.
 * Đơn KHÔNG được lưu lên máy chủ. Khi có backend/thanh toán, tạo thêm
 * một OrderSubmitter mới (channel "api" hoặc "payment-gateway").
 */
export const zaloSubmitter: OrderSubmitter = {
  channel: "zalo",
  async submit(order) {
    const text = formatOrderMessage(order);
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
    const url = getZaloUrl();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    return {
      ok: copied,
      message: copied
        ? url
          ? "Đã sao chép thông tin đơn. Hãy dán vào khung chat Zalo vừa mở để gửi cho shop."
          : "Đã sao chép thông tin đơn. Shop chưa cấu hình Zalo — vui lòng gửi qua kênh liên hệ khác."
        : "Trình duyệt không cho phép sao chép tự động. Hãy chọn và sao chép nội dung đơn bên dưới.",
    };
  },
};
