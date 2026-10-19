import { useState } from 'react';
import { motion } from 'framer-motion';
import { GIFT_CARD } from '../data/otterChaos';
import { logo } from '../lib/img';
import { Suit } from './Suit';
import './GiftCardVisual.css';

export function GiftCardVisual() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button className="gcard" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} aria-label="Otter Chaos gift card. Tap to turn it over.">
      <motion.span
        className="gcard__inner"
        whileHover={{ y: -4 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        <span className="gcard__face gcard__front">
          <span className="gcard__corner gcard__corner--tl">
            <strong>OC</strong>
            <Suit kind="heart" size={16} />
          </span>
          <img src={logo(384)} alt="" className="gcard__otter" />
          <span className="gcard__name">Gift Card</span>
          <span className="gcard__range">{GIFT_CARD.range}</span>
          <span className="gcard__corner gcard__corner--br">
            <strong>OC</strong>
            <Suit kind="heart" size={16} />
          </span>
        </span>
        <span className="gcard__face gcard__back">
          <span className="gcard__back-title">Spend it on</span>
          <span className="gcard__list">
            <span>
              <Suit kind="spade" size={14} /> Table fees
            </span>
            <span>
              <Suit kind="heart" size={14} /> Food &amp; drink
            </span>
            <span>
              <Suit kind="club" size={14} /> Games to take home
            </span>
            <span>
              <Suit kind="diamond" size={14} /> Valid 12 months
            </span>
          </span>
        </span>
      </motion.span>
    </button>
  );
}
