import classNames from 'classnames'
import type { ImageProps } from 'next/image'
import Image from 'next/image'

import { Container } from '@/components/container/container'
import { DummyWrapper } from '@/components/dummy-wrapper/dummy-wrapper'

export type BannerXLProps = {
  image: ImageProps['src']
  imageAlt?: string
  fullWidth?: boolean
  overlay?: boolean
  className?: string
  headerClassname?: string
  children?: React.ReactNode
}

export function BannerXL({
  image,
  imageAlt = '',
  fullWidth = true,
  overlay = true,
  className,
  headerClassname,
  children,
}: BannerXLProps) {
  const Wrapper = fullWidth ? DummyWrapper : Container

  return (
    <Wrapper className={classNames('relative h-44 laptop:h-96', className)}>
      <Image
        src={image}
        alt={imageAlt}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      {overlay && (
        <div className="absolute inset-0 bg-neutral-darkest opacity-30" />
      )}

      <header
        className={classNames(
          'absolute inset-0 overflow-hidden',
          headerClassname
        )}
      >
        {children}
      </header>
    </Wrapper>
  )
}
