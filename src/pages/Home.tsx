import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ABOUT,
  CONTACT,
  COCKTAIL_DEAL,
  COCKTAILS,
  EVENTS_COPY,
  GETTING_HERE,
  GIFT_CARD,
  HIRE,
  PIZZAS,
  REVIEWS,
  TABLE_FEE,
} from '../data/otterChaos';
import { ArchFrame } from '../components/ArchFrame';
import { Photo } from '../components/Photo';
import { WeekStrip } from '../components/WeekStrip';
import { PizzaCard } from '../components/PizzaCard';
import { GiftCardVisual } from '../components/GiftCardVisual';
import { DieFace } from '../components/DieFace';
import { SignupButtons } from '../components/SignupButtons';
import { useOpenStatus } from '../components/StatusPill';
import { ArrowIcon, PhoneIcon, PinIcon } from '../components/Icons';
import { addDays, dayLong, eventsOn, fmtMin, occurrenceStatus, upcomingDays, type Occurrence } from '../lib/time';
import { money } from '../lib/fees';
import './Home.css';

function Tonight() {
  const { now, cafe, kitchen, cafeText, kitchenText } = useOpenStatus();
  const today = eventsOn(now.key).map((o) => ({ o, s: occurrenceStatus(o, now) }));
  const current = today.filter((t) => t.s !== 'earlier');
  const isEvening = now.min >= 16 * 60;

  // The next thing on after today, for when tonight is quiet
  let next: Occurrence | undefined;
  if (!current.length) {
    for (const d of upcomingDays(now, 10).slice(1)) {
      if (d.occurrences.length) {
        next = d.occurrences[0];
        break;
      }
    }
  }

  return (
    <div className="tonight">
      <div className="tonight__status">
        <span className={`tonight__dot ${cafe.open ? 'is-open' : ''}`} aria-hidden="true" />
        <div>
          <p className="tonight__open">{cafe.open ? 'Open now' : 'Closed right now'}</p>
          <p className="tonight__sub">
            {cafe.open ? `Café till ${fmtMin(cafe.until!)}` : cafeText.replace('Closed · ', 'Café ')} ·{' '}
            <span className={kitchen.open ? 'is-on' : ''}>{kitchenText}</span>
          </p>
        </div>
      </div>

      <div className="tonight__on">
        <p className="kicker">{isEvening ? 'Tonight' : 'Today'}</p>
        {current.length ? (
          current.map(({ o, s }) => (
            <div key={o.event.id} className="tonight__event">
              <p className="tonight__event-name">{o.event.name}</p>
              <p className="tonight__event-meta">
                {s === 'on' ? `On now, started ${fmtMin(o.startMin)}` : fmtMin(o.startMin)} · {o.event.price}
                {o.event.priceNote ? ` ${o.event.priceNote}` : ''}
              </p>
              <SignupButtons event={o.event} />
            </div>
          ))
        ) : (
          <div className="tonight__event">
            <p className="tonight__event-name">
              {cafe.open ? 'No event on. The whole library’s yours.' : today.length ? 'That’s it for today.' : 'No event on today.'}
            </p>
            {next && (
              <p className="tonight__event-meta">
                Next up: <strong>{next.event.name}</strong>,{' '}
                {next.key === addDays(now.key, 1) ? 'tomorrow' : dayLong(next.key)} {fmtMin(next.startMin)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PartyPicker() {
  const navigate = useNavigate();
  return (
    <div className="party">
      <p className="party__q">How many of you?</p>
      <div className="party__dice">
        {[2, 3, 4, 5, 6].map((n) => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.9, rotate: -8 }}
            whileHover={{ rotate: 6, y: -2 }}
            onClick={() => navigate(`/games?players=${n}#picker`)}
            aria-label={`${n}${n === 6 ? ' or more' : ''} players`}
          >
            <DieFace n={n} size={52} />
            <span>{n === 6 ? '6+' : n}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function useWide() {
  const q = '(min-width: 1000px)';
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return wide;
}

export function Home() {
  const fee = TABLE_FEE;
  const wide = useWide();
  return (
    <div className="home">
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__photo">
            <ArchFrame ratio={wide ? 0.95 : 1.55}>
              <Photo
                k="arch-wide"
                eager
                alt="Inside the arch: fairy lights strung under the white curved ceiling, wooden booths, long tables and shelves of games up to the roof"
                sizes="(min-width: 1000px) 560px, 100vw"
              />
            </ArchFrame>
          </div>

          <div className="hero__copy">
            <p className="kicker hero__kicker">
              <PinIcon size={15} /> Arch 22, Atlantic Road · Brixton
            </p>
            <h1 className="hero__title">
              Over 500 games, <span>under Brixton station.</span>
            </h1>

            <Tonight />

            <div className="hero__actions">
              <Link to="/book" className="btn btn--die hero__book">
                Book a table <ArrowIcon size={18} />
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn--ghost">
                <PhoneIcon size={18} /> Call
              </a>
            </div>

            <p className="hero__fee">
              <strong>Table fee</strong> per person: {money(fee.adult.perHour)}/hour or {money(fee.adult.threeHours)} for 3 hours ·
              under-16s {money(fee.child.perHour)}/hour or {money(fee.child.threeHours)} for 3. We <em>always</em> recommend booking
              ahead.
            </p>
          </div>
        </div>
      </section>

      <section className="section wall home-week" aria-labelledby="week-title">
        <div className="wrap">
          <div className="home-week__head">
            <div>
              <p className="kicker">What’s on</p>
              <h2 id="week-title" className="section-title">
                Starting today
              </h2>
              <p className="section-lede">
                “{ABOUT.cheeky}” (&gt;ᴗ•) {EVENTS_COPY.intro.replace('To attend our events you', 'You')}
              </p>
            </div>
            <Link to="/events" className="btn btn--chalk btn--small">
              All events
            </Link>
          </div>
          <WeekStrip />
        </div>
      </section>

      <section className="section home-games" aria-labelledby="games-title">
        <div className="wrap home-games__grid">
          <div>
            <p className="kicker">Games library</p>
            <h2 id="games-title" className="section-title">
              From the silliest party games to the heaviest strategy.
            </h2>
            <p className="section-lede">
              Tell us how many you are, how long you’ve got and what kind of evening you’re after. We’ll pull a few real boxes off our
              shelves.
            </p>
            <PartyPicker />
            <figure className="quote">
              <blockquote>“{REVIEWS[0].text}”</blockquote>
              <figcaption>
                {REVIEWS[0].source}, {REVIEWS[0].date}
              </figcaption>
            </figure>
          </div>
          <div className="home-games__photo">
            <ArchFrame ratio={0.8} bricks={false}>
              <Photo k="shelf-wall" alt="Floor-to-ceiling birch shelves packed with game boxes, with a table of players in front" sizes="(min-width: 900px) 420px, 90vw" />
            </ArchFrame>
          </div>
        </div>
      </section>

      <section className="section home-food" aria-labelledby="food-title">
        <div className="wrap">
          <div className="home-food__head">
            <div>
              <p className="kicker">Kitchen &amp; bar</p>
              <h2 id="food-title" className="section-title">
                Sourdough pizzas, named after games.
              </h2>
              <p className="section-lede">Tap a pizza to see which game it’s named after. Vegan mozzarella and gluten-free bases on request.</p>
            </div>
            <Link to="/menu" className="btn btn--ghost btn--small">
              Full menu
            </Link>
          </div>
          <div className="pizza-row">
            {PIZZAS.filter((p) => p.game).map((p, i) => (
              <PizzaCard key={p.name} pizza={p} index={i} />
            ))}
          </div>

          <div className="deal">
            <div className="deal__photo">
              <Photo k="cocktail-otter" alt="An orange cocktail in a coupe on the bar, next to a plush otter holding a fish" sizes="(min-width: 900px) 300px, 40vw" />
            </div>
            <div className="deal__copy">
              <p className="kicker">Cocktails</p>
              <p className="deal__big">
                One for {money(COCKTAIL_DEAL.one)}
                <br />
                Two of the same for {money(COCKTAIL_DEAL.twoSame)}
              </p>
              <p className="note">{COCKTAILS.length} on the list, from Margaritas to a Corpse Reviver no. 2. Plus Welsh mead, Battersea beer on tap and proper mocktails.</p>
              <Link to="/menu#cocktails" className="btn btn--small">
                See the drinks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-hire" aria-labelledby="hire-title">
        <div className="wrap home-hire__grid">
          <div className="home-hire__photo">
            <ArchFrame ratio={0.82} lights={false}>
              <Photo
                k="takeover"
                alt="Switch Off, Game On: the arch painted orange with branded tables for the two-day event"
                sizes="(min-width: 900px) 420px, 90vw"
              />
            </ArchFrame>
          </div>
          <div>
            <p className="kicker">Private hire</p>
            <h2 id="hire-title" className="section-title">
              Two railway arches. Book some, or take over the lot.
            </h2>
            <p className="section-lede">{HIRE.pitch}</p>
            <ul className="hire-kinds">
              {HIRE.kinds.map((k) => (
                <li key={k.id}>{k.title}</li>
              ))}
            </ul>
            <Link to="/hire" className="btn btn--die">
              Plan an event <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-gift" aria-labelledby="gift-title">
        <div className="wrap home-gift__grid">
          <GiftCardVisual />
          <div>
            <p className="kicker">Gift cards</p>
            <h2 id="gift-title" className="section-title">
              Give someone a night of chaos.
            </h2>
            <p className="section-lede">
              {GIFT_CARD.range}, valid 12 months, and good for table fees, food, drinks and the games we sell. Spend it across as many visits
              as you like.
            </p>
            <div className="home-gift__actions">
              <a className="btn" href={GIFT_CARD.url} target="_blank" rel="noopener noreferrer">
                Buy on DesignMyNight
              </a>
              <Link to="/gift-cards" className="btn btn--ghost">
                How they work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-visit" aria-labelledby="visit-title">
        <div className="wrap home-visit__grid">
          <div>
            <p className="kicker">Finding us</p>
            <h2 id="visit-title" className="section-title">
              Look for the A-board under the arches.
            </h2>
            <p className="section-lede">{GETTING_HERE.line}</p>
            <address className="home-visit__addr">
              {CONTACT.address.join(', ')}
            </address>
            <div className="home-visit__actions">
              <a className="btn btn--small" href={CONTACT.googleMaps}>
                Google Maps
              </a>
              <a className="btn btn--small btn--ghost" href={CONTACT.appleMaps}>
                Apple Maps
              </a>
              <a className="btn btn--small btn--ghost" href={CONTACT.citymapper}>
                Citymapper
              </a>
            </div>
            <p className="note home-visit__access">
              Wheelchair access and accessible toilets. <Link to="/visit">Access, hours and more</Link>
            </p>
          </div>
          <div className="home-visit__photo">
            <ArchFrame ratio={1.3} lights={false} bricks={false}>
              <Photo
                k="outside-night"
                alt="Otter Chaos at night from Atlantic Road: the lit sign, a full room behind the glass and a chalk A-board reading Board Games + Beer On Tap + Pizza"
                sizes="(min-width: 900px) 520px, 100vw"
              />
            </ArchFrame>
          </div>
        </div>
      </section>
    </div>
  );
}
