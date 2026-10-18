// Small line icons drawn for this site
type P = { size?: number };
const base = (size = 22) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const ArchIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M3 21V11a9 9 0 0 1 18 0v10" />
    <path d="M7 21v-9a5 5 0 0 1 10 0v9" />
  </svg>
);
export const CalendarIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
export const GlassIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 4h14l-1.8 4.5a5.5 5.5 0 0 1-10.4 0z" />
    <path d="M12 13.5V20M8 20.5h8" />
  </svg>
);
export const ShelfIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M3 20.5h18M3 11.5h18" />
    <path d="M5 11.5V4.5h3v7M9.5 11.5V6h2.6v5.5M14 11.5 15.5 5l2.8.6-1.4 5.9M5 20.5v-6h4v6M11 20.5v-7h2.5v7" />
  </svg>
);
export const PhoneIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6.6 3.5h-2A1.6 1.6 0 0 0 3 5.2 16 16 0 0 0 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.5 1.5 0 0 0-1.1-1.5l-3-.9a1.5 1.5 0 0 0-1.6.5l-.9 1.1a12 12 0 0 1-5.5-5.5l1.1-.9a1.5 1.5 0 0 0 .5-1.6l-.9-3a1.5 1.5 0 0 0-1.5-1.1z" />
  </svg>
);
export const PinIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </svg>
);
export const MenuIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const CloseIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ArrowIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const MailIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const ExternalIcon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </svg>
);
