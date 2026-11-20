import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/brand/BrandStory";
import { CraftProcess } from "@/components/home/CraftProcess";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CultureTeaser } from "@/components/home/CultureTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/storytelling/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <CraftProcess />
      <WhyChoose />
      <CultureTeaser />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
