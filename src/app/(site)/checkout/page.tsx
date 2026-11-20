import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Đặt hàng",
  robots: { index: false, follow: true },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="Đặt hàng"
        intro="Điền thông tin nhận hàng — chúng tôi sẽ liên hệ xác nhận đơn, phí vận chuyển và cách thanh toán."
        crumbs={[{ href: "/cart", label: "Giỏ hàng" }, { label: "Đặt hàng" }]}
      />
      <section className="container-page pb-24">
        <CheckoutForm />
      </section>
    </>
  );
}
