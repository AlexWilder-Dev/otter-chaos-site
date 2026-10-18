import { TABLE_FEE } from '../data/otterChaos';

// Per person: £2/hour or £5 for 3 hours (adults), £1/hour or £2.50 for 3 hours (children).
function perPerson(rate: { perHour: number; threeHours: number }, hours: number) {
  return hours >= 3 ? rate.threeHours : rate.perHour * hours;
}

export function tableFee(adults: number, children: number, hours: number) {
  const a = perPerson(TABLE_FEE.adult, hours);
  const c = perPerson(TABLE_FEE.child, hours);
  return { adultEach: a, childEach: c, total: a * adults + c * children };
}

export function money(n: number) {
  return Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`;
}

// Menu prices are printed without a £ sign: 6.7 -> "6.70", 12 -> "12"
export function menuPrice(n: number | string | null | undefined) {
  if (n === null || n === undefined) return '–';
  if (typeof n === 'string') return n;
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
