import { Link } from 'react-router-dom';
import { CONTACT, HOURS_TABLE, PRESS } from '../data/otterChaos';
import { logo } from '../lib/img';
import { useChaos } from './Chaos';
import './Footer.css';

export function Footer() {
  const { chaos } = useChaos();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div className="ftr__brand">
            <img src={logo(192)} alt="Otter Chaos otter logo" width="96" height="91" loading="lazy" />
            <div>
              <p className="ftr__name">Otter Chaos</p>
              <p className="ftr__tag">Fun, food &amp; friendship under Brixton station</p>
            </div>
          </div>
          <Link to="/book" className="btn btn--primary ftr__book">
            Book a table
          </Link>
        </div>

        <div className="ftr__grid">
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
            <h2 className="ftr__h">Say hello</h2>
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
                  <a href={p.url}>{p.outlet}</a>
                  <span>{p.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftr__base">
          <span>© Otter Chaos Ltd</span>
          <span>Site by AlexWilder-Dev</span>
          <button className="ftr__chaos" onClick={chaos}>
            Cause some chaos
          </button>
        </div>
      </div>
    </footer>
  );
}
