import { LOGO_ICON, LOGO_WORDMARK } from "./logo-geometry";

/**
 * HỆ THỐNG LOGO NẾP NÓN
 * - variant: "horizontal" (chính) · "stacked" (xếp dọc) · "icon" (chỉ biểu tượng)
 * - tone:    "color" (nón màu gỗ + chữ xanh rừng) · "dark" (đơn sắc tối) · "reverse" (trắng ngà trên nền tối)
 * Kích thước điều khiển bằng chiều cao (className, ví dụ "h-9"). Tỉ lệ luôn được giữ nguyên.
 * File SVG tương ứng cho in ấn: /public/logo/*.svg (sinh bởi scripts/generate-logos.mjs).
 */
type Variant = "horizontal" | "stacked" | "icon";
type Tone = "color" | "dark" | "reverse";

const palette: Record<Tone, { icon: string; word: string }> = {
  color: { icon: "var(--color-wood)", word: "var(--color-forest)" },
  dark: { icon: "var(--color-text)", word: "var(--color-text)" },
  reverse: { icon: "var(--color-ivory)", word: "var(--color-ivory)" },
};

const W = LOGO_WORDMARK;
const I = LOGO_ICON;

function Icon({ color, x = 0, y = 0, scale = 1 }: { color: string; x?: number; y?: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke={color}
      strokeWidth={I.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {I.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

function Word({ color, x, y, height }: { color: string; x: number; y: number; height: number }) {
  const s = height / W.height;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d={W.d} />
    </g>
  );
}

export function BrandLogo({
  variant = "horizontal",
  tone = "color",
  className = "h-9 w-auto",
  title = "NẾP NÓN",
  x,
  y,
  width,
  height,
}: {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  title?: string;
  /** Dùng khi lồng logo vào một SVG khác (bao bì, nhãn…) */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const c = palette[tone];
  const box = { x, y, width, height };

  if (variant === "icon") {
    return (
      <svg viewBox={`0 0 ${I.width} ${I.height}`} {...box} className={className} role="img" aria-label={title}>
        <Icon color={c.icon} />
      </svg>
    );
  }

  if (variant === "stacked") {
    const iconScale = 1.6;
    const wordH = 34;
    const ww = (W.width * wordH) / W.height;
    const vbW = Math.max(I.width * iconScale, ww);
    const gap = 10;
    const vbH = I.height * iconScale + gap + wordH;
    return (
      <svg viewBox={`0 0 ${vbW} ${vbH}`} {...box} className={className} role="img" aria-label={title}>
        <Icon color={c.icon} x={(vbW - I.width * iconScale) / 2} scale={iconScale} />
        <Word color={c.word} x={(vbW - ww) / 2} y={I.height * iconScale + gap} height={wordH} />
      </svg>
    );
  }

  // horizontal — chân chữ căn theo vành nón
  const wordH = 30;
  const s = wordH / W.height;
  const gap = 14;
  const vbW = I.width + gap + W.width * s;
  const wordTop = 37 - W.baseline * s;
  return (
    <svg viewBox={`0 0 ${vbW} ${I.height}`} {...box} className={className} role="img" aria-label={title}>
      <Icon color={c.icon} />
      <Word color={c.word} x={I.width + gap} y={wordTop} height={wordH} />
    </svg>
  );
}
