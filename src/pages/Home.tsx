import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ABOUT,
  CONTACT,
  COCKTAIL_DEAL,
  COCKTAILS,
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
import { RollForAGame } from '../components/RollForAGame';
import { SignupButtons } from '../components/SignupButtons';
import { useOpenStatus } from '../components/StatusPill';
import { StickerHero } from '../components/StickerHero';
import { Ticker } from '../components/Ticker';
import { ScrabbleWord } from '../components/ScrabbleWord';
import { Bunting } from '../components/Bunting';
import { ABoard } from '../components/ABoard';
import { ScatteredBits } from '../components/ScatteredBits';
import { Suit } from '../components/Suit';
import { useChaos } from '../components/Chaos';
import { ArrowIcon, PhoneIcon } from '../components/Icons';
import { addDays, dayLong, eventsOn, fmtMin, occurrenceStatus, upcomingDays, type Occurrence } from '../lib/time';
import { money } from '../lib/fees';
import './Home.css';

function Tonight() {
  const { now, cafe, cafeText, kitchenText } = useOpenStatus();
  const today = eventsOn(now.key).map((o) => ({ o, s: occurrenceStatus(o, now) }));
  const current = today.filter((t) => t.s !== 'earlier');
  const isEvening = now.min >= 16 * 60;

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
    <div className="tonight pop">
      <div className={`tonight__status ${cafe.open ? 'is-open' : ''}`}>
        <span className="tonight__dot" aria-hidden="true" />
        <div>
          <p className="tonight__open">{cafe.open ? 'We’re open!' : 'Closed right now'}</p>
          <p className="tonight__sub">
            {cafe.open ? `Till ${fmtMin(cafe.until!)}` : cafeText.replace('Closed · ', '')} · {kitchenText}
          </p>
        </div>
      </div>
      <div className="tonight__on">
        <p className="tonight__k">{isEvening ? 'Tonight' : 'Today'}</p>
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
              {cafe.open ? 'No event on. All 500+ games are yours.' : today.length ? 'That’s it for today.' : 'No event on today.'}
            </p>
            {next && (
              <p className="tonight__event-meta">
                Next up: <strong>{next.event.name}</strong>, {next.key === addDays(now.key, 1) ? 'tomorrow' : dayLong(next.key)}{' '}
                {fmtMin(next.startMin)}
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
      <p className="party__q">Or tell us how many of you there are:</p>
      <div className="party__dice">
        {[2, 3, 4, 5, 6].map((n) => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.85, rotate: -15 }}
            whileHover={{ rotate: 8, y: -4 }}
            onClick={() => navigate(`/games?players=${n}#picker`)}
            aria-label={`${n}${n === 6 ? ' or more' : ''} players`}
          >
            <DieFace n={n} size={48} />
            <span>{n === 6 ? '6+' : n}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  const fee = TABLE_FEE;
  const { burst } = useChaos();
  const pop = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 12, 0.8);
  };

  return (
    <div className="home">
      <section className="hero">
        <ScatteredBits count={4} opacity={0.85} />
        <div className="wrap hero__grid">
          <div className="hero__left">
            <StickerHero />
            <h1 className="hero__title">
              Fun, food &amp; friendship, <span>under Brixton station.</span>
            </h1>
          </div>

          <div className="hero__right">
            <Tonight />
            <div className="hero__actions">
              <Link to="/book" className="btn btn--die hero__book" onClick={pop}>
                Book a table <ArrowIcon size={18} />
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn--ghost">
                <PhoneIcon size={18} /> Call
              </a>
            </div>
            <p className="hero__fee">
              <span className="hero__fee-tag">Table fee</span> {money(fee.adult.perHour)} an hour or {money(fee.adult.threeHours)} for three
              (under-16s {money(fee.child.perHour)} / {money(fee.child.threeHours)}). We <em>always</em> recommend booking ahead!
            </p>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="section place" aria-labelledby="place-title">
        <div className="wrap place__grid">
          <div className="place__photo">
            <ArchFrame ratio={1.3}>
              <Photo
                k="arch-wide"
                alt="Inside the arch: fairy lights under the white curved ceiling, wooden booths, long tables and shelves of games up to the roof"
                sizes="(min-width: 900px) 560px, 100vw"
              />
            </ArchFrame>
            <span className="sticker place__s1" aria-hidden="true">
              500+
              <small>games</small>
            </span>
            <span className="sticker place__s2" aria-hidden="true">
              trains
              <small>overhead</small>
            </span>
          </div>
          <div>
            <p className="kicker kicker--blue">Two railway arches</p>
            <h2 id="place-title" className="section-title">
              Bring your family, a couple of friends, or the whole gang.
            </h2>
            <p className="section-lede">{ABOUT.lines[0]} Anything from the silliest of party games to the most involved heavy strategy games.</p>
            <p className="section-lede place__who">{ABOUT.whoRunsIt} (&gt;ᴗ•)</p>
          </div>
        </div>
      </section>

      <section className="section wall home-week" aria-labelledby="week-title">
        <div className="wrap">
          <div className="home-week__head">
            <div>
              <p className="kicker">What’s on</p>
              <h2 id="week-title" className="section-title">
                Something on most nights.
              </h2>
              <p className="section-lede">“{ABOUT.cheeky}”</p>
            </div>
            <Link to="/events" className="btn btn--yellow btn--small">
              All events
            </Link>
          </div>
          <WeekStrip />
        </div>
      </section>

      <section className="section home-games" aria-labelledby="games-title">
        <div className="wrap home-games__grid">
          <div>
            <p className="kicker kicker--pink">500+ games</p>
            <h2 id="games-title" className="section-title">
              Roll for it.
            </h2>
            <p className="section-lede">From the silliest of party games to the most involved heavy strategy. Staff will happily help you choose.</p>
            <RollForAGame />
            <PartyPicker />
          </div>
          <figure className="quote pop">
            <blockquote>“{REVIEWS[0].text}”</blockquote>
            <figcaption>
              {REVIEWS[0].source}, {REVIEWS[0].date}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section home-food" aria-labelledby="food-title">
        <div className="wrap">
          <div className="home-food__head">
            <div>
              <p className="kicker">Tap the tiles</p>
              <ScrabbleWord word="Pizza" size="lg" />
              <h2 id="food-title" className="home-food__title">
                Sourdough pizzas, named after games.
              </h2>
              <p className="section-lede">Tap a pizza to see which game it’s named after. Vegan mozzarella and gluten-free bases on request.</p>
            </div>
          </div>
          <div className="pizza-row">
            {PIZZAS.filter((p) => p.game).map((p, i) => (
              <PizzaCard key={p.name} pizza={p} index={i} />
            ))}
          </div>

          <div className="deal pop">
            <div className="deal__photo">
              <Photo k="cocktail-otter" alt="An orange cocktail in a coupe on the bar, next to a plush otter holding a fish" sizes="(min-width: 900px) 300px, 40vw" />
            </div>
            <div className="deal__copy">
              <span className="sticker deal__burst" aria-hidden="true">
                2 for
                <small>{money(COCKTAIL_DEAL.twoSame)}</small>
              </span>
              <p className="deal__big">Cocktails: one for {money(COCKTAIL_DEAL.one)}, two of the same for {money(COCKTAIL_DEAL.twoSame)}.</p>
              <p className="note">
                {COCKTAILS.length} on the list, plus Welsh mead, Battersea beer on tap and proper mocktails.
              </p>
              <Link to="/menu" className="btn btn--pink btn--small">
                See the whole menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-hire" aria-labelledby="hire-title">
        <Bunting />
        <div className="section">
          <div className="wrap home-hire__grid">
            <div className="home-hire__photo">
              <ArchFrame ratio={0.82} lights={false}>
                <Photo k="takeover" alt="Switch Off, Game On: the arch painted orange with branded tables for the two-day event" sizes="(min-width: 900px) 420px, 90vw" />
              </ArchFrame>
            </div>
            <div>
              <p className="kicker kicker--pink">Parties &amp; takeovers</p>
              <h2 id="hire-title" className="section-title">
                Two arches. Bring the whole gang.
              </h2>
              <p className="section-lede">{HIRE.pitch}</p>
              <ul className="hire-kinds">
                {HIRE.kinds.map((k, i) => (
                  <li key={k.id} style={{ rotate: `${i % 2 ? 2 : -2}deg` }}>
                    <Suit kind={k.suit} size={16} /> {k.title}
                  </li>
                ))}
              </ul>
              <Link to="/hire" className="btn btn--die">
                Plan a party <ArrowIcon size={18} />
              </Link>
            </div>
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
              {GIFT_CARD.range}, valid 12 months, and good for table fees, food, drinks and the games we sell. Spend it over as many visits as
              you like.
            </p>
            <div className="home-gift__actions">
              <a className="btn btn--yellow" href={GIFT_CARD.url} target="_blank" rel="noopener noreferrer">
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
          <ABoard />
          <div>
            <p className="kicker kicker--sky">Finding us</p>
            <h2 id="visit-title" className="section-title">
              Look for this under the arches.
            </h2>
            <p className="section-lede">{GETTING_HERE.line}</p>
            <address className="home-visit__addr">{CONTACT.address.join(', ')}</address>
            <div className="home-visit__actions">
              <a className="btn btn--small btn--blue" href={CONTACT.googleMaps}>
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
        </div>
      </section>
    </div>
  );
}
