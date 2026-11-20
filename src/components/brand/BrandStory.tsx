import { homeStory } from "@/data/content";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/common/Button";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { pages } from "@/data/pages";

export function BrandStory() {
  return (
    <section className="bg-forest text-ivory" aria-labelledby="story-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[52rem]">
          <BrandImage image={images.storyMother} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <figure className="absolute inset-x-5 bottom-5 bg-forest/85 p-5 backdrop-blur-sm sm:inset-x-auto sm:right-8 sm:bottom-8 sm:max-w-xs">
            <blockquote className="font-script text-2xl leading-snug text-bamboo">“{pages.home.story.quote}”</blockquote>
            <figcaption className="mt-2 text-xs tracking-wide text-ivory/60">{pages.home.story.quoteAuthor}</figcaption>
          </figure>
        </div>

        <div className="px-5 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
          <p className="eyebrow text-bamboo">{pages.home.story.eyebrow}</p>
          <h2 id="story-title" className="mt-4 type-section text-ivory">
            {pages.home.story.title} <em className="font-medium text-bamboo">{pages.home.story.titleAccent}</em>
          </h2>

          <ol className="mt-12 space-y-10">
            {homeStory.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ivory/15 pt-6">
                <span className="font-serif text-3xl text-bamboo/70 italic">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] text-bamboo/80 uppercase">{b.eyebrow}</p>
                  <h3 className="mt-1.5 type-title text-ivory">{b.title}</h3>
                  {b.body.map((p) => (
                    <p key={p} className="mt-3 text-[0.95rem] leading-relaxed text-ivory/75">
                      {p}
                    </p>
                  ))}
                  {b.draft && <div className="mt-3"><SampleBadge tone="dark">Cần gia đình bổ sung</SampleBadge></div>}
                </div>
              </li>
            ))}
          </ol>

          <ButtonLink href="/story" variant="light" className="mt-12">
            {pages.home.story.button}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
