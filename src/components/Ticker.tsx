import { Suit } from './Suit';
import './Ticker.css';

// Their chalk A-board says "Board Games + Beer On Tap + Pizza"; this one scrolls
const ITEMS = ['Board games', 'Beer on tap', 'Pizza', '500+ games', 'Cocktails', 'Under Brixton station', 'Bring the whole gang'];
const SUITS = ['heart', 'spade', 'diamond', 'club'] as const;

export function Ticker({ tone = 'pink' }: { tone?: 'pink' | 'blue' | 'yellow' }) {
  const row = (
    <span className="ticker__row">
      {ITEMS.map((t, i) => (
        <span key={t} className="ticker__item">
          {t}
          <Suit kind={SUITS[i % 4]} size={18} className="ticker__suit" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="ticker-wrap">
      <div className={`ticker ticker--${tone}`} aria-label={ITEMS.join(', ')}>
        <div className="ticker__track" aria-hidden="true">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
