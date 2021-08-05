import Image from 'next/image'
import { useState } from 'react'

import { useClassNames } from '@/hooks/useClassNames'

export interface ProductImageProps {
  src: string
  alt?: string
}

export function ProductImage({
  src,
  alt = '',
}: ProductImageProps): JSX.Element {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="bg-neutral-lightest">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width="20"
        height="27"
        loading="lazy"
        className={useClassNames(
          'transition-opacity duration-300',
          {
            '!opacity-0': !loaded,
          },
          [loaded]
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
