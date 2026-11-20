import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/common/PageHeader";
import { BrandImage } from "@/components/brand/BrandImage";
import { SampleBadge } from "@/components/common/SampleNotice";
import { ClosingCta } from "@/components/storytelling/ClosingCta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Không tìm thấy bài viết" };
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/culture/${a.slug}`, image: a.image.src });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <article>
        <header className="container-page max-w-4xl pt-8 pb-10 lg:pt-12">
          <Breadcrumbs items={[{ href: "/culture", label: "Góc văn hóa" }, { label: article.title }]} />
          <p className="mt-10 flex items-center gap-3 text-sm text-muted">
            {article.readingTime}
            {article.draft && <SampleBadge>Bản nháp — cần kiểm chứng</SampleBadge>}
          </p>
          <h1 className="mt-3 type-page text-forest">{article.title}</h1>
          <p className="mt-5 text-xl text-muted">{article.excerpt}</p>
        </header>
        <div className="container-page">
          <div className="relative aspect-[16/9] overflow-hidden">
            <BrandImage image={article.image} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div className="prose-story container-page max-w-3xl py-16 text-lg leading-relaxed text-text/85">
          {article.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
      <aside className="container-page max-w-3xl border-t border-line pt-10 pb-20" aria-labelledby="more-articles">
        <h2 id="more-articles" className="type-title text-forest">
          Đọc thêm
        </h2>
        <ul className="mt-4">
          {others.map((a) => (
            <li key={a.slug} className="border-b border-line">
              <Link href={`/culture/${a.slug}`} className="block py-4 font-serif text-xl text-forest hover:text-wood">
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <ClosingCta />
    </>
  );
}
