import { Link } from 'react-router-dom';
import { GIFT_CARD, TABLE_FEE } from '../data/otterChaos';
import { GiftCardVisual } from '../components/GiftCardVisual';
import { Photo } from '../components/Photo';
import { Suit } from '../components/Suit';
import { ExternalIcon } from '../components/Icons';
import { money } from '../lib/fees';
import './GiftCards.css';

export function GiftCards() {
  return (
    <div className="page gift">
      <div className="wrap gift__grid">
        <header className="page-head">
          <p className="kicker kicker--pink">Gift cards</p>
          <h1>A night of chaos, in an envelope.</h1>
          <p>
            The {GIFT_CARD.name} comes in anything from {GIFT_CARD.range}. Tap the card to turn it over.
          </p>
          <div className="gift__actions">
            <a className="btn btn--die" href={GIFT_CARD.url} target="_blank" rel="noopener noreferrer">
              Buy on DesignMyNight <ExternalIcon size={16} />
            </a>
            <Link className="btn btn--ghost" to="/book">
              Or book a table
            </Link>
          </div>
        </header>
        <div className="gift__card">
          <GiftCardVisual />
        </div>
      </div>

      <section className="section" aria-labelledby="gc-what">
        <div className="wrap gift__cols">
          <div className="gift__box">
            <h2 id="gc-what">What it covers</h2>
            <ul>
              {GIFT_CARD.covers.map((c, i) => (
                <li key={c}>
                  <Suit kind={(['spade', 'heart', 'club'] as const)[i % 3]} size={16} />
                  {c}
                </li>
              ))}
            </ul>
            <p className="note">
              For scale: three hours at the table is {money(TABLE_FEE.adult.threeHours)} a head, and a pizza is £10–£13.
            </p>
          </div>
          <div className="gift__box">
            <h2>The small print</h2>
            <ul>
              {GIFT_CARD.terms.map((t) => (
                <li key={t}>
                  <Suit kind="diamond" size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="note">{GIFT_CARD.redeem}</p>
          </div>
          <div className="gift__photo">
            <Photo k="hot-choc" alt="A blue mug of hot chocolate piled with marshmallows on the bar" sizes="(min-width: 900px) 320px, 100vw" />
          </div>
        </div>
      </section>
    </div>
  );
}
