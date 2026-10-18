// Resizes Otter Chaos's own photos (research/img) into the web sizes the site uses.
// Run with: npm run images
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'research/img';
const OUT = 'public/img';
const WIDTHS = [480, 960, 1600];

// key -> source file (all photos are from otterchaos.co.uk uploads or their DesignMyNight listing)
const PHOTOS = {
  'arch-wide': 'cafe-web.jpg',
  'arch-street': 'cafe-web-1.jpg',
  'shelves': 'cafe-web-1-2.jpg',
  'arch-long': 'cafe-web-1-3.jpg',
  'bar-day': 'cafe-web-1-4.jpg',
  'splendor': 'cafe-web-1-5.jpg',
  'outside-day': 'cafe-web-1-6.jpg',
  'pour': 'drinks.jpg',
  'pint-otter': 'drinks-2.jpg',
  'cocktail-otter': 'drinks-3.jpg',
  'cocktail-hand': 'drinks-4.jpg',
  'hot-choc': 'drinks-5.jpg',
  'live-music': 'For-website-2-scaled.jpg',
  'mixer': '653943231_18039153350765820_3449497893561803538_n.webp',
  'dnd-table': 'IMG_0410-scaled.jpg',
  'busy-night': 'IMG_0540-1-scaled.jpg',
  'cards-green': 'IMG_0549-1-scaled.jpg',
  'packed-arch': 'IMG_0550-1-scaled.jpg',
  'bar-night': 'IMG_0554-1-scaled.jpg',
  'busy-booths': 'IMG_0558_2-scaled.jpg',
  'outside-night': 'IMG_0565-1-scaled.jpg',
  'shelf-wall': 'IMG_0568-1-scaled.jpg',
  'shelf-wall-wide': 'IMG_0571-1-scaled.jpg',
  'takeover': 'Otter-Chaos-x-Eon-Next.jpeg',
  'playing': 'dmn-390.jpg',
};

await mkdir(OUT, { recursive: true });
await mkdir('public/logo', { recursive: true });

for (const [key, file] of Object.entries(PHOTOS)) {
  const input = path.join(SRC, file);
  const meta = await sharp(input).rotate().metadata();
  for (const w of WIDTHS) {
    if (w > (meta.width ?? 0) * 1.05 && w !== WIDTHS[0]) continue;
    await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(path.join(OUT, `${key}-${w}.webp`));
  }
  console.log(key, meta.width, meta.height);
}

// Logo: the otter on its own (transparent), and the round OC badge
const otter = path.join(SRC, 'good-logo-transparent-back.png');
for (const w of [96, 192, 384]) {
  await sharp(otter).resize({ width: w }).webp({ quality: 90 }).toFile(`public/logo/otter-${w}.webp`);
}
await sharp(otter).resize({ width: 192 }).png().toFile('public/logo/otter-192.png');

const badge = path.join(SRC, 'logo.png');
await sharp(badge).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(badge).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(badge).resize(512, 512).png().toFile('public/icon-512.png');
// apple-touch-icon needs a solid background
await sharp(badge).resize(180, 180).flatten({ background: '#fff8ef' }).png().toFile('public/apple-touch-icon.png');
console.log('done');
