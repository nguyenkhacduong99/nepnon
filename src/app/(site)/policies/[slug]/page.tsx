import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPolicy, policies } from "@/data/policies";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/PageHeader";
import { SampleBadge } from "@/components/common/SampleNotice";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) return { title: "Không tìm thấy" };
  return pageMetadata({ title: p.title, description: p.summary, path: `/policies/${p.slug}` });
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();
  return (
    <>
      <PageHeader title={policy.title} intro={policy.summary} crumbs={[{ label: policy.title }]} />
      <section className="container-page max-w-3xl pb-24">
        <SampleBadge>Nội dung mẫu — chủ shop cần xem lại</SampleBadge>
        {policy.sections.map((s) => (
          <div key={s.heading} className="mt-10 border-t border-line pt-8">
            <h2 className="type-title text-forest">{s.heading}</h2>
            <div className="prose-story mt-4 text-text/85">
              {s.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
