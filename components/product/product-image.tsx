import Image from 'next/image'
import { useState } from 'react'

import { useClassNames } from '@/hooks/useClassNames'
import { useIsMounted } from '@/hooks/useIsMounted'

export type ProductImageProps = {
  src: string
  alt?: string
}

export function ProductImage({ src, alt = '' }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false)
  const isMounted = useIsMounted()

  return (
    <div className="bg-neutral-lightest group">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width="20"
        height="27"
        priority={true}
        className={useClassNames(
          'transition-all duration-2000 ease-out-expo group-hover:scale-110',
          {
            '!opacity-0': !loaded,
          },
          [loaded]
        )}
        onLoadingComplete={() => (isMounted() ? setLoaded(true) : null)}
      />
    </div>
  )
}
