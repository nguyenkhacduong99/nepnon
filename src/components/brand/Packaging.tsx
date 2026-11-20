import type { ReactNode } from "react";
import { siteConfig } from "@/data/site-config";
import { BrandLogo } from "./BrandLogo";
import { LOGO_ICON } from "./logo-geometry";

/**
 * HỆ THỐNG BAO BÌ NẾP NÓN — mockup + file SVG tái sử dụng
 * Màu: forest, ivory, bamboo, kraft (pha từ wood + bamboo).
 * Chữ trong SVG dùng font Lora / Be Vietnam Pro / Dancing Script của website;
 * khi in ấn, mở file SVG bằng Illustrator/Figma và cài 3 font này (Google Fonts).
 */
const F = {
  serif: "var(--font-lora), Lora, Georgia, serif",
  sans: "var(--font-be-vietnam), 'Be Vietnam Pro', Arial, sans-serif",
  script: "var(--font-dancing), 'Dancing Script', cursive",
};
const K = {
  forest: "#263D25",
  grass: "#405A35",
  ivory: "#F8F4EA",
  bamboo: "#E8D9BD",
  wood: "#8B6846",
  text: "#292820",
  muted: "#777367",
  kraft: "#B89C76",
};

function KraftDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-fiber`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.25" numOctaves="2" seed="7" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.16 0" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  );
}

function Kraft({ id, children }: { id: string; children: ReactNode }) {
  return (
    <g>
      {children}
      <g filter={`url(#${id}-fiber)`}>{children}</g>
    </g>
  );
}

function IconMark({ x, y, scale, color }: { x: number; y: number; scale: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeWidth={LOGO_ICON.stroke} strokeLinecap="round" strokeLinejoin="round">
      {LOGO_ICON.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

/* 1. Túi giấy kraft */
export function KraftBag() {
  return (
    <svg viewBox="0 0 320 400" role="img" aria-label="Mockup túi giấy kraft NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <KraftDefs id="bag" />
      <path d="M118 92 C118 40 202 40 202 92" fill="none" stroke={K.forest} strokeWidth="5" strokeLinecap="round" />
      <Kraft id="bag">
        <path d="M60 90 H260 L272 380 H48 Z" fill={K.kraft} />
      </Kraft>
      <path d="M60 90 H260 L262 112 H58 Z" fill="#000" opacity="0.06" />
      <circle cx="118" cy="104" r="4" fill={K.text} opacity="0.5" />
      <circle cx="202" cy="104" r="4" fill={K.text} opacity="0.5" />
      <BrandLogo variant="stacked" tone="color" x={95} y={170} width={130} height={110} className="" />
      <text x="160" y="320" textAnchor="middle" fontFamily={F.script} fontSize="15" fill={K.forest}>
        Giữ nét đẹp Việt – Gửi trọn yêu thương
      </text>
      <rect x="48" y="368" width="224" height="12" fill={K.forest} />
    </svg>
  );
}

/* 2. Hộp đựng nón (hộp tròn dẹt) */
export function HatBox() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Mockup hộp đựng nón lá NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <KraftDefs id="box" />
      <ellipse cx="200" cy="268" rx="178" ry="34" fill={K.text} opacity="0.12" />
      <Kraft id="box">
        <path d="M24 170 V236 A176 44 0 0 0 376 236 V170 Z" fill={K.kraft} />
      </Kraft>
      <path d="M24 196 A176 44 0 0 0 376 196 V212 A176 44 0 0 1 24 212 Z" fill={K.forest} />
      <ellipse cx="200" cy="170" rx="176" ry="44" fill={K.forest} />
      <ellipse cx="200" cy="170" rx="158" ry="38" fill="none" stroke={K.bamboo} strokeOpacity="0.4" />
      <g transform="translate(200 170) scale(1 0.45)">
        <BrandLogo variant="stacked" tone="reverse" x={-90} y={-72} width={180} height={140} className="" />
      </g>
    </svg>
  );
}

/* 3. Nhãn treo sản phẩm (hang tag) 50 × 90 mm */
export function ProductLabel() {
  return (
    <svg viewBox="0 0 250 450" role="img" aria-label="Nhãn treo sản phẩm NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40 L60 10 H190 L230 40 V440 H20 Z" fill={K.ivory} stroke={K.bamboo} strokeWidth="2" />
      <circle cx="125" cy="40" r="9" fill="none" stroke={K.wood} strokeWidth="2" />
      <rect x="20" y="70" width="210" height="120" fill={K.forest} />
      <BrandLogo variant="stacked" tone="reverse" x={60} y={86} width={130} height={90} className="" />
      <text x="125" y="232" textAnchor="middle" fontFamily={F.serif} fontSize="19" fontWeight="500" fill={K.forest}>
        Nón lá thủ công
      </text>
      <text x="125" y="256" textAnchor="middle" fontFamily={F.sans} fontSize="10" letterSpacing="2" fill={K.wood}>
        QUẢNG NẠP · THÁI BÌNH
      </text>
      <line x1="45" y1="280" x2="205" y2="280" stroke={K.bamboo} />
      {[
        ["Mẫu", 310],
        ["Người làm", 345],
        ["Ngày hoàn thiện", 380],
      ].map(([label, y]) => (
        <g key={label}>
          <text x="45" y={Number(y)} fontFamily={F.sans} fontSize="10" fill={K.muted}>
            {label}
          </text>
          <line x1="45" y1={Number(y) + 10} x2="205" y2={Number(y) + 10} stroke={K.wood} strokeOpacity="0.5" strokeDasharray="2 3" />
        </g>
      ))}
      <text x="125" y="420" textAnchor="middle" fontFamily={F.script} fontSize="15" fill={K.wood}>
        Làm bằng tay, gửi bằng thương
      </text>
    </svg>
  );
}

/* 4. Thiệp cảm ơn A6 (148 × 105 mm) */
export function ThankYouCard() {
  return (
    <svg viewBox="0 0 592 420" role="img" aria-label="Thiệp cảm ơn NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <rect width="592" height="420" fill={K.ivory} />
      <rect x="16" y="16" width="560" height="388" fill="none" stroke={K.bamboo} strokeWidth="2" />
      <IconMark x={272} y={44} scale={0.75} color={K.wood} />
      <text x="296" y="140" textAnchor="middle" fontFamily={F.serif} fontSize="40" fontWeight="500" fill={K.forest}>
        Cảm ơn bạn
      </text>
      <text x="296" y="182" textAnchor="middle" fontFamily={F.script} fontSize="24" fill={K.wood}>
        đã mang một nét đẹp Việt về nhà
      </text>
      {[
        "Chiếc nón này được làm hoàn toàn bằng tay tại làng nghề Quảng Nạp.",
        "Mỗi chiếc có màu lá, đường khâu riêng — đó là dấu tay của người làm.",
        "Mong chiếc nón sẽ đồng hành cùng bạn thật lâu.",
      ].map((t, i) => (
        <text key={t} x="296" y={238 + i * 24} textAnchor="middle" fontFamily={F.sans} fontSize="14" fill={K.text}>
          {t}
        </text>
      ))}
      <text x="296" y="344" textAnchor="middle" fontFamily={F.script} fontSize="22" fill={K.forest}>
        — Gia đình {siteConfig.brandName}
      </text>
      <rect x="16" y="380" width="560" height="24" fill={K.forest} />
    </svg>
  );
}

/* 5. Thẻ QR "câu chuyện của mẹ" */
export function StoryQrCard() {
  return (
    <svg viewBox="0 0 360 520" role="img" aria-label="Thẻ QR câu chuyện NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="520" fill={K.forest} />
      <BrandLogo variant="horizontal" tone="reverse" x={92} y={36} width={176} height={40} className="" />
      <text x="180" y="132" textAnchor="middle" fontFamily={F.serif} fontSize="26" fontWeight="500" fill={K.ivory}>
        Nghe câu chuyện
      </text>
      <text x="180" y="164" textAnchor="middle" fontFamily={F.serif} fontSize="26" fontStyle="italic" fill={K.bamboo}>
        của chiếc nón này
      </text>
      <rect x="95" y="196" width="170" height="170" fill={K.ivory} />
      <rect x="111" y="212" width="138" height="138" fill="none" stroke={K.muted} strokeDasharray="5 5" />
      <text x="180" y="276" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill={K.muted}>
        Vị trí mã QR
      </text>
      <text x="180" y="294" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill={K.muted}>
        (tạo khi có tên miền chính thức)
      </text>
      <text x="180" y="404" textAnchor="middle" fontFamily={F.sans} fontSize="13" fill={K.ivory} opacity="0.85">
        Quét mã để xem mẹ làm nón như thế nào
      </text>
      <text x="180" y="424" textAnchor="middle" fontFamily={F.sans} fontSize="13" fill={K.ivory} opacity="0.85">
        và câu chuyện của làng nghề Quảng Nạp.
      </text>
      <text x="180" y="482" textAnchor="middle" fontFamily={F.script} fontSize="19" fill={K.bamboo}>
        Giữ nét đẹp Việt – Gửi trọn yêu thương
      </text>
    </svg>
  );
}

/* 6. Hộp quà tặng */
export function GiftPackaging() {
  return (
    <svg viewBox="0 0 400 340" role="img" aria-label="Mockup hộp quà NẾP NÓN" xmlns="http://www.w3.org/2000/svg">
      <KraftDefs id="gift" />
      <ellipse cx="200" cy="312" rx="170" ry="16" fill={K.text} opacity="0.12" />
      <Kraft id="gift">
        <path d="M40 140 L200 100 L360 140 L200 180 Z" fill="#C7AE89" />
        <path d="M40 140 L200 180 V310 L40 270 Z" fill={K.kraft} />
        <path d="M360 140 L200 180 V310 L360 270 Z" fill="#A88B66" />
      </Kraft>
      {/* ruy băng */}
      <path d="M112 118 L272 162 L288 158 L128 114 Z" fill={K.forest} />
      <path d="M272 162 V292 L288 288 V158 Z" fill={K.forest} />
      <path d="M272 162 L112 118" stroke={K.grass} />
      <path d="M200 140 c-30 -40 -70 -20 -40 2 M200 140 c30 -40 70 -20 40 2" fill="none" stroke={K.forest} strokeWidth="7" strokeLinecap="round" />
      {/* thẻ bamboo */}
      <g transform="translate(70 196) rotate(-8)">
        <rect width="96" height="58" fill={K.bamboo} />
        <IconMark x={30} y={6} scale={0.55} color={K.forest} />
        <text x="48" y="48" textAnchor="middle" fontFamily={F.serif} fontSize="11" fontWeight="600" letterSpacing="1.5" fill={K.forest}>
          NẾP NÓN
        </text>
      </g>
    </svg>
  );
}

export const packagingItems = [
  { id: "kraft-bag", name: "Túi giấy kraft", spec: "Kraft nâu, quai dây xanh rừng", Component: KraftBag },
  { id: "hat-box", name: "Hộp đựng nón", spec: "Hộp tròn dẹt, nắp xanh rừng, thân kraft", Component: HatBox },
  { id: "product-label", name: "Nhãn treo sản phẩm", spec: "50 × 90 mm, giấy ivory", Component: ProductLabel },
  { id: "thank-you-card", name: "Thiệp cảm ơn", spec: "A6 — 148 × 105 mm", Component: ThankYouCard },
  { id: "story-qr-card", name: "Thẻ QR câu chuyện", spec: "90 × 130 mm, nền xanh rừng", Component: StoryQrCard },
  { id: "gift-box", name: "Hộp quà tặng", spec: "Kraft, ruy băng xanh rừng, thẻ bamboo", Component: GiftPackaging },
] as const;
