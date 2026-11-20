import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/content";
import { images } from "@/data/images";
import { BrandImage } from "@/components/brand/BrandImage";
import { ButtonLink } from "@/components/common/Button";
import { pages } from "@/data/pages";

export function CultureTeaser() {
  return (
    <section className="border-t border-line bg-white/40 py-20 lg:py-28" aria-labelledby="culture-title">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
          <BrandImage image={images.cultureHero} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow">{pages.home.culture.eyebrow}</p>
          <h2 id="culture-title" className="mt-4 type-section text-forest">
            {pages.home.culture.title}
          </h2>
          <p className="mt-5 text-muted">
            {pages.home.culture.text}
          </p>
          <ul className="mt-8 border-t border-line">
            {articles.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/culture/${a.slug}`} className="group flex items-start justify-between gap-4 py-5">
                  <span>
                    <span className="block font-serif text-xl text-forest group-hover:text-wood">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted">{a.readingTime}</span>
                  </span>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-wood transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/culture" variant="ghost" className="mt-8 self-start">
            {pages.home.culture.button}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
