import { Link } from 'react-router-dom';
import { CONTACT, HOURS_TABLE, PRESS } from '../data/otterChaos';
import { logo } from '../lib/img';
import { Suit } from './Suit';
import './Footer.css';

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div className="ftr__brand">
          <img src={logo(192)} alt="Otter Chaos otter logo" width="96" height="91" loading="lazy" />
          <div>
            <p className="ftr__name">Otter Chaos</p>
            <p className="ftr__tag">{CONTACT.tagline}</p>
          </div>
        </div>

        <div>
          <h2 className="ftr__h">Find us</h2>
          <address>
            {CONTACT.address.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </address>
          <p className="ftr__links">
            <a href={CONTACT.googleMaps}>Google Maps</a> · <a href={CONTACT.appleMaps}>Apple Maps</a> · <a href={CONTACT.citymapper}>Citymapper</a>
          </p>
        </div>

        <div>
          <h2 className="ftr__h">Get in touch</h2>
          <p>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p className="ftr__links">
            <a href={CONTACT.instagram.url}>Instagram</a> · <a href={CONTACT.tiktok.url}>TikTok</a> {CONTACT.instagram.handle}
          </p>
        </div>

        <div>
          <h2 className="ftr__h">Café hours</h2>
          <dl className="ftr__hours">
            {HOURS_TABLE.map((r) => (
              <div key={r.days}>
                <dt>{r.days}</dt>
                <dd>{r.cafe}</dd>
              </div>
            ))}
          </dl>
          <p className="ftr__links">
            <Link to="/visit">Kitchen hours &amp; access</Link>
          </p>
        </div>

        <div className="ftr__press">
          <h2 className="ftr__h">Written up in</h2>
          <ul>
            {PRESS.map((p) => (
              <li key={p.url}>
                <a href={p.url}>{p.outlet}</a>: {p.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap ftr__base">
        <span className="ftr__suits" aria-hidden="true">
          <Suit kind="spade" size={14} />
          <Suit kind="heart" size={14} />
          <Suit kind="club" size={14} />
          <Suit kind="diamond" size={14} />
        </span>
        <span>© Otter Chaos Ltd</span>
        <span>Site by AlexWilder-Dev</span>
      </div>
    </footer>
  );
}
