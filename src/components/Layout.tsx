import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT } from '../data/otterChaos';
import { logo } from '../lib/img';
import { StatusPill } from './StatusPill';
import { Footer } from './Footer';
import { ArchIcon, CalendarIcon, CloseIcon, GlassIcon, MenuIcon, PhoneIcon, ShelfIcon } from './Icons';
import './Layout.css';

const MAIN_LINKS = [
  { to: '/', label: 'Tonight', end: true },
  { to: '/events', label: 'What’s on' },
  { to: '/menu', label: 'Food & drink' },
  { to: '/games', label: 'Games' },
  { to: '/hire', label: 'Private hire' },
  { to: '/gift-cards', label: 'Gift cards' },
  { to: '/visit', label: 'Find us' },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="hdr">
        <div className="hdr__in wrap">
          <Link to="/" className="hdr__brand" aria-label="Otter Chaos, home">
            <img src={logo(96)} alt="" width="44" height="42" />
            <span className="hdr__name">Otter Chaos</span>
          </Link>
          <div className="hdr__status">
            <StatusPill compact />
          </div>
          <nav className="hdr__nav" aria-label="Main">
            {MAIN_LINKS.slice(1).map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/book" className="btn btn--die btn--small hdr__book">
            Book a table
          </Link>
          <button className="hdr__menu" aria-expanded={open} aria-controls="sheet" onClick={() => setOpen((o) => !o)}>
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="sheet"
            className="sheet"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <nav className="sheet__nav" aria-label="Site">
              {MAIN_LINKS.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.03 }}>
                  <NavLink to={l.to} end={l.end}>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="sheet__foot">
              <StatusPill />
              <div className="sheet__actions">
                <Link to="/book" className="btn btn--die">
                  Book a table
                </Link>
                <a href={CONTACT.phoneHref} className="btn btn--ghost">
                  <PhoneIcon size={18} /> {CONTACT.phoneDisplay}
                </a>
              </div>
              <p className="note">
                <a href={CONTACT.instagram.url}>Instagram</a> · <a href={CONTACT.tiktok.url}>TikTok</a> · {CONTACT.instagram.handle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main">
        <Outlet />
      </main>
      <Footer />

      <nav className="bbar" aria-label="Quick">
        <NavLink to="/" end>
          <ArchIcon />
          <span>Tonight</span>
        </NavLink>
        <NavLink to="/events">
          <CalendarIcon />
          <span>What’s on</span>
        </NavLink>
        <NavLink to="/menu">
          <GlassIcon />
          <span>Menu</span>
        </NavLink>
        <NavLink to="/games">
          <ShelfIcon />
          <span>Games</span>
        </NavLink>
        <NavLink to="/book" className="bbar__book">
          <span>Book</span>
        </NavLink>
      </nav>
    </>
  );
}
