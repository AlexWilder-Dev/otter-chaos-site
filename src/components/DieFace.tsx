// The orange die the otter is holding in their logo
const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[30, 26], [70, 26], [30, 50], [70, 50], [30, 74], [70, 74]],
};

export function DieFace({ n, size = 44 }: { n: number; size?: number }) {
  const pips = PIPS[Math.min(Math.max(n, 1), 6)];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="6" y="6" width="88" height="88" rx="20" fill="var(--die)" stroke="var(--otter)" strokeWidth="6" />
      {pips.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8.5" fill="var(--pip)" stroke="var(--otter)" strokeWidth="3" />
      ))}
    </svg>
  );
}
