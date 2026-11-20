import { craftSteps } from "@/data/content";
import { BrandImage } from "@/components/brand/BrandImage";

/** 4 công đoạn làm nón — dùng ở trang chủ (compact) và trang quy trình (detailed). */
export function CraftSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {craftSteps.map((s, i) => (
        <li key={s.step} className={`flex flex-col ${!detailed && i % 2 === 1 ? "lg:mt-16" : ""}`}>
          <BrandImage image={s.image} kind="process" sizes="(min-width:1024px) 24vw, (min-width:640px) 45vw, 92vw" />
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-4xl text-wood italic">{String(s.step).padStart(2, "0")}</span>
            <h3 className="type-title text-forest">{s.title}</h3>
          </div>
          <p className="mt-2 text-sm text-muted">{detailed ? s.detail : s.summary}</p>
        </li>
      ))}
    </ol>
  );
}
