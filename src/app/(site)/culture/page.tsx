import Link from "next/link";
import { articles } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/PageHeader";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { pages } from "@/data/pages";

export const metadata = pageMetadata({
  title: "Góc văn hóa – Nón lá Việt Nam",
  description: "Những câu chuyện về chiếc nón lá trong đời sống, văn hóa người Việt và làng nghề Quảng Nạp, Thái Bình.",
  path: "/culture",
  keywords: ["văn hóa nón lá", "ý nghĩa nón lá"],
});

export default function CulturePage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHeader
        eyebrow={pages.culture.eyebrow}
        title={pages.culture.title}
        intro={pages.culture.intro}
        crumbs={[{ label: "Góc văn hóa" }]}
      />
      <section className="container-page pb-24">
        <Link href={`/culture/${lead.slug}`} className="group grid gap-8 border-t border-line pt-10 lg:grid-cols-12">
          <div className="relative aspect-[3/2] overflow-hidden lg:col-span-7">
            <BrandImage image={lead.image} fill priority sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-sm text-muted">{lead.readingTime}</p>
            <h2 className="mt-3 type-section text-forest group-hover:text-wood">{lead.title}</h2>
            <p className="mt-4 text-lg text-muted">{lead.excerpt}</p>
            <span className="mt-6 text-sm text-forest underline underline-offset-[6px]">Đọc bài viết</span>
          </div>
        </Link>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {rest.map((a) => (
            <Link key={a.slug} href={`/culture/${a.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <BrandImage image={a.image} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
              <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                {a.readingTime}
                {a.draft && <SampleBadge>Bản nháp</SampleBadge>}
              </div>
              <h2 className="mt-2 type-title text-forest group-hover:text-wood">{a.title}</h2>
              <p className="mt-2 text-muted">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="relative h-72 sm:h-96" aria-hidden="true">
        <BrandImage image={images.cultureHero} fill sizes="100vw" className="object-cover" />
      </section>
    </>
  );
}
