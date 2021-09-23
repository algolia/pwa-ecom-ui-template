import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import { useIsMounted } from '@/hooks/useIsMounted'

export type ProductImageProps = {
  src: string
  alt?: string
  className?: string
}

export function ProductImage({ src, alt = '', className }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false)
  const isMounted = useIsMounted()

  return (
    <div className={classNames('bg-neutral-lightest', className)}>
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width="20"
        height="27"
        className={classNames(
          'transition-all duration-2000 ease-out-expo can-hover:group-hover:scale-110',
          {
            '!opacity-0': !loaded,
          }
        )}
        onLoadingComplete={() => (isMounted() ? setLoaded(true) : null)}
      />
    </div>
  )
}
