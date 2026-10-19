import { Bit, type BitKind } from './Bits';
import './ScatteredBits.css';

// Game pieces left lying around a section, bobbing gently (the old site's floating meeples)
const SPOTS: { x: number; y: number; kind: BitKind; r: number; s: number }[] = [
  { x: 6, y: 12, kind: 'meeple', r: -14, s: 30 },
  { x: 88, y: 8, kind: 'die', r: 12, s: 34 },
  { x: 78, y: 62, kind: 'card', r: 18, s: 34 },
  { x: 4, y: 70, kind: 'tile', r: -8, s: 32 },
  { x: 46, y: 90, kind: 'meeple', r: 10, s: 26 },
  { x: 93, y: 36, kind: 'pawn', r: -10, s: 30 },
  { x: 26, y: 40, kind: 'die', r: 24, s: 24 },
];

export function ScatteredBits({ count = SPOTS.length, opacity = 0.9 }: { count?: number; opacity?: number }) {
  return (
    <div className="scattered" aria-hidden="true" style={{ opacity }}>
      {SPOTS.slice(0, count).map((b, i) => (
        <span
          key={i}
          className="scattered__bit"
          style={{ left: `${b.x}%`, top: `${b.y}%`, rotate: `${b.r}deg`, animationDelay: `${i * 0.45}s` }}
        >
          <Bit kind={b.kind} seed={i * 3 + 1} size={b.s} />
        </span>
      ))}
    </div>
  );
}
