import type { CSSProperties } from 'react';
import type { Suit as SuitKind } from '../data/otterChaos';
import { DieFace } from './DieFace';

// Little game pieces drawn for the site: the same bits that end up all over their tables

export const BIT_COLOURS = ['var(--pink)', 'var(--blue)', 'var(--yellow)', 'var(--die)', 'var(--wall)'];

// Scrabble letter values
export const TILE_SCORES: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

type BitProps = { size?: number; style?: CSSProperties; className?: string };

export function Meeple({ size = 32, colour = 'var(--pink)', style, className }: BitProps & { colour?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path
        d="M12 1.8a3.4 3.4 0 0 1 3.4 3.4c0 1.1-.5 2.1-1.4 2.7l5.7 2.2c1.3.5 1.8 2 1.1 3.2-.6 1-1.9 1.4-3 .9l-1-.4 2.6 6.4c.4 1-.3 2-1.4 2h-3.3L12 18.3l-2.7 3.9H6c-1.1 0-1.8-1-1.4-2l2.6-6.4-1 .4c-1.1.5-2.4.1-3-.9-.7-1.2-.2-2.7 1.1-3.2L10 7.9c-.9-.6-1.4-1.6-1.4-2.7A3.4 3.4 0 0 1 12 1.8z"
        fill={colour}
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Tile({ letter, size = 36, style, className }: BitProps & { letter: string }) {
  const l = letter.toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={style} className={className} aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="6" fill="#f3d9a6" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="2" y="32" width="36" height="6" rx="3" fill="#d9b67a" opacity="0.6" />
      <text x="18" y="27" textAnchor="middle" fontFamily="var(--display)" fontWeight="700" fontSize="22" fill="var(--ink)">
        {l}
      </text>
      <text x="33" y="34" textAnchor="end" fontFamily="var(--display)" fontWeight="600" fontSize="8" fill="var(--ink)">
        {TILE_SCORES[l] ?? ''}
      </text>
    </svg>
  );
}

const SUIT_PATH: Record<SuitKind, string> = {
  heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
  diamond: 'M12 2.5 19.5 12 12 21.5 4.5 12z',
  club: 'M12 3a4 4 0 0 1 3.7 5.5A4 4 0 1 1 13 15.6l1.2 4.9H9.8l1.2-4.9A4 4 0 1 1 8.3 8.5 4 4 0 0 1 12 3z',
  spade: 'M12 2.5s8 5.6 8 10.7a4 4 0 0 1-6.8 2.9l1 4.4H9.8l1-4.4A4 4 0 0 1 4 13.2C4 8.1 12 2.5 12 2.5z',
};

export function MiniCard({ suit = 'heart', size = 34, style, className }: BitProps & { suit?: SuitKind }) {
  const red = suit === 'heart' || suit === 'diamond';
  return (
    <svg width={size * 0.74} height={size} viewBox="0 0 30 40" style={style} className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="27" height="37" rx="4" fill="#fffdf8" stroke="var(--ink)" strokeWidth="2.5" />
      <g transform="translate(6 9) scale(0.75)">
        <path d={SUIT_PATH[suit]} fill={red ? 'var(--pink)' : 'var(--ink)'} />
      </g>
    </svg>
  );
}

export function Pawn({ size = 30, colour = 'var(--ink)', style, className }: BitProps & { colour?: string }) {
  return (
    <svg width={size * 0.7} height={size} viewBox="0 0 21 30" style={style} className={className} aria-hidden="true">
      <path
        d="M10.5 1.5a4.2 4.2 0 0 1 2.6 7.5h1.4v2.4h-2c.4 4 1.9 7.4 4.2 10.6h1.2v3.2c1 .4 1.6 1.2 1.6 2.3v1H1.5v-1c0-1.1.6-1.9 1.6-2.3V22h1.2c2.3-3.2 3.8-6.6 4.2-10.6h-2V9h1.4a4.2 4.2 0 0 1 2.6-7.5z"
        fill={colour}
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type BitKind = 'meeple' | 'die' | 'tile' | 'card' | 'pawn';

export function Bit({ kind, seed, size = 32 }: { kind: BitKind; seed: number; size?: number }) {
  const colour = BIT_COLOURS[seed % BIT_COLOURS.length];
  switch (kind) {
    case 'meeple':
      return <Meeple size={size} colour={colour} />;
    case 'die':
      return <DieFace n={(seed % 6) + 1} size={size * 0.85} />;
    case 'tile':
      return <Tile letter={'OTTERCHAOS'[seed % 10]} size={size * 0.9} />;
    case 'card':
      return <MiniCard suit={(['heart', 'spade', 'diamond', 'club'] as const)[seed % 4]} size={size} />;
    default:
      return <Pawn size={size} colour={seed % 2 ? 'var(--chalk)' : 'var(--otter)'} />;
  }
}
