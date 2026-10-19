import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DieFace } from './DieFace';
import { Meeple, Pawn } from './Bits';
import './ChessBoard.css';

// The chessboard from the original Otter Chaos site: a full-width board where the pieces
// take turns making a move. The knight moves like a knight.

const SQ = 52;

type Kind = 'knight' | 'pawn' | 'meeple' | 'die';
interface Piece {
  kind: Kind;
  c: number;
  r: number;
  face?: number;
}

function Knight() {
  return (
    <svg width="28" height="34" viewBox="0 0 26 32" aria-hidden="true">
      <path
        d="M5 29.5h16v-3c-1.4-.6-2.2-1.6-2.4-3.2-.4-3.6.6-6.5 1.6-9.6C21.4 8 18 3.5 12.3 2.3L11 1l-.8 2.4C7 4.6 4.6 7.6 3.5 11.2l-1.6 4.6 2.4 1.8 2.6-1.8 2.4.4c-1.6 2.3-3.4 4.6-3.6 7.4-.1 1.3-.4 2.2-.7 2.9z"
        fill="var(--pink)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="8.6" r="1.2" fill="var(--ink)" />
    </svg>
  );
}

const KNIGHT_MOVES = [
  [1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1],
];

function nextSquare(p: Piece, cols: number, rows: number, taken: Set<string>): Piece {
  const free = (c: number, r: number) => c >= 0 && r >= 0 && c < cols && r < rows && !taken.has(`${c},${r}`);
  const pick = (moves: number[][]) => {
    const ok = moves.map(([dc, dr]) => [p.c + dc, p.r + dr]).filter(([c, r]) => free(c, r));
    return ok.length ? ok[Math.floor(Math.random() * ok.length)] : null;
  };
  let to: number[] | null = null;
  if (p.kind === 'knight') to = pick(KNIGHT_MOVES);
  else if (p.kind === 'pawn') to = pick([[0, -1], [0, 1]]);
  else if (p.kind === 'meeple') to = pick([[1, 1], [-1, 1], [1, -1], [-1, -1]]);
  else to = pick([[1, 0], [-1, 0], [2, 0], [-2, 0]]);
  if (!to) return p;
  return { ...p, c: to[0], r: to[1], face: p.kind === 'die' ? 1 + Math.floor(Math.random() * 6) : p.face };
}

export function ChessBoard({ rows = 2 }: { rows?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(8);
  const [pieces, setPieces] = useState<Piece[]>([
    { kind: 'knight', c: 1, r: 0 },
    { kind: 'pawn', c: 4, r: 1 },
    { kind: 'meeple', c: 6, r: 0 },
    { kind: 'die', c: 9, r: 1, face: 5 },
  ]);
  const turn = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // an even number of columns keeps the pieces on the painted squares
    const ro = new ResizeObserver(() => setCols(Math.max(6, Math.floor(el.clientWidth / SQ / 2) * 2)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // spread the pieces out across the board whenever its width changes
  useEffect(() => {
    setPieces((ps) => ps.map((p, i) => ({ ...p, c: Math.min(cols - 1, Math.round(((i + 0.5) / ps.length) * cols)) })));
  }, [cols]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setPieces((ps) => {
        const i = turn.current++ % ps.length;
        const taken = new Set(ps.filter((_, j) => j !== i).map((p) => `${p.c},${p.r}`));
        return ps.map((p, j) => (j === i ? nextSquare(p, cols, rows, taken) : p));
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [cols, rows]);

  return (
    <div className="board" ref={ref} style={{ height: rows * SQ }} aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="board__piece"
          initial={false}
          animate={{ x: p.c * SQ + (ref.current ? (ref.current.clientWidth - cols * SQ) / 2 : 0), y: p.r * SQ }}
          transition={p.kind === 'knight' ? { type: 'spring', stiffness: 160, damping: 16 } : { type: 'spring', stiffness: 260, damping: 22 }}
        >
          <motion.span
            key={`${p.c}-${p.r}`}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.45 }}
          >
            {p.kind === 'knight' && <Knight />}
            {p.kind === 'pawn' && <Pawn size={32} colour="var(--blue)" />}
            {p.kind === 'meeple' && <Meeple size={32} colour="var(--yellow)" />}
            {p.kind === 'die' && <DieFace n={p.face ?? 5} size={30} />}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
