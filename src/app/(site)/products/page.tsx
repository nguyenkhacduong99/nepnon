import { Suspense } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductCatalog, ProductGridFallback } from "@/components/products/ProductCatalog";
import { ClosingCta } from "@/components/storytelling/ClosingCta";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/data/pages";

export const metadata = pageMetadata({
  title: "Sản phẩm nón lá thủ công",
  description:
    "Mua nón lá thủ công từ làng nghề Quảng Nạp, Thái Bình: nón lá truyền thống, nón lá đặc biệt, nón lá quà tặng và đặt nón theo yêu cầu.",
  path: "/products",
  keywords: ["nón lá quà tặng", "nón lá đặt theo yêu cầu"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.products.eyebrow}
        title={pages.products.title}
        intro={pages.products.intro}
        crumbs={[{ label: "Sản phẩm" }]}
      />
      <section className="container-page pb-24" aria-label="Danh sách sản phẩm">
        <Suspense fallback={<ProductGridFallback />}>
          <ProductCatalog />
        </Suspense>
      </section>
      <ClosingCta title={pages.products.ctaTitle} text={pages.products.ctaText} />
    </>
  );
}
