import { img, srcSet } from '../lib/img';

interface Props {
  k: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
  position?: string;
}

export function Photo({ k, alt, sizes = '(min-width: 900px) 50vw, 100vw', className, eager, position }: Props) {
  return (
    <img
      className={className}
      src={img(k, 960)}
      srcSet={srcSet(k)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
