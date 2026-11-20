import { craftSteps } from "@/data/content";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/PageHeader";
import { BrandImage } from "@/components/brand/BrandImage";
import { ClosingCta } from "@/components/storytelling/ClosingCta";
import { pages } from "@/data/pages";

export const metadata = pageMetadata({
  title: "Quy trình làm nón lá thủ công",
  description: "Các công đoạn làm một chiếc nón lá thủ công tại làng nghề Quảng Nạp, Thái Bình: chọn lá, xử lý lá, dựng khung, chằm nón và hoàn thiện.",
  path: "/craftsmanship",
  keywords: ["cách làm nón lá", "quy trình làm nón lá"],
});

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHeader
        eyebrow={pages.craftsmanship.eyebrow}
        title={pages.craftsmanship.title}
        intro={pages.craftsmanship.intro}
        crumbs={[{ label: "Quy trình làm nón" }]}
      />

      <ol className="pb-10">
        {craftSteps.map((s, i) => (
          <li key={s.step} className={i % 2 === 1 ? "bg-bamboo/35" : ""}>
            <div className={`container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24`}>
              <div className={`relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <BrandImage image={s.image} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="max-w-lg">
                <p className="font-serif text-7xl leading-none text-wood/60 italic sm:text-8xl">{String(s.step).padStart(2, "0")}</p>
                <h2 className="mt-4 type-section text-forest">{s.title}</h2>
                <p className="mt-3 font-medium text-wood">{s.summary}</p>
                <p className="mt-5 text-lg leading-relaxed text-text/85">{s.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {siteConfig.showSampleNotices && (
        <section className="container-page pb-20">
          <p className="mx-auto max-w-2xl border border-dashed border-wood/40 p-6 text-center text-sm text-wood">
            Ghi chú nội bộ: mô tả trên là bản tổng quát. Bổ sung chi tiết riêng của xưởng (thời gian từng công đoạn, loại lá, cách chọn tre…) và ảnh thật trong
            src/data/content.ts.
          </p>
        </section>
      )}
      <ClosingCta />
    </>
  );
}
