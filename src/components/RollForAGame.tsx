import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GAMES, TIERS, type Game } from '../data/otterChaos';
import { DieFace } from './DieFace';
import { useChaos } from './Chaos';
import './RollForAGame.css';

// Roll the die, get a real game off their shelves
export function RollForAGame() {
  const [game, setGame] = useState<Game | null>(null);
  const [face, setFace] = useState(3);
  const [spinning, setSpinning] = useState(false);
  const { burst } = useChaos();
  const navigate = useNavigate();

  async function roll(e: React.MouseEvent<HTMLButtonElement>) {
    if (spinning) return;
    const r = e.currentTarget.getBoundingClientRect();
    setSpinning(true);
    for (let i = 0; i < 8; i++) {
      setFace(1 + Math.floor(Math.random() * 6));
      await new Promise((res) => window.setTimeout(res, 60 + i * 15));
    }
    setGame(GAMES[Math.floor(Math.random() * GAMES.length)]);
    setSpinning(false);
    burst(r.left + r.width / 2, r.top + r.height / 2, 10, 0.8);
  }

  const tier = game ? TIERS.find((t) => t.id === game.tier) : null;

  return (
    <div className="roll">
      <div className="roll__left">
        <motion.button
          className="roll__die"
          onClick={roll}
          animate={spinning ? { rotate: [0, 120, 240, 360, 480], scale: [1, 1.15, 1] } : { rotate: 0 }}
          transition={{ duration: 0.7 }}
          aria-label="Roll for a random game from our shelves"
        >
          <DieFace n={face} size={92} />
        </motion.button>
        <p className="roll__label">{game ? 'Roll again' : 'Tap to roll'}</p>
      </div>
      <AnimatePresence mode="wait">
        {game ? (
          <motion.div
            key={game.id}
            className="roll__card pop"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            role="status"
          >
            <p className="roll__tier">{tier?.title}</p>
            <p className="roll__name">{game.name}</p>
            <p className="roll__meta">
              {game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers}–${game.maxPlayers}`} players ·{' '}
              {game.minTime === game.maxTime ? game.minTime : `${game.minTime}–${game.maxTime}`} min
            </p>
            <button className="btn btn--primary btn--small" onClick={() => navigate(`/book?party=${Math.max(2, game.minPlayers)}`)}>
              Book a table to play it
            </button>
          </motion.div>
        ) : (
          <motion.div key="empty" className="roll__card roll__card--empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p>Tap the die and it’ll pick one of the real games off our shelves.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
