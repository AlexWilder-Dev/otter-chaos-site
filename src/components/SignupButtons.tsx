import type { AnyEvent } from '../data/otterChaos';
import { CONTACT } from '../data/otterChaos';

// Real sign-up routes only; pay-on-the-door nights show their price elsewhere
export function SignupButtons({ event, tone = 'light' }: { event: AnyEvent; tone?: 'light' | 'dark' }) {
  if (event.signups.length === 0) {
    // Lorcana has no sign-up page; their site says to contact them
    if (event.id !== 'lorcana') return null;
    return (
      <div className="signups">
        <a className={`btn btn--small btn--secondary ${tone === 'dark' ? 'on-dark' : ''}`} href={CONTACT.phoneHref}>
          Ask us
        </a>
      </div>
    );
  }
  return (
    <div className="signups">
      {event.signups.map((s) => (
        <a
          key={s.label}
          className={tone === 'dark' ? 'btn btn--secondary btn--small' : 'btn btn--small'}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {s.label}
          <span className="signups__via">on {s.via}</span>
        </a>
      ))}
    </div>
  );
}
