import './ABoard.css';

// Their chalk A-board on Atlantic Road: "Board Games + Beer On Tap + Pizza"
export function ABoard() {
  return (
    <figure className="aboard">
      <svg viewBox="0 0 220 280" role="img" aria-label="Chalk A-board: Board Games + Beer On Tap + Pizza">
        <path d="M30 270 L60 20 M190 270 L160 20" stroke="var(--otter)" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 20 h100" stroke="var(--otter)" strokeWidth="10" strokeLinecap="round" />
        <rect x="50" y="34" width="120" height="190" rx="6" fill="#1f2421" stroke="var(--otter)" strokeWidth="8" transform="rotate(0)" />
        <g fontFamily="var(--display)" fill="var(--chalk)" textAnchor="middle" fontWeight="500">
          <text x="110" y="74" fontSize="22">Board</text>
          <text x="110" y="98" fontSize="22">Games</text>
          <text x="110" y="122" fontSize="20" fill="var(--yellow)">+</text>
          <text x="110" y="146" fontSize="19">Beer On Tap</text>
          <text x="110" y="170" fontSize="20" fill="var(--pink)">+</text>
          <text x="110" y="200" fontSize="24">Pizza</text>
        </g>
        <path d="M66 210 q10 -6 20 0 t20 0" stroke="var(--sky)" strokeWidth="2" fill="none" />
      </svg>
    </figure>
  );
}
