import { useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BOOKING_COPY, CONTACT, KITCHEN_HOURS, TABLE_FEE } from '../data/otterChaos';
import { useLondonNow } from '../lib/useNow';
import { addDays, cafeHoursFor, dateLong, dateShort, dayShort, eventsOn, fmtMin, weekdayOf } from '../lib/time';
import { money, tableFee } from '../lib/fees';
import { DieFace } from '../components/DieFace';
import { Photo } from '../components/Photo';
import { PhoneIcon } from '../components/Icons';
import { ChessStrip } from '../components/ChessStrip';
import { useChaos } from '../components/Chaos';
import './Book.css';

function Stepper({ label, sub, value, min, max, onChange, die }: { label: string; sub: string; value: number; min: number; max: number; onChange: (n: number) => void; die?: boolean }) {
  return (
    <div className="stepper">
      <div>
        <p className="stepper__label">{label}</p>
        <p className="note">{sub}</p>
      </div>
      <div className="stepper__ctrl">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`One fewer ${label.toLowerCase()}`}>
          −
        </button>
        <span className="stepper__val" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="stepper__face"
            >
              {die && value >= 1 && value <= 6 ? <DieFace n={value} size={46} /> : <strong>{value}</strong>}
            </motion.span>
          </AnimatePresence>
          <span className="sr-only">{value}</span>
        </span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`One more ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  );
}

function slotsFor(key: string, nowKey: string, nowMin: number) {
  const [open, close] = cafeHoursFor(key);
  const out: number[] = [];
  for (let m = open; m <= close - 60; m += 30) {
    if (key === nowKey && m <= nowMin + 15) continue;
    out.push(m);
  }
  return out;
}

export function Book() {
  const now = useLondonNow();
  const [params] = useSearchParams();
  const initialParty = Math.min(Math.max(Number(params.get('party')) || 2, 1), 20);
  const days = useMemo(() => Array.from({ length: 21 }, (_, i) => addDays(now.key, i)), [now.key]);
  const paramDate = params.get('date');
  const firstBookable = days.find((d) => slotsFor(d, now.key, now.min).length) ?? days[1];

  const [adults, setAdults] = useState(initialParty);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState(paramDate && days.includes(paramDate) && slotsFor(paramDate, now.key, now.min).length ? paramDate : firstBookable);
  const slots = slotsFor(date, now.key, now.min);
  const [time, setTime] = useState<number | null>(null);
  const [hours, setHours] = useState(3);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const { chaos } = useChaos();

  const chosenTime = time !== null && slots.includes(time) ? time : null;
  const events = eventsOn(date);
  const kitchen = KITCHEN_HOURS[weekdayOf(date)];
  const [, close] = cafeHoursFor(date);
  const maxHours = chosenTime !== null ? Math.floor((close - chosenTime) / 60) : 3;
  const stay = Math.max(1, Math.min(hours, maxHours));
  const fee = tableFee(adults, kids, stay);
  const kitchenNote =
    chosenTime !== null && !kitchen.some(([a, b]) => chosenTime >= a && chosenTime < b)
      ? `Heads up: the kitchen isn’t serving at ${fmtMin(chosenTime)}. It’s on ${kitchen.map(([a, b]) => `${fmtMin(a)}–${fmtMin(b)}`).join(' and ')} that day.`
      : null;

  const canSend = chosenTime !== null && form.name.trim() && (form.email.includes('@') || form.phone.trim().length >= 6);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setSent(true);
    window.scrollTo({ top: 0 });
    chaos();
  }

  if (sent && chosenTime !== null) {
    return (
      <div className="page book">
        <div className="wrap">
          <motion.div className="booked" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <DieFace n={6} size={64} />
            <p className="kicker kicker--pink">Checkmate! Well, nearly</p>
            <h1>See you {date === now.key ? 'later' : dateLong(date)}, {form.name.split(' ')[0]}!</h1>
            <dl className="booked__summary">
              <div>
                <dt>When</dt>
                <dd>
                  {dateLong(date)}, {fmtMin(chosenTime)} for {stay} hour{stay > 1 ? 's' : ''}
                </dd>
              </div>
              <div>
                <dt>Who</dt>
                <dd>
                  {adults} adult{adults !== 1 ? 's' : ''}
                  {kids ? `, ${kids} under-16${kids !== 1 ? 's' : ''}` : ''}
                </dd>
              </div>
              <div>
                <dt>Table fee</dt>
                <dd>{money(fee.total)}, added to your bill on the night</dd>
              </div>
            </dl>
            <p>{BOOKING_COPY.confirm}</p>
            <p className="note">This is a demo, so nothing has actually been sent. On the live site this request would go straight into Otter Chaos’s {BOOKING_COPY.provider} bookings.</p>
            <div className="booked__actions">
              <Link to="/menu" className="btn btn--die">
                Plan your pizzas
              </Link>
              <Link to={`/games?players=${adults + kids}#picker`} className="btn btn--ghost">
                Pick a game
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="page book">
      <div className="wrap book__grid">
        <div className="book__main">
          <header className="page-head">
            <p className="kicker kicker--blue">Book a table</p>
            <h1>Make your move.</h1>
            <p>{BOOKING_COPY.always}</p>
          </header>

          <div className="book__chess">
            <ChessStrip />
          </div>

          <p className="book__rates">
            <strong>Table fee per person:</strong> adults {money(TABLE_FEE.adult.perHour)}/hour or {money(TABLE_FEE.adult.threeHours)} for 3 hours,
            under-16s {money(TABLE_FEE.child.perHour)}/hour or {money(TABLE_FEE.child.threeHours)} for 3 hours. It keeps the library going.
          </p>

          <form onSubmit={submit} className="book__form" noValidate>
            <fieldset className="book__set">
              <legend>
                <span className="move">1</span> How many of you?
              </legend>
              <Stepper label="Adults" sub="16 and over" value={adults} min={1} max={20} onChange={setAdults} die />
              <Stepper label="Children" sub="Under 16" value={kids} min={0} max={12} onChange={setKids} />
            </fieldset>

            <fieldset className="book__set">
              <legend>
                <span className="move">2</span> Which day?
              </legend>
              <div className="dates" role="radiogroup" aria-label="Date">
                {days.map((d, i) => {
                  const ev = eventsOn(d);
                  const off = slotsFor(d, now.key, now.min).length === 0;
                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={d === date}
                      key={d}
                      disabled={off}
                      className={`date ${d === date ? 'is-on' : ''}`}
                      onClick={() => {
                        setDate(d);
                        setTime(null);
                      }}
                    >
                      <span>{i === 0 ? 'Today' : i === 1 ? 'Tmrw' : dayShort(d)}</span>
                      <strong>{Number(d.slice(8))}</strong>
                      <em>{dateShort(d).split(' ')[1]}</em>
                      {ev.length > 0 && <i aria-label={ev.map((o) => o.event.name).join(', ')} />}
                    </button>
                  );
                })}
              </div>
              {events.length > 0 && (
                <p className="book__on">
                  On {dateLong(date)}:{' '}
                  {events.map((o, i) => (
                    <span key={o.event.id}>
                      {i > 0 && ', '}
                      <strong>{o.event.name}</strong> from {fmtMin(o.startMin)}
                    </span>
                  ))}
                  . <Link to="/events">Details</Link>
                </p>
              )}
            </fieldset>

            <fieldset className="book__set">
              <legend>
                <span className="move">3</span> What time?
              </legend>
              <div className="slots" role="radiogroup" aria-label="Arrival time">
                {slots.map((m) => (
                  <button type="button" role="radio" aria-checked={m === chosenTime} key={m} className={`chip ${m === chosenTime ? 'is-on' : ''}`} aria-pressed={m === chosenTime} onClick={() => setTime(m)}>
                    {fmtMin(m)}
                  </button>
                ))}
              </div>
              {kitchenNote && <p className="book__warn">{kitchenNote}</p>}
            </fieldset>

            <fieldset className="book__set">
              <legend>
                <span className="move">4</span> How long are you staying?
              </legend>
              <div className="hours">
                {[1, 2, 3].map((n) => (
                  <button type="button" key={n} className={`hour ${n === stay ? 'is-on' : ''}`} aria-pressed={n === stay} disabled={n > maxHours} onClick={() => setHours(n)}>
                    <strong>
                      {n} hour{n > 1 ? 's' : ''}
                    </strong>
                    <span>{money(tableFee(1, 0, n).adultEach)} per adult</span>
                    {n === 3 && <em>Best value</em>}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="book__set">
              <legend>
                <span className="move">5</span> Who’s booking?
              </legend>
              <div className="book__fields">
                <div className="field">
                  <label htmlFor="b-name">Name</label>
                  <input id="b-name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="b-email">Email</label>
                  <input id="b-email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="b-phone">Mobile</label>
                  <input id="b-phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="b-notes">Anything we should know?</label>
                  <textarea id="b-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Birthday, a game you’re after, access needs…" />
                </div>
              </div>
            </fieldset>

            <div className="feebar" aria-live="polite">
              <span>
                Table fee <strong>{money(fee.total)}</strong>
              </span>
              <span className="note">
                {adults + kids} {adults + kids === 1 ? 'person' : 'people'} · {stay}h · no service charge
              </span>
            </div>

            <div className="book__submit">
              <button className="btn btn--die btn--block" type="submit" disabled={!canSend}>
                {chosenTime === null ? 'Pick a time first' : `Make your move: ${fmtMin(chosenTime)}, ${dateShort(date)}`}
              </button>
              <p className="note">{BOOKING_COPY.confirm}</p>
              <p className="note">
                Rather talk to a human? Call{' '}
                <a href={CONTACT.phoneHref}>
                  <PhoneIcon size={14} /> {CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
          </form>
        </div>

        <aside className="book__side">
          <div className="fee">
            <p className="kicker">Table fee, up front</p>
            <p className="fee__total">
              <motion.span key={fee.total} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                {money(fee.total)}
              </motion.span>
              <span className="fee__for">
                for {adults + kids} {adults + kids === 1 ? 'person' : 'people'}, {stay} hour{stay > 1 ? 's' : ''}
              </span>
            </p>
            <ul className="fee__lines">
              <li>
                {adults} × adult at {money(fee.adultEach)}
              </li>
              {kids > 0 && (
                <li>
                  {kids} × child at {money(fee.childEach)}
                </li>
              )}
            </ul>
            <p className="note">{TABLE_FEE.why}</p>
            <table className="fee__table">
              <thead>
                <tr>
                  <th />
                  <th>Per hour</th>
                  <th>3 hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{TABLE_FEE.adult.label}</th>
                  <td>{money(TABLE_FEE.adult.perHour)}</td>
                  <td>{money(TABLE_FEE.adult.threeHours)}</td>
                </tr>
                <tr>
                  <th>{TABLE_FEE.child.label}</th>
                  <td>{money(TABLE_FEE.child.perHour)}</td>
                  <td>{money(TABLE_FEE.child.threeHours)}</td>
                </tr>
              </tbody>
            </table>
            <p className="note">{TABLE_FEE.noServiceCharge}</p>
          </div>
          <div className="book__photo">
            <Photo k="splendor" alt="A game of Splendor laid out on a butcher-block table in front of the shelves" sizes="(min-width: 1000px) 380px, 100vw" />
          </div>
        </aside>
      </div>
    </div>
  );
}
