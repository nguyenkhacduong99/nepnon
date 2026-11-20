// Sinh ảnh minh họa SVG (placeholder) cho toàn bộ website.
// Đây KHÔNG phải ảnh thật của sản phẩm hay của mẹ — chỉ là hình vẽ minh họa
// để giữ bố cục cho đến khi có ảnh chụp thật.
// Chạy: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const C = {
  forest: "#263D25",
  green: "#405A35",
  ivory: "#F8F4EA",
  beige: "#E8D9BD",
  brown: "#8B6846",
  text: "#292820",
  muted: "#777367",
};

function hat(cx, cy, w, h, { fill = "url(#leaf)", stroke = C.brown, rings = 14, ribs = 22, opacity = 1 } = {}) {
  const rx = w / 2;
  const ry = Math.max(6, h * 0.13);
  const apexY = cy - h;
  let s = `<g opacity="${opacity}">`;
  s += `<ellipse cx="${cx}" cy="${cy + ry * 1.4}" rx="${rx * 1.05}" ry="${ry * 0.9}" fill="${C.text}" opacity="0.12"/>`;
  s += `<path d="M${cx} ${apexY} L${cx + rx} ${cy} A${rx} ${ry} 0 0 1 ${cx - rx} ${cy} Z" fill="${fill}"/>`;
  for (let i = 1; i <= ribs; i++) {
    const t = i / (ribs + 1);
    const ang = Math.PI * t;
    const bx = cx - Math.cos(ang) * rx;
    const by = cy + Math.sin(ang) * ry;
    s += `<line x1="${cx}" y1="${apexY}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${stroke}" stroke-opacity="0.22" stroke-width="1"/>`;
  }
  for (let i = 1; i <= rings; i++) {
    const t = i / rings;
    const y = apexY + h * t;
    const r = rx * t;
    const rr = ry * t;
    s += `<path d="M${(cx - r).toFixed(1)} ${y.toFixed(1)} A${r.toFixed(1)} ${rr.toFixed(1)} 0 0 0 ${(cx + r).toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${stroke}" stroke-opacity="0.45" stroke-width="${i === rings ? 2 : 1.1}"/>`;
  }
  s += `</g>`;
  return s;
}

function defs() {
  return `<defs>
    <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F3E7CC"/><stop offset="0.55" stop-color="${C.beige}"/><stop offset="1" stop-color="#CDB68C"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#EFE6D2"/><stop offset="1" stop-color="${C.ivory}"/>
    </linearGradient>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3B5333"/><stop offset="1" stop-color="${C.forest}"/>
    </linearGradient>
    <pattern id="grain" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.6" fill="${C.text}" opacity="0.05"/>
    </pattern>
  </defs>`;
}

function label(w, h, hint, dark) {
  const fg = dark ? C.beige : C.muted;
  const fs = Math.max(11, Math.round(w / 70));
  return `<g font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" fill="${fg}">
    <text x="${fs * 1.6}" y="${h - fs * 2.6}" font-size="${fs}" letter-spacing="2" font-weight="600">ẢNH MINH HỌA</text>
    <text x="${fs * 1.6}" y="${h - fs * 1.2}" font-size="${fs * 0.85}" opacity="0.85">Thay bằng ảnh thật: ${hint}</text>
  </g>`;
}

const scenes = {
  hat(w, h) {
    return `<rect width="${w}" height="${h}" fill="${C.ivory}"/>
      <rect y="${h * 0.68}" width="${w}" height="${h * 0.32}" fill="${C.beige}" opacity="0.55"/>
      ${hat(w / 2, h * 0.66, w * 0.62, h * 0.36)}`;
  },
  hatDark(w, h) {
    return `<rect width="${w}" height="${h}" fill="${C.green}"/>
      <circle cx="${w / 2}" cy="${h * 0.48}" r="${Math.min(w, h) * 0.36}" fill="${C.forest}" opacity="0.6"/>
      ${hat(w / 2, h * 0.64, w * 0.6, h * 0.34)}`;
  },
  hatTop(w, h) {
    const r = Math.min(w, h) * 0.38;
    let rings = "";
    for (let i = 1; i <= 16; i++) rings += `<circle cx="${w / 2}" cy="${h / 2}" r="${(r * i) / 16}" fill="none" stroke="${C.brown}" stroke-opacity="0.4" stroke-width="${i === 16 ? 2.4 : 1}"/>`;
    let ribs = "";
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      ribs += `<line x1="${w / 2}" y1="${h / 2}" x2="${(w / 2 + Math.cos(a) * r).toFixed(1)}" y2="${(h / 2 + Math.sin(a) * r).toFixed(1)}" stroke="${C.brown}" stroke-opacity="0.15"/>`;
    }
    return `<rect width="${w}" height="${h}" fill="${C.beige}"/>
      <circle cx="${w / 2 + 10}" cy="${h / 2 + 14}" r="${r}" fill="${C.text}" opacity="0.1"/>
      <circle cx="${w / 2}" cy="${h / 2}" r="${r}" fill="url(#leaf)"/>${ribs}${rings}`;
  },
  field(w, h) {
    let rows = "";
    for (let i = 0; i < 14; i++) {
      const y = h * 0.62 + i * i * (h * 0.0022) + i * 6;
      rows += `<path d="M0 ${y.toFixed(1)} Q${w / 2} ${(y - 10).toFixed(1)} ${w} ${y.toFixed(1)}" stroke="${C.green}" stroke-opacity="${0.18 + i * 0.03}" stroke-width="${1 + i * 0.25}" fill="none"/>`;
    }
    return `<rect width="${w}" height="${h}" fill="url(#sky)"/>
      <circle cx="${w * 0.78}" cy="${h * 0.26}" r="${h * 0.08}" fill="#F1DDB4"/>
      <path d="M0 ${h * 0.52} Q${w * 0.2} ${h * 0.36} ${w * 0.42} ${h * 0.5} T${w} ${h * 0.44} V${h} H0Z" fill="#B9C3A0" opacity="0.7"/>
      <path d="M0 ${h * 0.6} Q${w * 0.3} ${h * 0.5} ${w * 0.6} ${h * 0.58} T${w} ${h * 0.55} V${h} H0Z" fill="#8C9C72"/>
      <rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#6E8257"/>
      ${rows}
      ${hat(w * 0.3, h * 0.86, w * 0.2, h * 0.16)}`;
  },
  leaves(w, h) {
    let s = `<rect width="${w}" height="${h}" fill="${C.ivory}"/>`;
    const n = Math.round(w / 34);
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) * (w / n);
      const tone = ["#E8D9BD", "#DCC9A3", "#EFE3C8", "#D2BC92", "#C9D0A8"][i % 5];
      const bend = ((i % 3) - 1) * 18;
      s += `<path d="M${x - 12} ${-10} Q${x + bend} ${h / 2} ${x - 8} ${h + 10} L${x + 10} ${h + 10} Q${x + bend + 18} ${h / 2} ${x + 12} ${-10} Z" fill="${tone}" stroke="${C.brown}" stroke-opacity="0.18"/>`;
      s += `<path d="M${x} ${-10} Q${x + bend + 9} ${h / 2} ${x + 1} ${h + 10}" stroke="${C.brown}" stroke-opacity="0.25" fill="none"/>`;
    }
    return s;
  },
  frame(w, h) {
    const r = Math.min(w, h) * 0.42;
    let s = `<rect width="${w}" height="${h}" fill="${C.forest}"/>`;
    for (let i = 1; i <= 12; i++) {
      s += `<ellipse cx="${w / 2}" cy="${h * 0.55}" rx="${(r * i) / 12}" ry="${(r * i) / 12 * 0.42}" fill="none" stroke="${C.beige}" stroke-opacity="${0.25 + i * 0.05}" stroke-width="${i === 12 ? 3 : 1.6}"/>`;
    }
    s += `<line x1="${w / 2}" y1="${h * 0.12}" x2="${w / 2}" y2="${h * 0.55}" stroke="${C.beige}" stroke-opacity="0.35"/>`;
    return s;
  },
  stitch(w, h) {
    let s = `<rect width="${w}" height="${h}" fill="${C.beige}"/>`;
    s += hat(w * 0.56, h * 1.08, w * 1.3, h * 0.9, { rings: 18, ribs: 40 });
    for (let i = 0; i < 9; i++) {
      const x = w * 0.2 + i * (w * 0.07);
      s += `<path d="M${x} ${h * 0.42 + i * 6} l8 18" stroke="${C.text}" stroke-opacity="0.45" stroke-width="1.5"/>`;
    }
    s += `<path d="M${w * 0.18} ${h * 0.35} C ${w * 0.4} ${h * 0.2}, ${w * 0.62} ${h * 0.3}, ${w * 0.86} ${h * 0.18}" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.4" fill="none"/>`;
    s += `<line x1="${w * 0.82}" y1="${h * 0.12}" x2="${w * 0.9}" y2="${h * 0.24}" stroke="${C.text}" stroke-opacity="0.6" stroke-width="2.2" stroke-linecap="round"/>`;
    return s;
  },
  portrait(w, h) {
    return `<rect width="${w}" height="${h}" fill="url(#dusk)"/>
      <path d="M${w * 0.18} ${h} V${h * 0.38} A${w * 0.32} ${w * 0.32} 0 0 1 ${w * 0.82} ${h * 0.38} V${h}Z" fill="${C.green}" opacity="0.7"/>
      ${hat(w / 2, h * 0.52, w * 0.56, h * 0.24, { opacity: 0.95 })}
      <rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="${C.forest}" opacity="0.55"/>`;
  },
  village(w, h) {
    let s = `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
    s += `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#9BA884"/>`;
    for (let i = 0; i < 5; i++) {
      const x = w * (0.08 + i * 0.19);
      const bw = w * 0.13;
      const by = h * 0.7;
      s += `<rect x="${x}" y="${by - h * 0.14}" width="${bw}" height="${h * 0.14}" fill="#D9C6A2"/>`;
      s += `<path d="M${x - 10} ${by - h * 0.14} L${x + bw / 2} ${by - h * 0.26} L${x + bw + 10} ${by - h * 0.14}Z" fill="${C.brown}"/>`;
      s += `<rect x="${x + bw * 0.4}" y="${by - h * 0.08}" width="${bw * 0.2}" height="${h * 0.08}" fill="${C.forest}" opacity="0.6"/>`;
    }
    for (let i = 0; i < 9; i++) {
      const x = w * (0.03 + i * 0.12);
      s += `<line x1="${x}" y1="${h * 0.7}" x2="${x + 6}" y2="${h * 0.3}" stroke="${C.green}" stroke-width="5"/>`;
      s += `<path d="M${x + 6} ${h * 0.3} q-30 10 -46 34 M${x + 6} ${h * 0.3} q30 10 46 34 M${x + 6} ${h * 0.3} q-6 -22 -28 -30 M${x + 6} ${h * 0.3} q10 -22 30 -26" stroke="${C.green}" stroke-width="4" fill="none" opacity="0.8"/>`;
    }
    return s;
  },
  pack(w, h) {
    return `<rect width="${w}" height="${h}" fill="${C.ivory}"/>
      <rect x="${w * 0.2}" y="${h * 0.5}" width="${w * 0.6}" height="${h * 0.3}" fill="#CDB68C"/>
      <rect x="${w * 0.2}" y="${h * 0.5}" width="${w * 0.6}" height="${h * 0.05}" fill="${C.brown}" opacity="0.6"/>
      <rect x="${w * 0.47}" y="${h * 0.5}" width="${w * 0.06}" height="${h * 0.3}" fill="${C.forest}" opacity="0.85"/>
      ${hat(w / 2, h * 0.5, w * 0.52, h * 0.26)}`;
  },
};

const images = [
  // [path, scene, width, height]
  ["hero/hero-artisan.svg", "field", 1920, 1100],
  ["story/mother-portrait.svg", "portrait", 1000, 1250],
  ["story/hands-stitching.svg", "stitch", 1200, 900],
  ["story/quang-nap-village.svg", "village", 1600, 900],
  ["story/workshop-1.svg", "leaves", 900, 1100],
  ["story/workshop-2.svg", "frame", 900, 1100],
  ["story/workshop-3.svg", "hatTop", 900, 1100],
  ["story/story-hero.svg", "village", 1920, 1000],
  ["craftsmanship/step-1-nguyen-lieu.svg", "leaves", 900, 1100],
  ["craftsmanship/step-2-xu-ly-la.svg", "hatTop", 900, 1100],
  ["craftsmanship/step-3-khung-chang.svg", "frame", 900, 1100],
  ["craftsmanship/step-4-hoan-thien.svg", "hat", 900, 1100],
  ["culture/culture-hero.svg", "field", 1600, 900],
  ["culture/article-y-nghia.svg", "hatDark", 1200, 800],
  ["culture/article-lang-nghe.svg", "village", 1200, 800],
  ["culture/article-bao-quan.svg", "hatTop", 1200, 800],
];

const productSlugs = [
  ["non-la-truyen-thong-moc", ["hat", "hatTop", "stitch"]],
  ["non-la-truyen-thong-quai-lua", ["hatDark", "hat", "hatTop"]],
  ["non-la-dac-biet-la-chon-loc", ["hat", "leaves", "hatTop"]],
  ["non-la-qua-tang-hop-moc", ["pack", "hat", "hatTop"]],
  ["non-la-qua-tang-bo-doi", ["pack", "hatDark", "hat"]],
  ["non-la-dat-theo-yeu-cau", ["hatDark", "frame", "stitch"]],
];
for (const [slug, sc] of productSlugs) {
  sc.forEach((s, i) => images.push([`products/${slug}-${i + 1}.svg`, s, 1000, 1250]));
}

const darkScenes = new Set(["hatDark", "frame", "portrait"]);

for (const [p, scene, w, h] of images) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Ảnh minh họa">
${defs()}
${scenes[scene](w, h)}
<rect width="${w}" height="${h}" fill="url(#grain)"/>
${label(w, h, "public/images/" + p.replace(/\.svg$/, ".jpg"), darkScenes.has(scene))}
</svg>`;
  const out = join(root, p);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg);
}
console.log(`Đã tạo ${images.length} ảnh minh họa.`);
