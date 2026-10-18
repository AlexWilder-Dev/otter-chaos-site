import { useEffect, useState } from 'react';
import { londonNow, type LondonNow } from './time';

// Re-reads the London clock every 30 seconds so open/closed flips on its own.
export function useLondonNow(): LondonNow {
  const [now, setNow] = useState(() => londonNow());
  useEffect(() => {
    const id = window.setInterval(() => setNow(londonNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
