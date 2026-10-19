import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pawn } from './Bits';
import './ChessStrip.css';

// A strip of chessboard where the pieces keep making their move (from the old Otter Chaos site)
const COLS = 8;
const ROWS = 3;

function Knight({ colour }: { colour: string }) {
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" aria-hidden="true">
      <path
        d="M5 29.5h16v-3c-1.4-.6-2.2-1.6-2.4-3.2-.4-3.6.6-6.5 1.6-9.6C21.4 8 18 3.5 12.3 2.3L11 1l-.8 2.4C7 4.6 4.6 7.6 3.5 11.2l-1.6 4.6 2.4 1.8 2.6-1.8 2.4.4c-1.6 2.3-3.4 4.6-3.6 7.4-.1 1.3-.4 2.2-.7 2.9z"
        fill={colour}
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="8.6" r="1.2" fill="var(--ink)" />
    </svg>
  );
}

const PIECES = [
  { id: 'k1', kind: 'knight', colour: 'var(--pink)' },
  { id: 'p1', kind: 'pawn', colour: 'var(--yellow)' },
  { id: 'k2', kind: 'knight', colour: 'var(--blue)' },
  { id: 'p2', kind: 'pawn', colour: 'var(--die)' },
];

function randomSquares() {
  const used = new Set<number>();
  return PIECES.map(() => {
    let s = 0;
    do s = Math.floor(Math.random() * COLS * ROWS);
    while (used.has(s));
    used.add(s);
    return s;
  });
}

export function ChessStrip() {
  const [squares, setSquares] = useState([1, 10, 13, 22]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setSquares(randomSquares()), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="chess" aria-hidden="true">
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <div key={i} className={`chess__sq ${(Math.floor(i / COLS) + (i % COLS)) % 2 ? 'is-dark' : ''}`} />
      ))}
      {PIECES.map((p, i) => {
        const s = squares[i];
        return (
          <motion.div
            key={p.id}
            className="chess__piece"
            animate={{ left: `${((s % COLS) / COLS) * 100}%`, top: `${(Math.floor(s / COLS) / ROWS) * 100}%`, y: [0, -14, 0] }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, y: { duration: 0.45 } }}
          >
            {p.kind === 'pawn' ? <Pawn size={30} colour={p.colour} /> : <Knight colour={p.colour} />}
          </motion.div>
        );
      })}
    </div>
  );
}
