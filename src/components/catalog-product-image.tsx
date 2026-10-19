'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

export function CatalogProductImage({ src, alt, sizes, priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className="product-image-fallback" role="img" aria-label={alt}>Image unavailable</span>;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} />;
}
