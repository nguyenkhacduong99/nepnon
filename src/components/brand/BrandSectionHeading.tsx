import type { ReactNode } from "react";

export function BrandSectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  tone = "dark",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  const center = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${center}`}>
      {eyebrow && <p className={`eyebrow ${tone === "light" ? "text-bamboo" : ""}`}>{eyebrow}</p>}
      <Tag className={`type-section ${tone === "light" ? "text-ivory" : "text-forest"}`}>{title}</Tag>
      {intro && <p className={`text-base sm:text-lg ${tone === "light" ? "text-ivory/80" : "text-muted"}`}>{intro}</p>}
      {children}
    </div>
  );
}
