import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import './ArchFrame.css';

interface Props {
  ratio: number; // width / height
  children: ReactNode; // usually a <Photo />
  lights?: boolean;
  bricks?: boolean;
  className?: string;
}

const W = 1000;
const BRICKS = ['#8d4a31', '#9e5a3c', '#7a3f2a', '#a8664a'];

// Points on the arch's semi-ellipse, angle in radians (π = left springing, 0 = right)
function onArch(cx: number, cy: number, rx: number, ry: number, a: number) {
  return [cx + rx * Math.cos(a), cy - ry * Math.sin(a)] as const;
}

export function ArchFrame({ ratio, children, lights = true, bricks = true, className = '' }: Props) {
  const H = W / ratio;
  const ry = Math.min(W / 2, H * 0.55);
  const ryPct = (ry / H) * 100;
  const t = 30; // brick ring thickness

  const ring = useMemo(() => {
    if (!bricks) return [];
    const n = 23;
    const gap = 0.006;
    const out: { d: string; fill: string }[] = [];
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI - (i / n) * Math.PI + gap;
      const a1 = Math.PI - ((i + 1) / n) * Math.PI - gap;
      const p = [
        onArch(500, ry, 500, ry, a0),
        onArch(500, ry, 500, ry, a1),
        onArch(500, ry, 500 - t, ry - t, a1),
        onArch(500, ry, 500 - t, ry - t, a0),
      ];
      out.push({
        d: `M${p[0][0]},${p[0][1]} L${p[1][0]},${p[1][1]} L${p[2][0]},${p[2][1]} L${p[3][0]},${p[3][1]}Z`,
        fill: BRICKS[(i * 7) % BRICKS.length],
      });
    }
    return out;
  }, [bricks, ry]);

  const festoon = useMemo(() => {
    if (!lights) return { paths: [] as string[], bulbs: [] as [number, number][] };
    const inset = t + 26;
    const hooks = [168, 132, 90, 48, 12].map((deg) => onArch(500, ry, 500 - inset, ry - inset, (deg * Math.PI) / 180));
    const paths: string[] = [];
    const bulbs: [number, number][] = [];
    const sag = Math.max(26, ry * 0.12);
    for (let i = 0; i < hooks.length - 1; i++) {
      const [x0, y0] = hooks[i];
      const [x1, y1] = hooks[i + 1];
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2 + sag;
      paths.push(`M${x0},${y0} Q${cx},${cy} ${x1},${y1}`);
      const n = 7;
      for (let j = i === 0 ? 0 : 1; j <= n; j++) {
        const s = j / n;
        const x = (1 - s) * (1 - s) * x0 + 2 * (1 - s) * s * cx + s * s * x1;
        const y = (1 - s) * (1 - s) * y0 + 2 * (1 - s) * s * cy + s * s * y1;
        bulbs.push([x, y]);
      }
    }
    return { paths, bulbs };
  }, [lights, ry]);

  // Every so often a train goes over the arches and the lights shiver
  const [rumble, setRumble] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!lights || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const schedule = (first = false) => {
      timer.current = window.setTimeout(() => {
        setRumble(true);
        window.setTimeout(() => setRumble(false), 1900);
        schedule();
      }, first ? 2600 : 28000 + Math.random() * 26000);
    };
    schedule(true);
    return () => window.clearTimeout(timer.current);
  }, [lights]);

  return (
    <div className={`arch ${className}`} style={{ aspectRatio: String(ratio) }}>
      <div className="arch__img" style={{ borderRadius: `50% 50% 0 0 / ${ryPct}% ${ryPct}% 0 0` }}>
        {children}
      </div>
      <svg className={`arch__svg ${rumble ? 'is-rumbling' : ''}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {ring.map((b, i) => (
          <path key={i} d={b.d} fill={b.fill} />
        ))}
        {bricks && (
          <>
            <rect x="0" y={ry} width={t} height={H - ry} fill="#8d4a31" />
            <rect x={W - t} y={ry} width={t} height={H - ry} fill="#8d4a31" />
          </>
        )}
        <defs>
          <radialGradient id="bulb-glow">
            <stop offset="0" stopColor="#ffd38a" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="arch__lights">
          {festoon.paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(30,22,14,0.55)" strokeWidth="2" />
          ))}
          {festoon.bulbs.map(([x, y], i) => (
            <g key={i} className="bulb" style={{ animationDelay: `${(i * 0.37) % 3.1}s, ${i * 0.028}s` }}>
              <circle cx={x} cy={y + 5} r="17" fill="url(#bulb-glow)" />
              <circle cx={x} cy={y + 5} r="4.5" className="bulb__core" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
