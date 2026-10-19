import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CONTACT, HIRE } from '../data/otterChaos';
import { Photo } from '../components/Photo';
import { ArchFrame } from '../components/ArchFrame';
import { Suit } from '../components/Suit';
import { MailIcon, PhoneIcon } from '../components/Icons';
import { Bunting } from '../components/Bunting';
import { useChaos } from '../components/Chaos';
import './Hire.css';

type Space = 'part' | 'whole' | 'unsure';

export function Hire() {
  const [kind, setKind] = useState<string>('party');
  const [space, setSpace] = useState<Space>('unsure');
  const [f, setF] = useState({ name: '', email: '', phone: '', company: '', date: '', guests: '', details: '' });
  const [sent, setSent] = useState(false);
  const { chaos } = useChaos();
  const kindTitle = HIRE.kinds.find((k) => k.id === kind)?.title ?? '';
  const ok = f.name.trim() && f.email.includes('@');

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!ok) return;
    setSent(true);
    chaos();
  }

  return (
    <div className="page hire">
      <Bunting />
      <div className="wrap">
        <header className="page-head">
          <p className="kicker">Private hire &amp; corporate</p>
          <h1>Bring the whole gang. Or the whole company.</h1>
          <p>{HIRE.pitch}</p>
        </header>
      </div>

      <div className="wrap hire__photos">
        <ArchFrame ratio={1.4}>
          <Photo k="packed-arch" alt="A packed night: every table in the arch full of people playing, fairy lights and garlands overhead" sizes="(min-width: 900px) 640px, 100vw" />
        </ArchFrame>
        <div className="hire__photo-side">
          <Photo k="cards-green" alt="A group round a table against the green wall, mid card game with drinks" sizes="(min-width: 900px) 320px, 50vw" />
        </div>
      </div>

      <section className="section" aria-labelledby="kinds">
        <div className="wrap">
          <h2 id="kinds" className="section-title">
            What are you planning?
          </h2>
          <p className="section-lede">{HIRE.partOrWhole}</p>
          <div className="kinds">
            {HIRE.kinds.map((k, i) => (
              <motion.div
                key={k.id}
                className="kind"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Suit kind={k.suit} size={26} />
                <h3>{k.title}</h3>
                <p>{k.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wall" aria-labelledby="case">
        <div className="wrap case">
          <div className="case__photo">
            <ArchFrame ratio={0.8} lights={false}>
              <Photo k="takeover" alt="Switch Off, Game On: the arch painted orange, with branded orange and yellow tables" sizes="(min-width: 900px) 420px, 90vw" />
            </ArchFrame>
          </div>
          <div>
            <p className="kicker">Brand takeover</p>
            <h2 id="case" className="section-title">
              {HIRE.caseStudy.title}
            </h2>
            <p className="case__meta">
              With {HIRE.caseStudy.with} · {HIRE.caseStudy.when}
            </p>
            <p className="section-lede">{HIRE.caseStudy.body}</p>
            <p className="case__src">
              As covered by <a href={HIRE.caseStudy.source.url}>{HIRE.caseStudy.source.label}</a>
            </p>
            <h3 className="case__also-h">Also under the arches</h3>
            <ul className="case__also">
              {HIRE.alsoHosted.map((a) => (
                <li key={a.what}>
                  <span>{a.what}</span>
                  <em>{a.when}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="enquire">
        <div className="wrap enquire">
          <div className="enquire__intro">
            <p className="kicker">Enquire</p>
            <h2 id="enquire" className="section-title">
              Tell us what you’ve got in mind.
            </h2>
            <p className="section-lede">{HIRE.numbersNote}</p>
            <div className="enquire__direct">
              <a href={`mailto:${CONTACT.email}`}>
                <MailIcon size={18} /> {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref}>
                <PhoneIcon size={18} /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          {sent ? (
            <motion.div className="enquire__done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <Suit kind="heart" size={34} />
              <h3>Party on, {f.name.split(' ')[0]}! We’ll be in touch.</h3>
              <p>
                {kindTitle}
                {f.date ? ` on ${new Date(f.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}` : ''}
                {f.guests ? ` for about ${f.guests}` : ''}. We’ll reply to {f.email}.
              </p>
              <p className="note">This is a demo, so nothing has actually been sent. On the live site this would land in the Otter Chaos inbox.</p>
            </motion.div>
          ) : (
            <form className="enquire__form" onSubmit={submit} noValidate>
              <fieldset className="enquire__kinds">
                <legend>Type of event</legend>
                {HIRE.kinds.map((k) => (
                  <label key={k.id} className={`kindpick ${kind === k.id ? 'is-on' : ''}`}>
                    <input type="radio" name="kind" value={k.id} checked={kind === k.id} onChange={() => setKind(k.id)} />
                    <Suit kind={k.suit} size={18} />
                    {k.title}
                  </label>
                ))}
              </fieldset>
              <div className="enquire__row">
                <div className="field">
                  <label htmlFor="h-date">Date</label>
                  <input id="h-date" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="h-guests">Roughly how many?</label>
                  <input id="h-guests" type="number" inputMode="numeric" min={1} value={f.guests} onChange={(e) => setF({ ...f, guests: e.target.value })} />
                </div>
              </div>
              <fieldset className="enquire__space">
                <legend>How much of the place?</legend>
                {(
                  [
                    ['part', 'Part of it'],
                    ['whole', 'Both arches'],
                    ['unsure', 'Not sure yet'],
                  ] as [Space, string][]
                ).map(([v, l]) => (
                  <label key={v} className={`chip ${space === v ? 'is-on' : ''}`}>
                    <input type="radio" name="space" value={v} checked={space === v} onChange={() => setSpace(v)} className="sr-only" />
                    {l}
                  </label>
                ))}
              </fieldset>
              <div className="field">
                <label htmlFor="h-name">Your name</label>
                <input id="h-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              </div>
              {(kind === 'corporate' || kind === 'takeover') && (
                <div className="field">
                  <label htmlFor="h-company">Company or brand</label>
                  <input id="h-company" autoComplete="organization" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
                </div>
              )}
              <div className="enquire__row">
                <div className="field">
                  <label htmlFor="h-email">Email</label>
                  <input id="h-email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="h-phone">Phone (optional)</label>
                  <input id="h-phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="h-details">The plan</label>
                <textarea
                  id="h-details"
                  value={f.details}
                  onChange={(e) => setF({ ...f, details: e.target.value })}
                  placeholder="Times, food and drink, games you’d like out, anything you need from us…"
                />
              </div>
              <button className="btn btn--primary btn--block" type="submit" disabled={!ok}>
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
