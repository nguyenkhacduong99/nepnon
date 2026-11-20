// Sinh hệ thống logo NẾP NÓN dạng SVG vector (chữ đã chuyển thành nét — không phụ thuộc font).
// Chạy: node scripts/generate-logos.mjs
// Kết quả:
//   - public/logo/*.svg                         (file dùng cho in ấn, mạng xã hội, đối tác)
//   - src/components/brand/logo-geometry.ts     (dữ liệu hình dùng chung cho component BrandLogo)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = join(root, "node_modules", "@fontsource", "lora", "files");
const load = (f) => {
  const buf = readFileSync(join(fontDir, f));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const fonts = [load("lora-latin-600-normal.woff"), load("lora-vietnamese-600-normal.woff")];

const C = { forest: "#263D25", text: "#292820", ivory: "#F8F4EA", wood: "#8B6846" };

// ---------- Wordmark ----------
const WORD = "NẾP NÓN";
const SIZE = 100; // đơn vị em
const TRACKING = 0.11 * SIZE;

function glyphFor(ch) {
  for (const f of fonts) {
    const g = f.charToGlyph(ch);
    if (g && g.index > 0) return { f, g };
  }
  throw new Error(`Thiếu glyph cho ký tự "${ch}"`);
}

let x = 0;
const commands = [];
for (const ch of WORD) {
  const { f, g } = glyphFor(ch);
  const scale = SIZE / f.unitsPerEm;
  if (ch !== ' ') commands.push(...g.getPath(x, 0, SIZE).commands);
  x += g.advanceWidth * scale + (ch === ' ' ? TRACKING * 0.4 : TRACKING);
}
const full = new opentype.Path();
full.commands = commands;
const bb = full.getBoundingBox();
const f2 = (n) => +n.toFixed(2);
const d = commands
  .map((c) => {
    const X = (v) => f2(v - bb.x1), Y = (v) => f2(v - bb.y1);
    if (c.type === 'M' || c.type === 'L') return c.type + X(c.x) + ' ' + Y(c.y);
    if (c.type === 'Q') return 'Q' + X(c.x1) + ' ' + Y(c.y1) + ' ' + X(c.x) + ' ' + Y(c.y);
    if (c.type === 'C') return 'C' + X(c.x1) + ' ' + Y(c.y1) + ' ' + X(c.x2) + ' ' + Y(c.y2) + ' ' + X(c.x) + ' ' + Y(c.y);
    return 'Z';
  })
  .join('');
const word = { d, width: f2(bb.x2 - bb.x1), height: f2(bb.y2 - bb.y1), baseline: f2(-bb.y1) };

// ---------- Icon: nón lá line-art ----------
// Hộp 64 × 48. Đỉnh nón (32,5), vành nón tâm (32,34) rx 27 ry 6.
const ICON_W = 64, ICON_H = 48, STROKE = 2;
const apex = [32, 5], cx = 32, cy = 34, rx = 27, ry = 6.5;
const pt = (deg) => [cx - Math.cos((deg * Math.PI) / 180) * rx, cy + Math.sin((deg * Math.PI) / 180) * ry];
const r2 = (n) => +n.toFixed(2);
const iconPaths = [
  // thân nón + vành trước
  `M${r2(cx - rx)} ${cy} L${apex[0]} ${apex[1]} L${r2(cx + rx)} ${cy} A${rx} ${ry} 0 0 1 ${r2(cx - rx)} ${cy}`,
  // các nan toả đều từ đỉnh
  ...[36, 72, 108, 144].map((d) => {
    const [px, py] = pt(d);
    return `M${apex[0]} ${apex[1]} L${r2(px)} ${r2(py)}`;
  }),
  // một vòng chằm giữa thân nón
  (() => {
    const t = 0.58;
    const y = apex[1] + (cy - apex[1]) * t;
    const r = rx * t, rr = ry * t;
    return `M${r2(cx - r)} ${r2(y)} A${r2(r)} ${r2(rr)} 0 0 0 ${r2(cx + r)} ${r2(y)}`;
  })(),
];
const icon = { width: ICON_W, height: ICON_H, stroke: STROKE, paths: iconPaths };

// ---------- Ghi dữ liệu TS ----------
const ts = `// TỰ SINH bởi scripts/generate-logos.mjs — không sửa tay.
// Chữ "NẾP NÓN" (Lora SemiBold, giãn chữ 0.11em) đã chuyển thành nét vector.
export const LOGO_ICON = ${JSON.stringify(icon, null, 2)} as const;

export const LOGO_WORDMARK = ${JSON.stringify(word, null, 2)} as const;
`;
writeFileSync(join(root, "src", "components", "brand", "logo-geometry.ts"), ts);

// ---------- Ghi file SVG ----------
const iconG = (color, scale, tx, ty) =>
  `<g transform="translate(${r2(tx)} ${r2(ty)}) scale(${r2(scale)})" fill="none" stroke="${color}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">${iconPaths
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g>`;
const wordG = (color, scale, tx, ty) =>
  `<g transform="translate(${r2(tx)} ${r2(ty)}) scale(${scale.toFixed(4)})" fill="${color}"><path d="${word.d}"/></g>`;

function svg(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r2(w)} ${r2(h)}" width="${r2(w)}" height="${r2(h)}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
}

// Khoảng trống an toàn (clear space) = 1/4 chiều cao icon
const PAD = ICON_H / 4;

function horizontal(iconColor, wordColor) {
  const iconH = 48;
  const wordH = 30; // chiều cao chữ (kể cả dấu) so với icon 48
  const ws = wordH / word.height;
  const gap = 14;
  const w = PAD * 2 + ICON_W + gap + word.width * ws;
  const h = PAD * 2 + iconH;
  // căn chân chữ với vành nón
  const wordTop = PAD + 34 + 3 - word.baseline * ws;
  return svg(w, h, iconG(iconColor, 1, PAD, PAD) + wordG(wordColor, ws, PAD + ICON_W + gap, wordTop), "NẾP NÓN");
}
function stacked(iconColor, wordColor) {
  const iconScale = 1.6;
  const ws = 34 / word.height;
  const ww = word.width * ws;
  const w = PAD * 2 + Math.max(ICON_W * iconScale, ww);
  const gap = 10;
  const h = PAD * 2 + ICON_H * iconScale + gap + 34;
  return svg(
    w,
    h,
    iconG(iconColor, iconScale, (w - ICON_W * iconScale) / 2, PAD) + wordG(wordColor, ws, (w - ww) / 2, PAD + ICON_H * iconScale + gap),
    "NẾP NÓN",
  );
}
function iconOnly(color) {
  const s = ICON_W + PAD * 2;
  return svg(s, s, iconG(color, 1, PAD, (s - ICON_H) / 2), "NẾP NÓN");
}

const out = join(root, "public", "logo");
mkdirSync(out, { recursive: true });
const files = {
  "nep-non-horizontal.svg": horizontal(C.wood, C.forest),
  "nep-non-horizontal-mono-dark.svg": horizontal(C.text, C.text),
  "nep-non-horizontal-reverse.svg": horizontal(C.ivory, C.ivory),
  "nep-non-stacked.svg": stacked(C.wood, C.forest),
  "nep-non-stacked-mono-dark.svg": stacked(C.text, C.text),
  "nep-non-stacked-reverse.svg": stacked(C.ivory, C.ivory),
  "nep-non-icon.svg": iconOnly(C.forest),
  "nep-non-icon-mono-dark.svg": iconOnly(C.text),
  "nep-non-icon-reverse.svg": iconOnly(C.ivory),
};
for (const [name, content] of Object.entries(files)) writeFileSync(join(out, name), content);

// Favicon
writeFileSync(
  join(root, "src", "app", "icon.svg"),
  svg(64, 64, `<rect width="64" height="64" fill="${C.forest}"/>` + iconG(C.ivory, 0.8, 6.4, 12.8), "NẾP NÓN"),
);
console.log(`Đã tạo ${Object.keys(files).length} logo + favicon. Wordmark ${word.width}×${word.height}`);
