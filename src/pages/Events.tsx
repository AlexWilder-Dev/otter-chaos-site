import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ABOUT, EVENTS_COPY, MONTHLY_EVENTS, WEEKLY_EVENTS, type AnyEvent } from '../data/otterChaos';
import { useLondonNow } from '../lib/useNow';
import { addDays, dateLong, fmtTime, nextDateFor, upcomingOneOffs, type LondonNow } from '../lib/time';
import { img } from '../lib/img';
import { WeekStrip } from '../components/WeekStrip';
import { EventArt } from '../components/EventArt';
import { SignupButtons } from '../components/SignupButtons';
import './Events.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function when(e: AnyEvent) {
  const t = `${fmtTime(e.start)}${e.end ? `–${fmtTime(e.end)}` : ''}`;
  if (e.kind === 'weekly') return `Every ${DAYS[e.weekday]} · ${t}`;
  if (e.kind === 'monthly') return `${e.ruleLabel} · ${t}`;
  return t;
}

function nextLabel(key: string | null, now: LondonNow) {
  if (!key) return null;
  if (key === now.key) return 'Today';
  if (key === addDays(now.key, 1)) return 'Tomorrow';
  return dateLong(key);
}

function EventCard({ e, now, i }: { e: AnyEvent; now: LondonNow; i: number }) {
  const next = nextLabel(nextDateFor(e, now), now);
  return (
    <motion.article
      className={`ecard ecard--${e.kind}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ delay: (i % 3) * 0.06 }}
    >
      <div className="ecard__art">
        {e.photo ? <img src={img(e.photo, 480)} alt="" loading="lazy" /> : <EventArt art={e.art} />}
      </div>
      <div className="ecard__body">
        <p className="ecard__when">{when(e)}</p>
        <h3 className="ecard__name">{e.name}</h3>
        {e.kind === 'one-off' && e.presentedBy && <p className="ecard__by">{e.presentedBy}</p>}
        <p className="ecard__price">
          {e.price}
          {e.priceNote ? ` ${e.priceNote}` : ''}
        </p>
        {e.blurb.map((b) => (
          <p key={b} className="ecard__blurb">
            {b}
          </p>
        ))}
        <p className="ecard__how">{e.howToJoin}</p>
        {next && e.kind !== 'one-off' && <p className="ecard__next">Next: {next}</p>}
        <SignupButtons event={e} />
        {e.kind === 'monthly' && e.extra && (
          <a className="ecard__extra" href={e.extra.url}>
            {e.extra.label}
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function Events() {
  const now = useLondonNow();
  const oneOffs = upcomingOneOffs(now);
  const weekly = [...WEEKLY_EVENTS].sort((a, b) => ((a.weekday + 6) % 7) - ((b.weekday + 6) % 7));

  return (
    <div className="page events">
      <div className="wrap">
        <header className="page-head">
          <p className="kicker">What’s on</p>
          <h1>Something on most nights. Every one of them, here.</h1>
          <p>
            {ABOUT.cheeky} (&gt;ᴗ•) {EVENTS_COPY.intro}
          </p>
        </header>
      </div>

      <section className="wall section events__week" aria-labelledby="ew">
        <div className="wrap">
          <h2 id="ew" className="section-title">
            The next two weeks
          </h2>
          <p className="section-lede">Today first. Swipe along for the fortnight.</p>
          <div style={{ marginTop: 18 }}>
            <WeekStrip />
          </div>
        </div>
      </section>

      {oneOffs.length > 0 && (
        <section className="section" aria-labelledby="oneoffs">
          <div className="wrap">
            <p className="kicker">One-offs</p>
            <h2 id="oneoffs" className="section-title">
              Don’t miss these
            </h2>
            <div className="egrid egrid--oneoff">
              {oneOffs.map((e, i) => (
                <div key={e.id} className="oneoff">
                  <p className="oneoff__date">
                    <strong>{nextLabel(e.date, now)}</strong>
                  </p>
                  <EventCard e={e} now={now} i={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="weekly">
        <div className="wrap">
          <p className="kicker">Every week</p>
          <h2 id="weekly" className="section-title">
            The regulars
          </h2>
          <div className="egrid">
            {weekly.map((e, i) => (
              <EventCard key={e.id} e={e} now={now} i={i} />
            ))}
          </div>
        </div>
      </section>

      {MONTHLY_EVENTS.length > 0 && (
        <section className="section events__monthly" aria-labelledby="monthly">
          <div className="wrap">
            <p className="kicker">Every month</p>
            <h2 id="monthly" className="section-title">
              Last Sunday of the month
            </h2>
            <div className="egrid">
              {MONTHLY_EVENTS.map((e, i) => (
                <EventCard key={e.id} e={e} now={now} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="yours">
        <div className="wrap events__yours">
          <h2 id="yours" className="section-title">
            Want to run a night here?
          </h2>
          <p className="section-lede">
            Clubs, leagues, launches and tournaments: two arches, a kitchen, a bar and 500-odd games.
          </p>
          <Link to="/hire" className="btn btn--die">
            Talk to us about hire
          </Link>
        </div>
      </section>
    </div>
  );
}
