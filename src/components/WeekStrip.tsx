import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLondonNow } from '../lib/useNow';
import {
  cafeHoursFor,
  dateShort,
  dayShort,
  fmtMin,
  occurrenceStatus,
  relativeDay,
  upcomingDays,
  type Occurrence,
} from '../lib/time';
import { img } from '../lib/img';
import { EventArt } from './EventArt';
import { Suit } from './Suit';

const SUITS = ['heart', 'spade', 'diamond', 'club'] as const;
// dealt by hand, so never quite straight
const TILTS = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8];
import { SignupButtons } from './SignupButtons';
import './WeekStrip.css';

function Occ({ o, status }: { o: Occurrence; status: ReturnType<typeof occurrenceStatus> }) {
  const e = o.event;
  return (
    <div className={`occ ${status === 'earlier' ? 'is-earlier' : ''}`}>
      <div className="occ__art">
        {e.photo ? <img src={img(e.photo, 480)} alt="" loading="lazy" /> : <EventArt art={e.art} />}
      </div>
      <div className="occ__body">
        <p className="occ__when">
          {status === 'earlier' ? `Was at ${fmtMin(o.startMin)}` : status === 'on' ? `On now · from ${fmtMin(o.startMin)}` : fmtMin(o.startMin)}
          <span className="occ__price">
            {e.price}
            {e.priceNote ? ` ${e.priceNote}` : ''}
          </span>
        </p>
        <h3 className="occ__name">{e.name}</h3>
        {e.kind === 'one-off' && e.presentedBy && <p className="occ__by">{e.presentedBy}</p>}
        {status !== 'earlier' && <SignupButtons event={e} />}
      </div>
    </div>
  );
}

export function WeekStrip({ days = 14 }: { days?: number }) {
  const now = useLondonNow();
  const list = upcomingDays(now, days);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 12;
      setActive(Math.round(el.scrollLeft / step));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="week">
      <div className="week__index" role="tablist" aria-label="Pick a day">
        {list.map((d, i) => (
          <button
            key={d.key}
            role="tab"
            aria-selected={i === active}
            className={`week__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => go(i)}
          >
            <span>{i === 0 ? 'Today' : dayShort(d.key)}</span>
            <strong>{Number(d.key.slice(8))}</strong>
            <i className={d.occurrences.length ? 'has-event' : ''} aria-hidden="true" />
          </button>
        ))}
      </div>

      <ol className="week__track" ref={track}>
        {list.map((d, i) => {
          const [open, close] = cafeHoursFor(d.key);
          const visible = d.occurrences.map((o) => ({ o, s: occurrenceStatus(o, now) }));
          const allDone = visible.length > 0 && visible.every((v) => v.s === 'earlier');
          return (
            <motion.li
              key={d.key}
              className={`day ${i === 0 ? 'is-today' : ''}`}
              style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
              initial={{ opacity: 0, x: 60, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: Math.min(i, 5) * 0.06, duration: 0.4 }}
            >
              <span className="day__corner" aria-hidden="true">
                <b>{Number(d.key.slice(8))}</b>
                <Suit kind={SUITS[i % 4]} size={14} />
              </span>
              <header className="day__head">
                <p className="day__rel">{i === 0 ? (now.min >= 17 * 60 ? 'Tonight' : 'Today') : relativeDay(d.key, now.key)}</p>
                <p className="day__date">{dateShort(d.key)}</p>
                <p className="day__hours">
                  Open {fmtMin(open)}–{fmtMin(close)}
                </p>
              </header>
              {visible.length === 0 ? (
                <div className="day__free">
                  <p className="day__free-title">No event on.</p>
                  <p>Just you, your mates and 500-odd games from {fmtMin(open)}.</p>
                  <Link className="btn btn--yellow btn--small" to={`/book?date=${d.key}`}>
                    Book a table
                  </Link>
                </div>
              ) : (
                <div className="day__occs">
                  {visible.map(({ o, s }) => (
                    <Occ key={o.event.id} o={o} status={s} />
                  ))}
                  {allDone && (
                    <p className="day__after">
                      Tables free for open play till {fmtMin(close)}.{' '}
                      <Link to={`/book?date=${d.key}`}>Book one</Link>
                    </p>
                  )}
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
      <div className="week__arrows">
        <button onClick={() => go(Math.max(active - 1, 0))} aria-label="Previous day">
          ←
        </button>
        <button onClick={() => go(Math.min(active + 1, list.length - 1))} aria-label="Next day">
          →
        </button>
      </div>
    </div>
  );
}
