import {
  CAFE_HOURS,
  KITCHEN_HOURS,
  MONTHLY_EVENTS,
  ONE_OFF_EVENTS,
  WEEKLY_EVENTS,
  type AnyEvent,
} from '../data/otterChaos';

// All opening times and event times are London times, wherever the visitor is.
const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export interface LondonNow {
  key: string; // YYYY-MM-DD
  y: number;
  m: number;
  d: number;
  wd: number; // 0 = Sunday
  min: number; // minutes after midnight
}

export function londonNow(date = new Date()): LondonNow {
  const parts: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) parts[p.type] = p.value;
  const y = Number(parts.year);
  const m = Number(parts.month);
  const d = Number(parts.day);
  const hour = Number(parts.hour) % 24;
  return {
    key: `${parts.year}-${parts.month}-${parts.day}`,
    y,
    m,
    d,
    wd: new Date(Date.UTC(y, m - 1, d)).getUTCDay(),
    min: hour * 60 + Number(parts.minute),
  };
}

export function keyToUTC(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(key: string, n: number) {
  const dt = keyToUTC(key);
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

export function weekdayOf(key: string) {
  return keyToUTC(key).getUTCDay();
}

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function dayShort(key: string) {
  return DAY_SHORT[weekdayOf(key)];
}
export function dayLong(key: string) {
  return DAY_LONG[weekdayOf(key)];
}
export function dateShort(key: string) {
  const dt = keyToUTC(key);
  return `${dt.getUTCDate()} ${MONTH_SHORT[dt.getUTCMonth()]}`;
}
export function dateLong(key: string) {
  const dt = keyToUTC(key);
  return `${DAY_LONG[dt.getUTCDay()]} ${dt.getUTCDate()} ${MONTH_LONG[dt.getUTCMonth()]}`;
}

export function relativeDay(key: string, today: string) {
  if (key === today) return 'Today';
  if (key === addDays(today, 1)) return 'Tomorrow';
  return dayShort(key);
}

export function hm(s: string) {
  const [hh, mm] = s.split(':').map(Number);
  return hh * 60 + mm;
}

// 1110 -> "6:30pm", 1020 -> "5pm"
export function fmtMin(min: number) {
  const hh = Math.floor(min / 60) % 24;
  const mm = min % 60;
  const suffix = hh >= 12 ? 'pm' : 'am';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return mm ? `${h12}:${String(mm).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

export function fmtTime(s: string) {
  return fmtMin(hm(s));
}

/* --- open / closed ------------------------------------------------- */

export interface OpenState {
  open: boolean;
  until?: number; // closes at (minutes)
  next?: { key: string; min: number }; // next opening
  between?: boolean; // closed for a break but reopens today
}

function spanState(table: [number, number][][], now: LondonNow): OpenState {
  const today = table[now.wd];
  for (const [a, b] of today) {
    if (now.min >= a && now.min < b) return { open: true, until: b };
  }
  const later = today.find(([a]) => a > now.min);
  if (later) {
    const hadEarlier = today.some(([, b]) => b <= now.min);
    return { open: false, next: { key: now.key, min: later[0] }, between: hadEarlier };
  }
  for (let i = 1; i <= 7; i++) {
    const key = addDays(now.key, i);
    const spans = table[weekdayOf(key)];
    if (spans.length) return { open: false, next: { key, min: spans[0][0] } };
  }
  return { open: false };
}

export const cafeState = (now: LondonNow) => spanState(CAFE_HOURS, now);
export const kitchenState = (now: LondonNow) => spanState(KITCHEN_HOURS, now);

export function cafeHoursFor(key: string) {
  return CAFE_HOURS[weekdayOf(key)][0];
}

export function describeNext(next: { key: string; min: number } | undefined, today: string) {
  if (!next) return '';
  const when = next.key === today ? '' : next.key === addDays(today, 1) ? ' tomorrow' : ` ${dayLong(next.key)}`;
  return `${fmtMin(next.min)}${when}`;
}

/* --- event dates ---------------------------------------------------- */

export interface Occurrence {
  key: string; // date
  startMin: number;
  event: AnyEvent;
}

export function lastSundayOf(y: number, m: number) {
  const dt = new Date(Date.UTC(y, m, 0)); // last day of month m
  dt.setUTCDate(dt.getUTCDate() - dt.getUTCDay());
  return dt.toISOString().slice(0, 10);
}

export function eventsOn(key: string): Occurrence[] {
  const wd = weekdayOf(key);
  const out: Occurrence[] = [];
  for (const e of WEEKLY_EVENTS) if (e.weekday === wd) out.push({ key, startMin: hm(e.start), event: e });
  const [y, m] = key.split('-').map(Number);
  for (const e of MONTHLY_EVENTS) if (lastSundayOf(y, m) === key) out.push({ key, startMin: hm(e.start), event: e });
  for (const e of ONE_OFF_EVENTS) if (e.date === key) out.push({ key, startMin: hm(e.start), event: e });
  return out.sort((a, b) => a.startMin - b.startMin);
}

export interface Day {
  key: string;
  occurrences: Occurrence[];
}

// From today (London) forwards; nothing before today is ever returned.
export function upcomingDays(now: LondonNow, count: number): Day[] {
  return Array.from({ length: count }, (_, i) => {
    const key = addDays(now.key, i);
    return { key, occurrences: eventsOn(key) };
  });
}

// Next date this event happens; today only counts if it hasn't finished yet
export function nextDateFor(e: AnyEvent, now: LondonNow, horizon = 70): string | null {
  for (let i = 0; i < horizon; i++) {
    const key = addDays(now.key, i);
    const o = eventsOn(key).find((x) => x.event.id === e.id);
    if (o && occurrenceStatus(o, now) !== 'earlier') return key;
  }
  return null;
}

// An event that started more than this long ago is treated as "earlier today"
const STILL_ON_MIN = 150;

export function occurrenceStatus(o: Occurrence, now: LondonNow): 'later' | 'on' | 'earlier' | 'future' {
  if (o.key > now.key) return 'future';
  if (o.startMin > now.min) return 'later';
  const end = o.event.end ? hm(o.event.end) : o.startMin + STILL_ON_MIN;
  return now.min < end ? 'on' : 'earlier';
}

export function upcomingOneOffs(now: LondonNow) {
  return ONE_OFF_EVENTS.filter((e) => nextDateFor(e, now) !== null).sort((a, b) => a.date.localeCompare(b.date));
}
