import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-grass",
  secondary: "border border-forest text-forest hover:bg-forest hover:text-ivory",
  ghost: "text-forest underline decoration-wood/50 underline-offset-[6px] hover:decoration-forest px-0",
  light: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-forest",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" {...props} className={buttonClass(variant, className)} />;
}
