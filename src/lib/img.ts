const base = import.meta.env.BASE_URL;

// Every photo exists at 480 and 960 wide (see scripts/make-images.mjs)
export function img(key: string, w: 480 | 960 = 960) {
  return `${base}img/${key}-${w}.webp`;
}

export function srcSet(key: string) {
  return `${base}img/${key}-480.webp 480w, ${base}img/${key}-960.webp 960w`;
}

export const logo = (w: 96 | 192 | 384 = 192) => `${base}logo/otter-${w}.webp`;
