import type { Suit as SuitKind } from '../data/otterChaos';

// The card suits their menu uses to mark every drink
const PATHS: Record<SuitKind, string> = {
  heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
  diamond: 'M12 2.5 19.5 12 12 21.5 4.5 12z',
  club: 'M12 3a4 4 0 0 1 3.7 5.5A4 4 0 1 1 13 15.6l1.2 4.9H9.8l1.2-4.9A4 4 0 1 1 8.3 8.5 4 4 0 0 1 12 3z',
  spade: 'M12 2.5s8 5.6 8 10.7a4 4 0 0 1-6.8 2.9l1 4.4H9.8l1-4.4A4 4 0 0 1 4 13.2C4 8.1 12 2.5 12 2.5z',
};

export const SUIT_CHAR: Record<SuitKind, string> = { heart: '♥', diamond: '♦', club: '♣', spade: '♠' };

export function Suit({ kind, size = 16, className, title }: { kind: SuitKind; size?: number; className?: string; title?: string }) {
  const red = kind === 'heart' || kind === 'diamond';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ flex: 'none' }}
    >
      <path d={PATHS[kind]} fill={red ? 'var(--pip)' : 'currentColor'} />
    </svg>
  );
}
