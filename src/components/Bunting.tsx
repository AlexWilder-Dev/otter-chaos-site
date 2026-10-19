import './Bunting.css';

// Party bunting in sticker colours
const COLOURS = ['var(--pink)', 'var(--yellow)', 'var(--blue)', 'var(--die)'];

export function Bunting({ flags = 14 }: { flags?: number }) {
  const w = 100 / flags;
  return (
    <svg className="bunting" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 2 Q50 7 100 2" fill="none" stroke="var(--ink)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      {Array.from({ length: flags }, (_, i) => {
        const x = i * w;
        const sag = (t: number) => 2 + 5 * (1 - Math.pow((t - 50) / 50, 2));
        const y0 = sag(x + 0.6);
        const y1 = sag(x + w - 0.6);
        return (
          <path
            key={i}
            className="bunting__flag"
            style={{ animationDelay: `${(i % 5) * 0.2}s`, transformOrigin: `${x + w / 2}px ${(y0 + y1) / 2}px` }}
            d={`M${x + 0.6} ${y0} L${x + w - 0.6} ${y1} L${x + w / 2} ${Math.max(y0, y1) + 6.5} Z`}
            fill={COLOURS[i % COLOURS.length]}
            stroke="var(--ink)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
