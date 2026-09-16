/**
 * Generates the PWA icons from one SVG mark.
 *
 * There is no official OnDeck logo. The mark is a stack of two cards — the
 * app's own visual language, and a literal reading of the name — in the
 * design system's lilac and citron on the near-black ground.
 *
 * Run with: node scripts/generate-icons.mjs
 * Regenerate only when the mark changes; the PNGs are committed.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const INK = "#151515";
const LILAC = "#D6BCFC";
const CITRON = "#EDE55C";

/** `padding` keeps the mark inside the safe zone so a maskable icon is not
 *  cropped into by a launcher's mask. */
function mark({ background, padding }) {
  const inner = 512 - padding * 2;
  const card = (x, y, w, h, r, fill, opacity = 1) =>
    `<rect x="${padding + x * inner}" y="${padding + y * inner}" width="${w * inner}" height="${h * inner}" rx="${r * inner}" fill="${fill}" opacity="${opacity}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${background}"/>
  ${card(0.08, 0.1, 0.62, 0.46, 0.1, CITRON, 0.9)}
  ${card(0.3, 0.44, 0.62, 0.46, 0.1, LILAC)}
</svg>`;
}

const ICONS = [
  { file: "icon-192.png", size: 192, padding: 0, background: INK },
  { file: "icon-512.png", size: 512, padding: 0, background: INK },
  // Maskable: launchers crop to a circle or squircle, so the mark is inset.
  { file: "icon-maskable-512.png", size: 512, padding: 64, background: INK },
  // iOS does not apply a mask and does not honour transparency.
  { file: "apple-icon.png", size: 180, padding: 24, background: INK },
];

const outDir = join(process.cwd(), "public", "icons");
await mkdir(outDir, { recursive: true });

for (const { file, size, padding, background } of ICONS) {
  const svg = mark({ background, padding });
  const png = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  await writeFile(join(outDir, file), png);
  console.log(`${file} ${size}x${size}`);
}
