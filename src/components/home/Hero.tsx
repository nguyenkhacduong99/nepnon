import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/common/Button";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { pages } from "@/data/pages";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <BrandImage image={images.hero} fill priority sizes="100vw" className="object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/10 md:bg-gradient-to-r md:from-forest/95 md:via-forest/70 md:to-transparent" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-6.25rem)] flex-col justify-end pt-40 pb-14 md:min-h-[44rem] md:justify-center md:py-24">
        <div className="max-w-xl text-ivory">
          <p className="eyebrow flex items-center gap-3 text-bamboo">
            <span className="h-px w-8 bg-bamboo/70" aria-hidden="true" />
            {siteConfig.origin}
          </p>
          <h1 id="hero-title" className="mt-5 type-display">
            {pages.home.hero.title} <em className="font-medium text-bamboo">{pages.home.hero.titleAccent}</em>
          </h1>
          <p className="mt-4 font-script text-[1.7rem] text-bamboo sm:text-3xl">{pages.home.hero.subtitle}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/85 sm:text-lg">
            {pages.home.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products" className="bg-ivory !text-forest hover:!bg-bamboo">
              {pages.home.hero.primaryButton} <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/story" variant="light">
              {pages.home.hero.secondaryButton}
            </ButtonLink>
          </div>
        </div>
      </div>
      {images.hero.placeholder && (
        <div className="absolute right-4 bottom-4 hidden md:block">
          <SampleBadge tone="dark">Ảnh minh họa</SampleBadge>
        </div>
      )}
    </section>
  );
}
