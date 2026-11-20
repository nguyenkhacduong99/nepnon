import { Hand, MessageCircleHeart, Package, Scissors } from "lucide-react";
import { trustPoints } from "@/data/content";
import { pages } from "@/data/pages";

const icons = { hand: Hand, scissors: Scissors, package: Package, message: MessageCircleHeart } as const;

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="why-title">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{pages.home.why.eyebrow}</p>
          <h2 id="why-title" className="mt-4 type-section text-forest">
            {pages.home.why.title}
          </h2>
        </div>
        <ul className="mt-14 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t, i) => {
            const Icon = icons[t.icon];
            return (
              <li
                key={t.title}
                className={`flex flex-col items-center px-6 py-10 text-center ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${
                  i % 2 === 1 ? "sm:border-l" : ""
                } ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""} border-line`}
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-wood/40 text-wood">
                  <Icon className="size-6" strokeWidth={1.3} aria-hidden="true" />
                </span>
                <h3 className="mt-5 type-title text-forest">{t.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm text-muted">{t.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
