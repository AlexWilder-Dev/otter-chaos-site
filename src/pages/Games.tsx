import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ABOUT, CONTACT, GAMES, REVIEWS, TABLE_FEE, TIERS, type Game, type GameTier } from '../data/otterChaos';
import { money, tableFee } from '../lib/fees';
import { DieFace } from '../components/DieFace';
import { Photo } from '../components/Photo';
import { ArrowIcon, ExternalIcon } from '../components/Icons';
import './Games.css';

type TimePick = 'quick' | 'hour' | 'long' | 'any';
type FeelPick = GameTier | 'any';

const TIME_OPTS: { id: TimePick; label: string; sub: string }[] = [
  { id: 'quick', label: 'Quick one', sub: '30 min or less' },
  { id: 'hour', label: 'About an hour', sub: '30–75 min' },
  { id: 'long', label: 'All evening', sub: '75 min +' },
  { id: 'any', label: 'Don’t mind', sub: '' },
];

// Box colours for the shelf, taken from the logo and the room
const SPINES = ['#4e3b2f', '#835e4b', '#f18c45', '#d05731', '#0d4a3e', '#e8c792', '#30271c', '#2f6f62', '#b5643a', '#f4efe6'];

function spineColour(id: number) {
  return SPINES[id % SPINES.length];
}
function ink(bg: string) {
  return ['#f18c45', '#e8c792', '#f4efe6'].includes(bg) ? '#30271c' : '#f6f0e4';
}

function fitsTime(g: Game, t: TimePick) {
  if (t === 'any') return true;
  const typical = g.maxTime;
  if (t === 'quick') return typical <= 30;
  if (t === 'hour') return typical > 30 && typical <= 75;
  return typical > 75;
}
function fitsPlayers(g: Game, n: number) {
  if (n >= 6) return g.maxPlayers >= 6;
  return g.minPlayers <= n && g.maxPlayers >= n;
}
function players(g: Game) {
  return g.minPlayers === g.maxPlayers ? `${g.minPlayers}` : `${g.minPlayers}–${g.maxPlayers}`;
}
function time(g: Game) {
  return g.minTime === g.maxTime ? `${g.minTime} min` : `${g.minTime}–${g.maxTime} min`;
}

function Weight({ w }: { w: number }) {
  const full = Math.round(w);
  return (
    <span className="weight" title={`BoardGameGeek weight ${w.toFixed(2)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= full ? 'on' : ''} />
      ))}
      <span className="sr-only">Weight {w.toFixed(1)} out of 5</span>
    </span>
  );
}

function BoxCard({ g, onClose, shared }: { g: Game; onClose?: () => void; shared?: boolean }) {
  const bg = spineColour(g.id);
  const tier = TIERS.find((t) => t.id === g.tier)!;
  return (
    <motion.div className="box" layoutId={shared ? `box-${g.id}` : undefined} style={{ ['--box' as string]: bg, ['--box-ink' as string]: ink(bg) }}>
      <div className="box__lid">
        <p className="box__tier">{tier.title}</p>
        <h3 className="box__name">{g.name}</h3>
        {g.year && <p className="box__year">{g.year}</p>}
      </div>
      <dl className="box__facts">
        <div>
          <dt>Players</dt>
          <dd>{players(g)}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{time(g)}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>
            <Weight w={g.weight} /> <span className="box__w">{g.weight.toFixed(1)}</span>
          </dd>
        </div>
      </dl>
      <div className="box__foot">
        <a href={`https://boardgamegeek.com/boardgame/${g.id}`} target="_blank" rel="noopener noreferrer">
          On BoardGameGeek <ExternalIcon size={14} />
        </a>
        {onClose && (
          <button onClick={onClose} className="box__close">
            Back on the shelf
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Picker() {
  const [params] = useSearchParams();
  const initial = Number(params.get('players')) || 0;
  const [n, setN] = useState(initial >= 1 ? Math.min(initial, 6) : 0);
  const [t, setT] = useState<TimePick | null>(null);
  const [feel, setFeel] = useState<FeelPick | null>(null);
  const [shuffle, setShuffle] = useState(0);

  useEffect(() => {
    if (initial && window.location.hash.includes('picker')) {
      document.getElementById('picker')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initial]);

  const step = !n ? 1 : !t ? 2 : !feel ? 3 : 4;

  const { results, relaxed } = useMemo(() => {
    if (step < 4) return { results: [] as Game[], relaxed: false };
    const byFeel = (g: Game) => feel === 'any' || g.tier === feel;
    let r = GAMES.filter((g) => fitsPlayers(g, n) && fitsTime(g, t!) && byFeel(g));
    let relaxed = false;
    if (r.length < 3) {
      relaxed = true;
      r = GAMES.filter((g) => fitsPlayers(g, n) && byFeel(g));
      if (r.length < 3) r = GAMES.filter((g) => fitsPlayers(g, n));
    }
    // a stable shuffle so "another handful" gives different boxes
    const seeded = [...r].sort((a, b) => ((a.id * 7919 + shuffle * 104729) % 1009) - ((b.id * 7919 + shuffle * 104729) % 1009));
    return { results: seeded.slice(0, 6), relaxed };
  }, [step, n, t, feel, shuffle]);

  const fee = tableFee(n || 2, 0, 3);

  return (
    <div className="picker" id="picker">
      <ol className="picker__steps">
        <li className={step === 1 ? 'is-now' : 'is-done'}>
          <p className="picker__q">How many of you?</p>
          <div className="picker__dice">
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <motion.button key={k} whileTap={{ scale: 0.88, rotate: -10 }} aria-pressed={n === k} className={n === k ? 'is-on' : ''} onClick={() => setN(k)} aria-label={k === 6 ? '6 or more' : `${k}`}>
                <DieFace n={k} size={40} />
                <span>{k === 6 ? '6+' : k}</span>
              </motion.button>
            ))}
          </div>
        </li>
        <li className={step < 2 ? 'is-later' : step === 2 ? 'is-now' : 'is-done'}>
          <p className="picker__q">How long have you got?</p>
          <div className="picker__chips">
            {TIME_OPTS.map((o) => (
              <button key={o.id} className="chip" aria-pressed={t === o.id} disabled={!n} onClick={() => setT(o.id)}>
                {o.label}
                {o.sub && <span className="picker__sub">{o.sub}</span>}
              </button>
            ))}
          </div>
        </li>
        <li className={step < 3 ? 'is-later' : step === 3 ? 'is-now' : 'is-done'}>
          <p className="picker__q">What kind of evening?</p>
          <div className="picker__chips">
            {TIERS.map((o) => (
              <button key={o.id} className="chip" aria-pressed={feel === o.id} disabled={!t} onClick={() => setFeel(o.id)}>
                {o.title}
              </button>
            ))}
            <button className="chip" aria-pressed={feel === 'any'} disabled={!t} onClick={() => setFeel('any')}>
              Surprise us
            </button>
          </div>
        </li>
      </ol>

      <AnimatePresence>
        {step === 4 && (
          <motion.div className="picker__out" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="picker__found">
              {relaxed ? 'Nothing fits all three exactly, so here are the closest boxes' : `Off the shelf for ${n === 6 ? '6 or more' : n}`}:
            </p>
            <LayoutGroup>
              <div className="picker__boxes">
                {results.map((g, i) => (
                  <motion.div key={`${g.id}-${shuffle}`} initial={{ opacity: 0, x: -30, rotate: -4 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}>
                    <BoxCard g={g} />
                  </motion.div>
                ))}
              </div>
            </LayoutGroup>
            <div className="picker__end">
              <button className="btn btn--ghost" onClick={() => setShuffle((s) => s + 1)}>
                Another handful
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setN(0);
                  setT(null);
                  setFeel(null);
                }}
              >
                Start again
              </button>
            </div>
            <div className="picker__book">
              <div>
                <p className="picker__book-big">Sorted. Now grab a table.</p>
                <p className="note">
                  {n === 6 ? 'Six or more' : n} of you for three hours: {money(fee.total)} table fee
                  {n === 6 ? ' and up' : ''} ({money(TABLE_FEE.adult.threeHours)} per adult). Want something else? Ask the staff, they know the shelves.
                </p>
              </div>
              <Link to={`/book?party=${n}`} className="btn btn--die">
                Book a table for {n === 6 ? '6+' : n} <ArrowIcon size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Shelf({ tier, onPick }: { tier: (typeof TIERS)[number]; onPick: (g: Game) => void }) {
  const games = GAMES.filter((g) => g.tier === tier.id).sort((a, b) => a.name.localeCompare(b.name));
  if (!games.length) return null;
  return (
    <section className="shelf" aria-labelledby={`shelf-${tier.id}`}>
      <div className="shelf__head">
        <h3 id={`shelf-${tier.id}`}>{tier.title}</h3>
        <p className="note">
          {tier.blurb} {games.length} here.
        </p>
      </div>
      <div className="shelf__row">
        {games.map((g) => {
          const bg = spineColour(g.id);
          const h = 150 + ((g.id * 37) % 60) + Math.round(g.weight * 6);
          const w = 30 + ((g.id * 13) % 16);
          return (
            <motion.button
              key={g.id}
              layoutId={`box-${g.id}`}
              className="spine"
              style={{ height: h, width: w, background: bg, color: ink(bg) }}
              whileHover={{ y: -10 }}
              whileTap={{ y: -14 }}
              onClick={() => onPick(g)}
              aria-label={`${g.name}: ${players(g)} players, ${time(g)}`}
            >
              <span>{g.name}</span>
            </motion.button>
          );
        })}
      </div>
      <div className="shelf__board" aria-hidden="true" />
    </section>
  );
}

export function Games() {
  const [picked, setPicked] = useState<Game | null>(null);

  useEffect(() => {
    if (!picked) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPicked(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picked]);

  return (
    <div className="page games">
      <div className="wrap">
        <header className="page-head games__head">
          <p className="kicker">Games library</p>
          <h1>500+ games. We’ll help you pick.</h1>
          <p>{ABOUT.lines[1]}</p>
        </header>
      </div>

      <section className="section games__picker" aria-labelledby="pick-title">
        <div className="wrap">
          <h2 id="pick-title" className="section-title">
            Find tonight’s game
          </h2>
          <p className="section-lede">Three taps, then we pull real boxes off our shelves. All from the Otter Chaos collection on BoardGameGeek.</p>
          <Picker />
        </div>
      </section>

      <LayoutGroup>
        <section className="section games__shelves" aria-labelledby="shelves-title">
          <div className="wrap">
            <p className="kicker">Have a browse</p>
            <h2 id="shelves-title" className="section-title">
              Off the shelves
            </h2>
            <p className="section-lede">
              A sample of {GAMES.length} from the library, sorted the way we sort it: casual party and icebreakers, co-operative puzzlers and heavy
              strategy. Tap a box.
            </p>
            {TIERS.map((t) => (
              <Shelf key={t.id} tier={t} onPick={setPicked} />
            ))}
            <div className="games__more">
              <p>{ABOUT.libraryNote}</p>
              <div className="games__more-actions">
                <a className="btn btn--small" href={ABOUT.fullLibrary} target="_blank" rel="noopener noreferrer">
                  The full library <ExternalIcon size={14} />
                </a>
                <a className="btn btn--small btn--ghost" href={CONTACT.phoneHref}>
                  Call to check a game
                </a>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {picked && (
            <motion.div className="boxmodal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPicked(null)}>
              <div className="boxmodal__in" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={picked.name}>
                <BoxCard g={picked} onClose={() => setPicked(null)} shared />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <section className="section games__staff" aria-labelledby="staff-title">
        <div className="wrap games__staff-grid">
          <div className="games__staff-photo">
            <Photo k="playing" alt="Two people mid-game at a wooden table, cards and pieces spread out" sizes="(min-width: 900px) 460px, 100vw" />
          </div>
          <div>
            <h2 id="staff-title" className="section-title">
              Not sure? Ask whoever’s behind the bar.
            </h2>
            <figure className="quote">
              <blockquote>“{REVIEWS[0].text}”</blockquote>
              <figcaption>
                {REVIEWS[0].source}, {REVIEWS[0].date}
              </figcaption>
            </figure>
            <figure className="quote">
              <blockquote>“{REVIEWS[1].text}”</blockquote>
              <figcaption>
                {REVIEWS[1].source}, {REVIEWS[1].date}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
