import { useState } from 'react';
import { motion } from 'framer-motion';
import { TILE_SCORES } from './Bits';
import './ScrabbleWord.css';

// A word spelled in letter tiles (real Scrabble values). Tap to jumble it.
export function ScrabbleWord({ word, as: Tag = 'h2', size = 'md', showScore = true }: { word: string; as?: 'h1' | 'h2' | 'h3'; size?: 'sm' | 'md' | 'lg'; showScore?: boolean }) {
  const letters = word.toUpperCase().split('');
  const [order, setOrder] = useState(letters.map((_, i) => i));
  const score = letters.reduce((s, l) => s + (TILE_SCORES[l] ?? 0), 0);

  function jumble() {
    const o = [...order].sort(() => Math.random() - 0.5);
    setOrder(o);
    window.setTimeout(() => setOrder(letters.map((_, i) => i)), 1100);
  }

  return (
    <Tag className={`scrabble scrabble--${size}`} aria-label={word}>
      <button className="scrabble__tiles" onClick={jumble} aria-hidden="true" tabIndex={-1}>
        {order.map((i, pos) =>
          letters[i] === ' ' ? (
            <span key={i} className="scrabble__gap" />
          ) : (
            <motion.span
              key={i}
              layout
              className="scrabble__tile"
              style={{ rotate: (((i * 37) % 5) - 2) * 0.75 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
              whileHover={{ y: -6, rotate: 0 }}
              data-pos={pos}
            >
              {letters[i]}
              <i>{TILE_SCORES[letters[i]] ?? ''}</i>
            </motion.span>
          ),
        )}
      </button>
      {showScore && <span className="scrabble__score" aria-hidden="true">{score} pts</span>}
    </Tag>
  );
}
