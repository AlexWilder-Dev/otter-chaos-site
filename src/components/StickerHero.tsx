import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { logo } from '../lib/img';
import { tableFee, money } from '../lib/fees';
import { DieFace } from './DieFace';
import { useChaos } from './Chaos';
import './StickerHero.css';

// Their window sticker (pink / yellow / blue bands, otter bursting out), rebuilt.
// Tap the otter: it rolls its die. Tap it three times quickly: chaos.

export function StickerHero() {
  const [roll, setRoll] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [face, setFace] = useState(5);
  const [chaosMsg, setChaosMsg] = useState(false);
  const taps = useRef<number[]>([]);
  const hide = useRef<number | undefined>(undefined);
  const otter = useAnimationControls();
  const { burst, chaos } = useChaos();

  async function tap(e: React.MouseEvent<HTMLButtonElement>) {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1600), now];
    const rect = e.currentTarget.getBoundingClientRect();
    if (taps.current.length >= 3) {
      taps.current = [];
      setChaosMsg(true);
      setRoll(null);
      chaos();
      otter.start({ rotate: [0, -25, 25, -15, 15, 0], scale: [1, 1.15, 1], transition: { duration: 0.7 } });
      window.setTimeout(() => setChaosMsg(false), 2600);
      return;
    }
    if (rolling) return;
    setRolling(true);
    setChaosMsg(false);
    setRoll(null);
    otter.start({ y: [0, -26, 0], rotate: [0, -8, 0], transition: { duration: 0.5 } });
    // tumble through a few faces before landing
    for (let i = 0; i < 7; i++) {
      setFace(1 + Math.floor(Math.random() * 6));
      await new Promise((r) => window.setTimeout(r, 70 + i * 18));
    }
    const n = 1 + Math.floor(Math.random() * 6);
    setFace(n);
    setRoll(n);
    setRolling(false);
    window.clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setRoll(null), 8000);
    burst(rect.left + rect.width * 0.35, rect.top + rect.height * 0.7, 8, 0.7);
  }

  const party = roll ? Math.max(roll, 2) : 2;
  const fee = tableFee(party, 0, 3);

  return (
    <div className="sticker-hero">
      <div className="sticker-band" aria-hidden="true">
        <div className="sticker-band__pink">
          <span>Otter</span>
          <span>Chaos</span>
        </div>
        <div className="sticker-band__yellow" />
        <div className="sticker-band__blue">Brixton’s Boardgame Café</div>
      </div>

      <motion.button
        className="sticker-otter"
        onClick={tap}
        animate={otter}
        whileTap={{ scale: 0.92 }}
        aria-label="Tap the otter to roll its die"
      >
        <span className="sticker-otter__float">
          <img src={logo(384)} alt="" width="190" height="180" />
          <motion.span
            className="sticker-otter__die"
            animate={rolling ? { rotate: [0, 180, 360, 540, 720], y: [0, -40, -60, -30, 0] } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <DieFace n={face} size={60} />
          </motion.span>
        </span>
        {!roll && !rolling && !chaosMsg && <span className="sticker-otter__hint">Tap me</span>}
      </motion.button>

      <AnimatePresence>
        {(roll || chaosMsg) && (
          <motion.div
            key={chaosMsg ? 'chaos' : roll}
            className="sticker-bubble"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            role="status"
          >
            {chaosMsg ? (
              <p className="sticker-bubble__big">CHAOS! (&gt;ᴗ•)</p>
            ) : (
              <>
                <p className="sticker-bubble__big">You rolled a {roll}!</p>
                <p>
                  {roll === 1 ? 'Bring a friend: a table for two' : `A table for ${roll}`} is {money(fee.total)} for 3 hours.
                </p>
                <Link to={`/book?party=${party}`} className="btn btn--primary btn--small">
                  Book it
                </Link>
                <button className="sticker-bubble__x" onClick={() => setRoll(null)} aria-label="Close">
                  ×
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
