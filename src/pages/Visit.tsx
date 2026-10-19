import { ACCESS, CONTACT, GETTING_HERE, HOURS_TABLE } from '../data/otterChaos';
import { useOpenStatus } from '../components/StatusPill';
import { Photo } from '../components/Photo';
import { ArchFrame } from '../components/ArchFrame';
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons';
import { ABoard } from '../components/ABoard';
import './Visit.css';

const ROWS_FOR_DAY = [2, 0, 0, 0, 0, 1, 2]; // Sun..Sat -> HOURS_TABLE row

export function Visit() {
  const { now, cafe, kitchen, cafeText, kitchenText } = useOpenStatus();
  const todayRow = ROWS_FOR_DAY[now.wd];

  return (
    <div className="page visit">
      <div className="wrap">
        <header className="page-head">
          <p className="kicker kicker--sky">Find us</p>
          <h1>Arch 22, under Brixton station.</h1>
          <p>{GETTING_HERE.line}</p>
        </header>
      </div>

      <section className="wrap visit__now" aria-label="Open right now">
        <div className={`nowcard ${cafe.open ? 'is-open' : ''}`}>
          <p className="nowcard__k">Café</p>
          <p className="nowcard__v">{cafe.open ? 'Open' : 'Closed'}</p>
          <p className="nowcard__s">{cafeText}</p>
        </div>
        <div className={`nowcard ${kitchen.open ? 'is-open' : ''}`}>
          <p className="nowcard__k">Kitchen</p>
          <p className="nowcard__v">{kitchen.open ? 'Serving' : 'Not serving'}</p>
          <p className="nowcard__s">{kitchenText}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="hours">
        <div className="wrap visit__grid">
          <div>
            <h2 id="hours" className="section-title">
              Opening hours
            </h2>
            <table className="hours-table">
              <thead>
                <tr>
                  <th />
                  <th scope="col">Café</th>
                  <th scope="col">Kitchen</th>
                </tr>
              </thead>
              <tbody>
                {HOURS_TABLE.map((r, i) => (
                  <tr key={r.days} className={i === todayRow ? 'is-today' : ''}>
                    <th scope="row">
                      {r.days}
                      {i === todayRow && <span className="today-tag">Today</span>}
                    </th>
                    <td>{r.cafe}</td>
                    <td>
                      {r.kitchen}
                      {r.note && <span className="hours-note">{r.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note" style={{ marginTop: 12 }}>
              We always recommend you book ahead. We can get very busy.
            </p>
          </div>
          <div className="visit__photo">
            <div className="visit__aboard">
              <ABoard />
            </div>
            <ArchFrame ratio={1.6} lights={false}>
              <Photo
                k="outside-day"
                alt="The Otter Chaos shopfront set into a brick railway arch on Atlantic Road, with graffiti on the brickwork and the sign above the glass"
                sizes="(min-width: 900px) 560px, 100vw"
              />
            </ArchFrame>
          </div>
        </div>
      </section>

      <section className="section visit__how" aria-labelledby="getting">
        <div className="wrap visit__grid">
          <div>
            <h2 id="getting" className="section-title">
              Getting here
            </h2>
            <address className="visit__addr">
              <PinIcon size={20} />
              <span>
                {CONTACT.address.map((l) => (
                  <span key={l}>
                    {l}
                    <br />
                  </span>
                ))}
              </span>
            </address>
            <ul className="routes">
              {GETTING_HERE.routes.map((r) => (
                <li key={r.mode}>
                  <strong>{r.mode}</strong>
                  <span>{r.detail}</span>
                </li>
              ))}
            </ul>
            <div className="visit__maps">
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
          </div>
          <div>
            <h2 className="section-title">Access</h2>
            <ul className="access">
              {ACCESS.listed.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li>{ACCESS.music}</li>
            </ul>
            <p className="note">{ACCESS.source}. Anything else you’d like to know before you come, give us a ring.</p>
            <p className="note" style={{ marginTop: 8 }}>
              {ACCESS.allergens}
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact">
        <div className="wrap">
          <h2 id="contact" className="section-title">
            Say hello
          </h2>
          <div className="contact-grid">
            <a className="contact" href={CONTACT.phoneHref}>
              <PhoneIcon />
              <span>
                <strong>Call us</strong>
                {CONTACT.phoneDisplay}
              </span>
            </a>
            <a className="contact" href={`mailto:${CONTACT.email}`}>
              <MailIcon />
              <span>
                <strong>Email</strong>
                {CONTACT.email}
              </span>
            </a>
            <a className="contact" href={CONTACT.instagram.url}>
              <span className="contact__mark">IG</span>
              <span>
                <strong>Instagram</strong>
                {CONTACT.instagram.handle}
              </span>
            </a>
            <a className="contact" href={CONTACT.tiktok.url}>
              <span className="contact__mark">TT</span>
              <span>
                <strong>TikTok</strong>
                {CONTACT.tiktok.handle}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
