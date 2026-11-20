export interface CartItem {
  slug: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  note: string;
}

export interface OrderLine {
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number | null;
  lineTotal: number | null;
}

export interface OrderDraft {
  customer: CustomerInfo;
  lines: OrderLine[];
  subtotal: number;
  /** có sản phẩm cần báo giá riêng → tổng chưa đầy đủ */
  hasQuoteItems: boolean;
  createdAt: string;
}

/**
 * Điểm mở rộng cho thanh toán/lưu đơn trong tương lai.
 * Phiên bản hiện tại chỉ dùng kênh "zalo" (chuyển thông tin đơn qua Zalo),
 * KHÔNG lưu đơn lên máy chủ và KHÔNG thu tiền online.
 */
export type OrderChannel = "zalo" | "api" | "payment-gateway";

export interface OrderSubmitter {
  channel: OrderChannel;
  submit(order: OrderDraft): Promise<{ ok: boolean; message: string }>;
}
