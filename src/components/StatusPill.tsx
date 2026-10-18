import { useLondonNow } from '../lib/useNow';
import { addDays, cafeState, dayShort, describeNext, fmtMin, kitchenState } from '../lib/time';
import './StatusPill.css';

export function useOpenStatus() {
  const now = useLondonNow();
  const cafe = cafeState(now);
  const kitchen = kitchenState(now);
  const cafeText = cafe.open ? `Open till ${fmtMin(cafe.until!)}` : `Closed · opens ${describeNext(cafe.next, now.key)}`;
  let kitchenText: string;
  if (kitchen.open) kitchenText = `Kitchen till ${fmtMin(kitchen.until!)}`;
  else if (cafe.open && kitchen.next && kitchen.next.key === now.key)
    kitchenText = kitchen.between ? `Kitchen back at ${fmtMin(kitchen.next.min)}` : `Kitchen from ${fmtMin(kitchen.next.min)}`;
  else kitchenText = 'Kitchen closed';
  let compactText = cafeText;
  if (!cafe.open && cafe.next) {
    const day = cafe.next.key === now.key ? '' : cafe.next.key === addDays(now.key, 1) ? ' tmrw' : ` ${dayShort(cafe.next.key)}`;
    compactText = `Opens ${fmtMin(cafe.next.min)}${day}`;
  }
  return { now, cafe, kitchen, cafeText, kitchenText, compactText };
}

export function StatusPill({ compact = false }: { compact?: boolean }) {
  const { cafe, kitchen, cafeText, kitchenText, compactText } = useOpenStatus();
  return (
    <span className={`status ${cafe.open ? 'is-open' : 'is-closed'} ${compact ? 'is-compact' : ''}`} role="status">
      <span className="status__dot" aria-hidden="true" />
      <span className="status__main">{compact ? compactText : cafeText}</span>
      {!compact && (
        <span className={`status__kitchen ${kitchen.open ? 'is-open' : ''}`}>{kitchenText}</span>
      )}
    </span>
  );
}
