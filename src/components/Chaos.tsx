import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bit, type BitKind } from './Bits';
import './Chaos.css';

// "Otter Chaos": a burst of game pieces that fly out and fall off the screen

interface Piece {
  id: number;
  x: number;
  y: number;
  kind: BitKind;
  seed: number;
  xs: number[];
  ys: number[];
  rot: number;
  size: number;
  dur: number;
}

type Burst = (x: number, y: number, count?: number, power?: number) => void;

const ChaosContext = createContext<{ burst: Burst; chaos: () => void }>({ burst: () => {}, chaos: () => {} });

export const useChaos = () => useContext(ChaosContext);

const KINDS: BitKind[] = ['meeple', 'die', 'tile', 'card', 'pawn', 'meeple', 'die'];
const STEPS = 14;

function reduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ChaosProvider({ children }: { children: ReactNode }) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const next = useRef(0);

  const burst = useCallback<Burst>((x, y, count = 14, power = 1) => {
    if (reduced()) return;
    const made: Piece[] = [];
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.25;
      const speed = (380 + Math.random() * 420) * power;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const g = 1500;
      const dur = 1.1 + Math.random() * 0.6;
      const xs: number[] = [];
      const ys: number[] = [];
      for (let s = 0; s <= STEPS; s++) {
        const t = (s / STEPS) * dur;
        xs.push(vx * t);
        ys.push(vy * t + 0.5 * g * t * t);
      }
      made.push({
        id: next.current++,
        x,
        y,
        kind: KINDS[Math.floor(Math.random() * KINDS.length)],
        seed: Math.floor(Math.random() * 100),
        xs,
        ys,
        rot: (Math.random() - 0.5) * 900,
        size: 26 + Math.random() * 18,
        dur,
      });
    }
    setPieces((p) => [...p, ...made]);
    const ids = new Set(made.map((m) => m.id));
    window.setTimeout(() => setPieces((p) => p.filter((m) => !ids.has(m.id))), 1900);
  }, []);

  // Full chaos: pieces erupt from all along the bottom of the screen
  const chaos = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 5; i++) {
      window.setTimeout(() => burst(w * (0.1 + i * 0.2), h + 10, 12, 1.5), i * 90);
    }
  }, [burst]);

  return (
    <ChaosContext.Provider value={{ burst, chaos }}>
      {children}
      <div className="chaos" aria-hidden="true">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="chaos__bit"
            style={{ left: p.x, top: p.y }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.4 }}
            animate={{ x: p.xs, y: p.ys, rotate: p.rot, opacity: [1, 1, 1, 0], scale: [0.4, 1, 1, 1] }}
            transition={{ duration: p.dur, ease: 'linear' }}
          >
            <Bit kind={p.kind} seed={p.seed} size={p.size} />
          </motion.div>
        ))}
      </div>
    </ChaosContext.Provider>
  );
}
