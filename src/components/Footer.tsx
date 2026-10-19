import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONTACT, HOURS_TABLE, PRESS } from '../data/otterChaos';
import { logo } from '../lib/img';
import { Bit, type BitKind } from './Bits';
import { useChaos } from './Chaos';
import './Footer.css';

const TOYS: BitKind[] = ['meeple', 'die', 'card', 'tile', 'pawn', 'meeple'];

export function Footer() {
  const { chaos, burst } = useChaos();
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
          <div className="ftr__toys">
            {TOYS.map((k, i) => (
              <motion.button
                key={i}
                className="ftr__toy"
                whileHover={{ y: -8, rotate: i % 2 ? 12 : -12 }}
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  burst(r.left + r.width / 2, r.top, 6, 0.6);
                }}
                aria-label="Fling a game piece"
              >
                <Bit kind={k} seed={i * 2 + 1} size={34} />
              </motion.button>
            ))}
            <button className="btn btn--pink btn--small ftr__chaos" onClick={chaos}>
              Cause some chaos
            </button>
          </div>
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
                  <a href={p.url}>{p.outlet}</a>: {p.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftr__base">
          <span>© Otter Chaos Ltd</span>
          <span>Site by AlexWilder-Dev</span>
        </div>
      </div>
    </footer>
  );
}
