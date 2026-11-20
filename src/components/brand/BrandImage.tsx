import Image from "next/image";
import type { ImageAsset } from "@/types/product";

/**
 * ẢNH THƯƠNG HIỆU
 * ------------------------------------------------------------
 * Hai cách dùng:
 * 1. <BrandImage image={…} fill className="object-cover" />  — ảnh trần, tự đặt khung.
 * 2. <BrandImage image={…} kind="portrait" caption />        — khung chuẩn theo guideline:
 *      portrait  — chân dung mẹ / người thợ          (4:5)
 *      product   — ảnh sản phẩm thủ công             (4:5)
 *      process   — công đoạn làm nón                 (4:5)
 *      landscape — làng quê, cánh đồng Việt Nam      (16:9)
 *      lifestyle — ảnh đời sống, người đội nón       (3:2)
 * Ảnh minh họa (placeholder) tự gắn nhãn "Ảnh minh họa" — không bao giờ trình bày như ảnh thật.
 * Ảnh thật được tối ưu tự động (AVIF/WebP, lazy-load); ảnh .svg minh họa hiển thị trực tiếp.
 */
export type BrandImageKind = "portrait" | "product" | "process" | "landscape" | "lifestyle";

const ratio: Record<BrandImageKind, string> = {
  portrait: "aspect-[4/5]",
  product: "aspect-[4/5]",
  process: "aspect-[4/5]",
  landscape: "aspect-[16/9]",
  lifestyle: "aspect-[3/2]",
};

interface BrandImageProps {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** fill = phủ kín khung cha (khung cha cần position: relative + kích thước) */
  fill?: boolean;
  /** Dùng khung chuẩn theo loại ảnh */
  kind?: BrandImageKind;
  /** Hiện chú thích (alt) dưới ảnh — kiểu ảnh tư liệu */
  caption?: boolean;
  frameClassName?: string;
}

function RawImage({ image, className, sizes = "100vw", priority, fill }: BrandImageProps) {
  const common = {
    src: image.src,
    alt: image.alt,
    sizes,
    priority,
    unoptimized: image.src.endsWith(".svg"),
    className,
  };
  if (fill) return <Image {...common} alt={image.alt} fill />;
  return <Image {...common} alt={image.alt} width={image.width} height={image.height} />;
}

export function BrandImage(props: BrandImageProps) {
  const { kind, caption, frameClassName = "", image } = props;
  if (!kind) return <RawImage {...props} />;
  return (
    <figure className={frameClassName}>
      <div className={`relative overflow-hidden bg-bamboo/50 ${ratio[kind]}`}>
        <RawImage {...props} fill className={`object-cover ${props.className ?? ""}`} />
      </div>
      {caption && (
        <figcaption className="type-caption mt-3 flex flex-wrap items-center gap-2 text-muted">
          {image.alt}
          {image.placeholder && <span className="text-wood">· Ảnh minh họa</span>}
        </figcaption>
      )}
    </figure>
  );
}
