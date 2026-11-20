import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { images } from "@/data/images";
import { PageHeader } from "@/components/common/PageHeader";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BrandImage } from "@/components/brand/BrandImage";
import { BrandSectionHeading } from "@/components/brand/BrandSectionHeading";
import { DownloadSvg } from "@/components/brand/DownloadSvg";
import { packagingItems } from "@/components/brand/Packaging";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Nhận diện thương hiệu",
  description: "Bộ nhận diện thương hiệu NẾP NÓN: logo, màu sắc, chữ, hình ảnh và bao bì.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/brand" },
};

const colors = [
  { token: "forest", hex: "#263D25", name: "Xanh rừng", share: 25, dark: true },
  { token: "grass", hex: "#405A35", name: "Xanh lá phụ", share: 7, dark: true },
  { token: "ivory", hex: "#F8F4EA", name: "Trắng ngà", share: 50, dark: false },
  { token: "bamboo", hex: "#E8D9BD", name: "Be tre", share: 15, dark: false },
  { token: "wood", hex: "#8B6846", name: "Nâu gỗ", share: 3, dark: true },
  { token: "text", hex: "#292820", name: "Chữ đậm", share: 0, dark: true },
  { token: "muted", hex: "#777367", name: "Chữ phụ", share: 0, dark: true },
  { token: "white", hex: "#FFFFFF", name: "Trắng", share: 0, dark: false },
];

const logoFiles = [
  ["horizontal", "Ngang (chính)"],
  ["stacked", "Xếp dọc"],
  ["icon", "Biểu tượng"],
] as const;

const personality = ["Thanh lịch", "Chân thật", "Ấm áp", "Truyền thống", "Đáng tin cậy", "Đương đại"];

const typeScale = [
  { cls: "type-display", label: "Hero · 72px (di động 40px)", sample: "Nón lá Việt Nam" },
  { cls: "type-section", label: "Tiêu đề mục · 42px (di động 30px)", sample: "Chiếc nón lá và tình yêu của mẹ" },
  { cls: "type-title", label: "Tiêu đề nhỏ · 24px", sample: "Tỉ mỉ trong từng công đoạn" },
  { cls: "type-product", label: "Tên sản phẩm · 20px", sample: "Nón lá truyền thống – Mộc" },
];

function Section({ id, eyebrow, title, intro, children, tint }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`py-16 lg:py-24 ${tint ? "bg-bamboo/40" : ""}`}>
      <div className="container-page">
        <BrandSectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function BrandPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brand guideline"
        title="Nhận diện thương hiệu NẾP NÓN"
        intro="Heritage Luxury × Vietnamese Craft Heritage — một thương hiệu nón lá thủ công cao cấp, bắt rễ từ nghề truyền thống và gia đình ở Thái Bình."
        crumbs={[{ label: "Nhận diện thương hiệu" }]}
      />

      <div className="container-page pb-6">
        <p className="font-script text-3xl text-wood">{siteConfig.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {personality.map((p) => (
            <li key={p} className="border border-line px-4 py-2 text-sm text-forest">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <Section id="logo" eyebrow="01 · Logo" title="Hệ thống logo" intro="Nón lá vẽ nét mảnh với các nan toả cân đối, kết hợp chữ NẾP NÓN (Lora, giãn chữ). Khoảng trống an toàn tối thiểu bằng 1/4 chiều cao biểu tượng.">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {logoFiles.map(([v, label]) => (
            <div key={v} className="contents">
              {(["color", "dark", "reverse"] as const).map((tone) => (
                <div key={tone} className={`flex flex-col justify-between gap-6 p-8 ${tone === "reverse" ? "bg-forest" : "bg-ivory"}`}>
                  <div className="flex h-28 items-center justify-center">
                    <BrandLogo variant={v} tone={tone} className={v === "horizontal" ? "h-12 w-auto" : v === "stacked" ? "h-28 w-auto" : "h-16 w-auto"} />
                  </div>
                  <div className={`type-caption flex items-center justify-between ${tone === "reverse" ? "text-ivory/70" : "text-muted"}`}>
                    <span>
                      {label} · {tone === "color" ? "Màu" : tone === "dark" ? "Đơn sắc tối" : "Đảo màu"}
                    </span>
                    <a
                      href={`/logo/nep-non-${v}${tone === "color" ? "" : tone === "dark" ? "-mono-dark" : "-reverse"}.svg`}
                      download
                      className={`underline underline-offset-4 ${tone === "reverse" ? "text-bamboo" : "text-forest"}`}
                    >
                      SVG
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <ul className="type-caption mt-6 grid gap-2 text-muted sm:grid-cols-2">
          <li>✓ Dùng file SVG vector — không dùng ảnh chụp màn hình hay logo raster do AI tạo.</li>
          <li>✓ Không kéo méo, xoay, đổi màu ngoài 3 phiên bản trên.</li>
          <li>✓ Kích thước tối thiểu: logo ngang cao 24px trên màn hình, 8mm khi in.</li>
          <li>✓ Trên ảnh hoặc nền tối, dùng bản đảo màu.</li>
        </ul>
      </Section>

      <Section id="color" eyebrow="02 · Màu sắc" title="Bảng màu chính thức" intro="Không thêm màu ngoài bảng này nếu không có lý do thiết kế rõ ràng." tint>
        <div className="flex h-16 overflow-hidden ring-1 ring-line" aria-label="Tỉ lệ sử dụng màu">
          {colors
            .filter((c) => c.share > 0)
            .map((c) => (
              <div key={c.token} style={{ width: `${c.share}%`, background: c.hex }} className={`type-caption flex items-end p-2 ${c.dark ? "text-ivory" : "text-text"}`}>
                {c.share}%
              </div>
            ))}
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {colors.map((c) => (
            <li key={c.token}>
              <div className="aspect-[4/3] ring-1 ring-line" style={{ background: c.hex }} />
              <p className="mt-3 font-medium text-forest">{c.name}</p>
              <p className="type-caption text-muted">
                --color-{c.token} · {c.hex}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" eyebrow="03 · Chữ" title="Typography" intro="Lora cho tiêu đề · Be Vietnam Pro cho nội dung · Dancing Script cho điểm nhấn cảm xúc (dùng tiết chế).">
        <div className="divide-y divide-line border-y border-line">
          {typeScale.map((t) => (
            <div key={t.cls} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
              <p className="type-caption text-muted">{t.label}</p>
              <p className={`${t.cls} text-forest`}>{t.sample}</p>
            </div>
          ))}
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
            <p className="type-caption text-muted">Nội dung · Be Vietnam Pro 16px</p>
            <p className="max-w-2xl">Từ đôi tay của mẹ, những chiếc nón lá mộc mạc mang đậm hồn Việt được làm nên bằng sự tỉ mỉ và tình yêu nghề. Ắ Ằ Ẳ Ẵ Ặ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự đ Đ</p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-baseline">
            <p className="type-caption text-muted">Điểm nhấn · Dancing Script</p>
            <p className="font-script text-3xl text-wood">Giữ nét đẹp Việt – Gửi trọn yêu thương</p>
          </div>
        </div>
      </Section>

      <Section id="ui" eyebrow="04 · Giao diện" title="Nút & thành phần" tint>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Nút chính · xanh rừng</Button>
          <Button variant="secondary">Nút phụ</Button>
          <Button variant="ghost">Liên kết văn bản</Button>
          <span className="bg-forest p-3">
            <Button variant="light">Trên nền tối</Button>
          </span>
        </div>
        <ul className="type-caption mt-8 grid gap-2 text-muted sm:grid-cols-2">
          <li>Góc vuông, viền mảnh, bóng đổ rất nhẹ — không bo tròn quá mức.</li>
          <li>Khoảng trắng rộng, nhịp section xen kẽ ivory / bamboo / forest.</li>
          <li>Chuyển động nhẹ (300–700ms, ease-soft), tôn trọng chế độ giảm chuyển động.</li>
          <li>Tương phản chữ đạt chuẩn WCAG AA trên nền ivory và forest.</li>
        </ul>
      </Section>

      <Section id="photo" eyebrow="05 · Hình ảnh" title="Hướng ảnh" intro="Ánh sáng tự nhiên, tông ivory ấm, bối cảnh thật, phong cách tư liệu. Ảnh hiện tại là minh họa — luôn được gắn nhãn, không trình bày như ảnh thật.">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          <BrandImage image={images.storyMother} kind="portrait" caption sizes="20vw" />
          <BrandImage image={images.workshop[2]} kind="product" caption sizes="20vw" />
          <BrandImage image={images.craft[2]} kind="process" caption sizes="20vw" />
          <BrandImage image={images.storyVillage} kind="landscape" caption sizes="40vw" frameClassName="col-span-2" />
        </div>
        <p className="type-caption mt-6 text-muted">
          Khung chuẩn: chân dung / sản phẩm / quy trình 4:5 · làng quê 16:9 · đời sống 3:2 — component <code>BrandImage kind=&quot;…&quot;</code>.
        </p>
      </Section>

      <Section id="packaging" eyebrow="06 · Bao bì" title="Hệ thống bao bì" intro="Xanh rừng, trắng ngà, be tre và chất liệu kraft. Bấm “Tải file SVG” để lấy file gửi nhà in (cài font Lora, Be Vietnam Pro, Dancing Script trước khi mở)." tint>
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {packagingItems.map(({ id, name, spec, Component }) => (
            <li key={id}>
              <DownloadSvg filename={`nep-non-${id}`}>
                <div className="flex aspect-square items-center justify-center bg-ivory p-6 ring-1 ring-line [&>svg]:max-h-full [&>svg]:max-w-full">
                  <Component />
                </div>
              </DownloadSvg>
              <h3 className="type-title mt-4 text-forest">{name}</h3>
              <p className="type-caption text-muted">{spec}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
