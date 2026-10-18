import type { ReactElement } from 'react';
import type { ArtKey } from '../data/otterChaos';

// Original drawings for nights where Otter Chaos has no photo of its own.
// (Their events page uses publishers' artwork for these; this avoids it.)

const ink = 'var(--otter)';
const cream = 'var(--chalk)';
const die = 'var(--die)';
const pip = 'var(--pip)';
const ply = 'var(--ply)';
const green = 'var(--wall)';

function Lorcana() {
  return (
    <g>
      <rect width="200" height="200" fill="#123f37" />
      {[-18, 0, 18].map((rot, i) => (
        <g key={i} transform={`rotate(${rot} 100 150)`}>
          <rect x="68" y="48" width="64" height="92" rx="7" fill={cream} stroke={ink} strokeWidth="3" />
          <rect x="76" y="56" width="48" height="50" rx="4" fill={i === 1 ? die : '#2f6f62'} />
          <path d="M84 116h32M84 124h22" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path d="M100 66l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill={cream} />
      {[[40, 40], [160, 52], [150, 160], [44, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={ply} />
      ))}
    </g>
  );
}

function Clocktower() {
  return (
    <g>
      <rect width="200" height="200" fill="#1d1a2e" />
      <circle cx="152" cy="44" r="16" fill={cream} />
      <circle cx="160" cy="38" r="14" fill="#1d1a2e" />
      <path d="M70 200V92l30-44 30 44v108z" fill={ink} />
      <path d="M100 48v-14" stroke={ink} strokeWidth="4" />
      <circle cx="100" cy="104" r="20" fill={cream} stroke={die} strokeWidth="4" />
      {/* 7 o'clock */}
      <path d="M100 104v-14M100 104l-7 12" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="88" y="140" width="10" height="16" rx="5" fill={die} />
      <rect x="102" y="140" width="10" height="16" rx="5" fill={die} opacity="0.6" />
      <rect x="92" y="172" width="16" height="28" rx="8" fill="#1d1a2e" />
    </g>
  );
}

function Language() {
  return (
    <g>
      <rect width="200" height="200" fill={die} />
      <path d="M26 46h104a14 14 0 0 1 14 14v38a14 14 0 0 1-14 14H64l-20 18v-18h-4a14 14 0 0 1-14-14V60a14 14 0 0 1 14-14z" fill={cream} stroke={ink} strokeWidth="4" />
      <text x="78" y="88" textAnchor="middle" fontFamily="var(--display)" fontWeight="700" fontSize="28" fill={ink}>¡hola!</text>
      <path d="M174 98H72a14 14 0 0 0-14 14v36a14 14 0 0 0 14 14h62l20 18v-18h6a14 14 0 0 0 14-14v-36a14 14 0 0 0-14-14z" fill={green} stroke={ink} strokeWidth="4" />
      <text x="117" y="139" textAnchor="middle" fontFamily="var(--display)" fontWeight="700" fontSize="28" fill={cream}>salut !</text>
    </g>
  );
}

function Write() {
  return (
    <g>
      <rect width="200" height="200" fill={ply} />
      <rect x="34" y="52" width="104" height="124" rx="6" fill={cream} stroke={ink} strokeWidth="4" />
      {[78, 96, 114, 132, 150].map((y) => (
        <path key={y} d={`M50 ${y}h${y === 150 ? 42 : 72}`} stroke="#c8b8a4" strokeWidth="3" strokeLinecap="round" />
      ))}
      <path d="M50 78h56M50 96h70M50 114h38" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(38 150 96)">
        <rect x="140" y="40" width="16" height="96" rx="3" fill={die} stroke={ink} strokeWidth="3" />
        <path d="M140 136l8 18 8-18z" fill={cream} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* 11:30 to 12:30: the no-talking hour */}
      <circle cx="156" cy="48" r="26" fill={cream} stroke={ink} strokeWidth="4" />
      <path d="M156 48V26A22 22 0 1 1 155.9 26z" fill={pip} opacity="0.85" />
      <circle cx="156" cy="48" r="4" fill={ink} />
    </g>
  );
}

function Carrom() {
  const coins: [number, number, string][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    coins.push([100 + Math.cos(a) * 15, 100 + Math.sin(a) * 15, i % 2 ? ink : cream]);
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.26;
    coins.push([100 + Math.cos(a) * 29, 100 + Math.sin(a) * 29, i % 2 ? cream : ink]);
  }
  return (
    <g>
      <rect width="200" height="200" fill="#6b3b22" />
      <rect x="14" y="14" width="172" height="172" rx="6" fill={ply} />
      <rect x="26" y="26" width="148" height="148" fill="#f3ddb4" />
      {[[34, 34], [166, 34], [34, 166], [166, 166]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#2a1d14" />
      ))}
      {[
        'M58 46h84', 'M58 154h84', 'M46 58v84', 'M154 58v84',
      ].map((d, i) => (
        <path key={i} d={d} stroke="#7a3f2a" strokeWidth="2.5" />
      ))}
      {[[58, 46], [142, 46], [58, 154], [142, 154], [46, 58], [46, 142], [154, 58], [154, 142]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={pip} />
      ))}
      <circle cx="100" cy="100" r="38" fill="none" stroke="#7a3f2a" strokeWidth="2" />
      {coins.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="6.5" fill={c} stroke="#2a1d14" strokeWidth="1.2" />
      ))}
      <circle cx="100" cy="100" r="6.5" fill={pip} stroke="#2a1d14" strokeWidth="1.2" />
      <circle cx="100" cy="148" r="9" fill="#fff" stroke="#2a1d14" strokeWidth="1.5" />
    </g>
  );
}

function Dungeon() {
  return (
    <g>
      <rect width="200" height="200" fill="#24170f" />
      <path d="M150 34c6-8 16-8 22 0-6 2-9 6-11 12-2-6-5-10-11-12z" fill={ply} opacity="0.7" />
      <path d="M58 70h70v96a12 12 0 0 1-12 12H70a12 12 0 0 1-12-12z" fill="#e9a446" stroke={cream} strokeWidth="4" />
      <path d="M128 92h14a14 14 0 0 1 14 14v26a14 14 0 0 1-14 14h-14" fill="none" stroke={cream} strokeWidth="8" />
      <path d="M52 72c0-14 10-22 22-18 4-10 20-12 28-4 10-6 26 0 26 14 6 2 8 8 4 12H54c-2-2-2-3-2-4z" fill={cream} />
      {[[74, 112], [96, 136], [110, 104], [82, 152]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fff4d6" opacity="0.8" />
      ))}
      {/* a d20, outlined */}
      <g transform="translate(150 158)">
        <path d="M0-28L24-14V14L0 28-24 14V-14Z" fill="none" stroke={die} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M0-28L14 8H-14ZM-24-14L-14 8M24-14L14 8M0 28L-14 8M0 28L14 8" fill="none" stroke={die} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Mixer() {
  return (
    <g>
      <rect width="200" height="200" fill={green} />
      <rect x="30" y="60" width="140" height="90" rx="10" fill={ply} />
      {[50, 90, 130].map((x, i) => (
        <rect key={i} x={x} y="74" width="26" height="36" rx="3" fill={i === 1 ? die : cream} stroke={ink} strokeWidth="3" transform={`rotate(${(i - 1) * 8} ${x + 13} 92)`} />
      ))}
    </g>
  );
}

function Music() {
  return (
    <g>
      <rect width="200" height="200" fill="#1a1612" />
      <rect x="30" y="120" width="140" height="34" rx="4" fill={cream} />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={36 + i * 15} y="120" width="8" height="20" fill={ink} />
      ))}
      <path d="M100 116V56" stroke={ply} strokeWidth="4" />
      <rect x="92" y="38" width="16" height="24" rx="8" fill={die} />
    </g>
  );
}

function Dnd() {
  return (
    <g>
      <rect width="200" height="200" fill="#3a2418" />
      <g transform="translate(100 100)">
        <path d="M0-48L42-24V24L0 48-42 24V-24Z" fill={die} stroke={cream} strokeWidth="4" strokeLinejoin="round" />
        <path d="M0-48L24 14H-24ZM-42-24L-24 14M42-24L24 14M0 48L-24 14M0 48L24 14" fill="none" stroke={cream} strokeWidth="3" strokeLinejoin="round" />
        <text x="0" y="4" textAnchor="middle" fontFamily="var(--display)" fontWeight="700" fontSize="20" fill={ink}>20</text>
      </g>
    </g>
  );
}

const ART: Record<ArtKey, () => ReactElement> = {
  lorcana: Lorcana,
  clocktower: Clocktower,
  language: Language,
  write: Write,
  carrom: Carrom,
  dungeon: Dungeon,
  mixer: Mixer,
  music: Music,
  dnd: Dnd,
};

export function EventArt({ art, className }: { art: ArtKey; className?: string }) {
  const Art = ART[art];
  return (
    <svg className={className} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Art />
    </svg>
  );
}
