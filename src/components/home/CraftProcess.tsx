import { CraftSteps } from "@/components/storytelling/CraftSteps";
import { BrandSectionHeading } from "@/components/brand/BrandSectionHeading";
import { ButtonLink } from "@/components/common/Button";
import { pages } from "@/data/pages";

export function CraftProcess() {
  return (
    <section className="bg-bamboo/45 py-20 lg:py-28" aria-labelledby="craft-title">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div id="craft-title">
            <BrandSectionHeading eyebrow={pages.home.craft.eyebrow} title={pages.home.craft.title} />
          </div>
          <p className="max-w-md text-muted lg:justify-self-end">
            {pages.home.craft.intro}
          </p>
        </div>
        <div className="mt-14">
          <CraftSteps />
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/craftsmanship" variant="secondary">
            {pages.home.craft.button}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
