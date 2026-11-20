import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Đường dẫn" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-forest">
            Trang chủ
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3" aria-hidden="true" />
            {c.href ? (
              <Link href={c.href} className="hover:text-forest">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ eyebrow, title, intro, crumbs }: { eyebrow?: string; title: string; intro?: string; crumbs: Crumb[] }) {
  return (
    <header className="container-page pt-8 pb-10 lg:pt-12 lg:pb-14">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 type-page text-forest">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </header>
  );
}
