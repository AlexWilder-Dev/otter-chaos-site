// One-off: builds public/og.jpg (1200x630) for link previews: their widest room photo
// with the window-sticker band (pink / yellow / blue) and the otter logo on top.
// Run with: npm run og
import { mkdtempSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Let librsvg find Fredoka (OFL, scripts/fonts) for the sticker lettering
const confDir = mkdtempSync(path.join(tmpdir(), 'og-fonts-'));
const conf = path.join(confDir, 'fonts.conf');
writeFileSync(
  conf,
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
  <dir>${path.resolve('scripts/fonts')}</dir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
  <cachedir>${confDir}</cachedir>
</fontconfig>`,
);
process.env.FONTCONFIG_FILE = conf;
const { default: sharp } = await import('sharp');

const W = 1200;
const H = 630;
const room = 'research/img/cafe-web.jpg';
const otter = 'research/img/good-logo-transparent-back.png';

const base = await sharp(room).resize({ width: W }).extract({ left: 0, top: 96, width: W, height: H }).toBuffer();

// the sticker band, tilted like it's been slapped on the window
const band = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.35" stop-color="#30271c" stop-opacity="0"/>
      <stop offset="1" stop-color="#30271c" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <g transform="translate(250 330) rotate(-7)">
    <rect x="8" y="14" width="900" height="250" rx="34" fill="#30271c"/>
    <rect x="0" y="0" width="900" height="250" rx="34" fill="#e4237e" stroke="#30271c" stroke-width="7"/>
    <rect x="3.5" y="150" width="893" height="22" fill="#f7d93a"/>
    <rect x="3.5" y="172" width="893" height="74" fill="#1f5fb4"/>
    <path d="M3.5 150 H896.5 M3.5 172 H896.5" stroke="#30271c" stroke-width="6"/>
    <rect x="0" y="0" width="900" height="250" rx="34" fill="none" stroke="#30271c" stroke-width="7"/>
    <text x="215" y="120" font-family="Fredoka OG" font-size="122" fill="#b8135f">Otter Chaos</text>
    <text x="210" y="114" font-family="Fredoka OG" font-size="122" fill="#ffffff">Otter Chaos</text>
    <text x="215" y="226" font-family="Fredoka OG" font-size="46" fill="#ffffff">Brixton’s Boardgame Café</text>
  </g>
  <g transform="translate(1040 92) rotate(12)">
    <circle cx="6" cy="10" r="78" fill="#30271c"/>
    <circle cx="0" cy="0" r="78" fill="#f7d93a" stroke="#30271c" stroke-width="6"/>
    <text x="0" y="8" text-anchor="middle" font-family="Fredoka OG" font-size="52" fill="#30271c">500+</text>
    <text x="0" y="44" text-anchor="middle" font-family="Fredoka OG" font-size="28" fill="#30271c">games</text>
  </g>
</svg>`);

const otterImg = await sharp(otter).resize({ width: 330 }).toBuffer();
const otterShadow = await sharp(otter)
  .resize({ width: 330 })
  .ensureAlpha()
  .linear([0, 0, 0, 0.35], [48, 39, 28, 0])
  .toBuffer();

await sharp(base)
  .composite([
    { input: band, left: 0, top: 0 },
    { input: otterShadow, left: 58, top: 262 },
    { input: otterImg, left: 52, top: 250 },
  ])
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
  .toFile('public/og.jpg');

const meta = await sharp('public/og.jpg').metadata();
const { size } = statSync('public/og.jpg');
console.log(`public/og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(0)}KB`);
