// One-off: builds public/og.jpg (1200x630) for link previews from their widest room
// photo, with the Otter Chaos logo on a cream disc. Run with: npm run og
import sharp from 'sharp';

const W = 1200;
const H = 630;
const room = 'research/img/cafe-web.jpg';
const badge = 'research/img/logo.png';

const base = await sharp(room).resize({ width: W }).extract({ left: 0, top: 96, width: W, height: H }).toBuffer();

const D = 318; // disc diameter
const x = 46;
const y = H - D - 40;
const disc = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#30271c" stop-opacity="0.45"/>
      <stop offset="0.45" stop-color="#30271c" stop-opacity="0"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <circle cx="${x + D / 2}" cy="${y + D / 2}" r="${D / 2}" fill="#fff8ef" filter="url(#sh)"/>
  <circle cx="${x + D / 2}" cy="${y + D / 2}" r="${D / 2 - 9}" fill="none" stroke="#4e3b2f" stroke-width="4"/>
</svg>`);

const logo = await sharp(badge).resize(D - 44, D - 44).toBuffer();

await sharp(base)
  .composite([
    { input: disc, left: 0, top: 0 },
    { input: logo, left: x + 22, top: y + 22 },
  ])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' })
  .toFile('public/og.jpg');

const meta = await sharp('public/og.jpg').metadata();
const { size } = await import('node:fs').then((fs) => fs.statSync('public/og.jpg'));
console.log(`public/og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(0)}KB`);
