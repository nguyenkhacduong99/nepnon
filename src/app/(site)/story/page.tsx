import { brandPhilosophy, motherStory } from "@/data/content";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { Breadcrumbs } from "@/components/common/PageHeader";
import { CraftSteps } from "@/components/storytelling/CraftSteps";
import { ClosingCta } from "@/components/storytelling/ClosingCta";
import { pages } from "@/data/pages";

export const metadata = pageMetadata({
  title: "Câu chuyện của mẹ",
  description: "Câu chuyện về người mẹ và nghề làm nón lá thủ công ở làng nghề Quảng Nạp, Thái Bình — khởi nguồn của NẾP NÓN.",
  path: "/story",
  image: images.storyHero.src,
});

export default function StoryPage() {
  const [ch1, ch2, ch3] = motherStory;
  return (
    <article>
      {/* 1. Hero */}
      <header className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-forest text-ivory">
        <BrandImage image={images.storyHero} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/55 to-transparent" />
        <div className="container-page pt-32 pb-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Câu chuyện của mẹ" }]} />
          <p className="eyebrow mt-10 text-bamboo">{pages.story.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl type-display text-ivory">
            {pages.story.title} <em className="font-medium text-bamboo">{pages.story.titleAccent}</em>
          </h1>
        </div>
      </header>

      {/* 2. Chương 1 — câu chuyện của mẹ */}
      <section className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <p className="eyebrow">{ch1.eyebrow}</p>
          <h2 className="mt-3 type-section text-forest">{ch1.title}</h2>
          {ch1.draft && <div className="mt-4"><SampleBadge>Nội dung mẫu — chờ gia đình viết</SampleBadge></div>}
        </div>
        <div className="prose-story text-lg leading-relaxed text-text/85 lg:col-span-7 lg:col-start-6">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-wood">
            {ch1.body[0]}
          </p>
          {ch1.body.slice(1).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <BrandImage image={images.storyHands} kind="landscape" caption sizes="100vw" frameClassName="container-page" />

      {/* 3. Quảng Nạp */}
      <section className="mt-20 bg-forest py-20 text-ivory lg:mt-28 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <BrandImage image={images.storyVillage} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-bamboo">{ch2.eyebrow}</p>
            <h2 className="mt-3 type-section text-ivory">{ch2.title}</h2>
            <div className="prose-story mt-6 text-ivory/80">
              {ch2.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {ch2.draft && <div className="mt-5"><SampleBadge tone="dark">Cần thông tin đã kiểm chứng</SampleBadge></div>}
          </div>
        </div>
      </section>

      {/* 4. Giá trị nghề thủ công */}
      <section className="container-page py-20 text-center lg:py-28">
        <p className="eyebrow">{ch3.eyebrow}</p>
        <h2 className="mx-auto mt-3 max-w-3xl type-section text-forest">{ch3.title}</h2>
        <div className="prose-story mx-auto mt-8 max-w-2xl text-lg text-text/85">
          {ch3.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-10 font-script text-3xl text-wood">{siteConfig.tagline}</p>
      </section>

      {/* 5. Ảnh xưởng */}
      <section aria-labelledby="workshop-title" className="container-page">
        <h2 id="workshop-title" className="sr-only">
          Hình ảnh từ xưởng nón
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {images.workshop.map((img, i) => (
            <li key={img.src} className={`relative aspect-[4/5] overflow-hidden ${i === 2 ? "col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-[4/5]" : ""} ${i === 1 ? "lg:translate-y-12" : ""}`}>
              <BrandImage image={img} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Quy trình */}
      <section className="mt-20 bg-bamboo/45 py-20 lg:mt-32 lg:py-28" aria-labelledby="story-process">
        <div className="container-page">
          <p className="eyebrow">Quy trình</p>
          <h2 id="story-process" className="mt-3 max-w-2xl type-section text-forest">
            {pages.story.processTitle}
          </h2>
          <div className="mt-14">
            <CraftSteps />
          </div>
        </div>
      </section>

      {/* 7. Triết lý */}
      <section className="container-page py-20 lg:py-28" aria-labelledby="philosophy">
        <h2 id="philosophy" className="text-center type-section text-forest">
          {pages.story.philosophyTitle}
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {brandPhilosophy.map((p) => (
            <li key={p.title} className="border-t border-wood/50 pt-6">
              <h3 className="font-serif text-5xl text-wood italic">{p.title}</h3>
              <p className="mt-4 text-text/80">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta />
    </article>
  );
}
