import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Pizza } from '../data/otterChaos';
import { menuPrice } from '../lib/fees';
import { Suit } from './Suit';
import './PizzaCard.css';

const SUITS = ['heart', 'club', 'diamond', 'spade'] as const;

export function PizzaCard({ pizza, index }: { pizza: Pizza; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const suit = SUITS[index % 4];
  return (
    <button
      className="pcard"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${pizza.name}, £${menuPrice(pizza.price)}. ${flipped ? `Named after ${pizza.game}.` : 'Tap to see the game it is named after.'}`}
    >
      <motion.span
        className="pcard__inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <span className="pcard__face pcard__front">
          <span className="pcard__corner">
            <span className="pcard__price">{menuPrice(pizza.price)}</span>
            <Suit kind={suit} size={14} />
          </span>
          <span className="pcard__name">
            {pizza.name}
            {pizza.diet && <span className="diet">{pizza.diet}</span>}
          </span>
          <span className="pcard__desc">{pizza.desc}</span>
          <span className="pcard__hint">Named after…</span>
        </span>
        <span className="pcard__face pcard__back" aria-hidden={!flipped}>
          <span className="pcard__back-k">Named after</span>
          <span className="pcard__game">{pizza.game}</span>
          {pizza.onShelf && <span className="pcard__shelf">It’s on our shelves. Play it while you eat it.</span>}
          <Suit kind={suit} size={30} className="pcard__bigsuit" />
        </span>
      </motion.span>
    </button>
  );
}
