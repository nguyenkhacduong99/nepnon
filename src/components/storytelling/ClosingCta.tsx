import { ButtonLink } from "@/components/common/Button";
import { ZaloButton } from "@/components/common/ZaloButton";
import { pages } from "@/data/pages";

export function ClosingCta({
  title = pages.closingCta.title,
  text = pages.closingCta.text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-grass py-20 text-ivory lg:py-24">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        className="pointer-events-none absolute -right-20 -bottom-10 w-[34rem] text-ivory/[0.07]"
        fill="none"
        stroke="currentColor"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx="200" cy="170" rx={16 * (i + 1)} ry={4.5 * (i + 1)} strokeWidth="1.2" />
        ))}
      </svg>
      <div className="container-page relative text-center">
        <h2 className="mx-auto max-w-3xl type-section text-ivory">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-ivory/80">{text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/products" className="bg-ivory !text-forest hover:!bg-bamboo">
            {pages.closingCta.button}
          </ButtonLink>
          <ZaloButton variant="light" label={pages.closingCta.zaloButton} />
        </div>
      </div>
    </section>
  );
}
