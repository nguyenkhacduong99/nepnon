import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Giỏ hàng" crumbs={[{ label: "Giỏ hàng" }]} />
      <section className="container-page pb-24">
        <CartView />
      </section>
    </>
  );
}
