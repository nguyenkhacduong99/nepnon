import { testimonials } from "@/data/testimonials";
import { SampleBadge } from "@/components/common/SampleNotice";
import { siteConfig } from "@/data/site-config";
import { pages } from "@/data/pages";

export function Testimonials() {
  // Ẩn đánh giá minh họa khi tắt chế độ nội dung mẫu — tránh hiển thị đánh giá giả
  const items = siteConfig.showSampleNotices ? testimonials : testimonials.filter((t) => !t.demo);
  if (items.length === 0) return null;
  const hasDemo = items.some((t) => t.demo);

  return (
    <section className="bg-bamboo/45 py-20 lg:py-24" aria-labelledby="testimonials-title">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{pages.home.testimonials.eyebrow}</p>
            <h2 id="testimonials-title" className="mt-4 type-section text-forest">
              {pages.home.testimonials.title}
            </h2>
          </div>
          {hasDemo && <SampleBadge>Nội dung minh họa — chưa phải đánh giá thật</SampleBadge>}
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col border-l-2 border-wood/50 bg-ivory px-7 py-8">
                <span aria-hidden="true" className="font-serif text-6xl leading-none text-wood/40">
                  “
                </span>
                <blockquote className="mt-1 flex-1 font-serif text-xl leading-snug text-text italic">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-forest">{t.author}</span>
                  <span className="block text-muted">{t.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
