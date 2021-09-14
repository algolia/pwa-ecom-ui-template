import classNames from 'classnames'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'

import { Container } from '@/components/container/container'
import { DummyWrapper } from '@/components/dummy-wrapper/dummy-wrapper'
import { useIsMounted } from '@/hooks/useIsMounted'

export type BannerSize = 'l' | 'm' | 's' | 'xl' | 'xs-large' | 'xs-small'

export type BannerProps = {
  size: BannerSize
  title?: string
  subtitle?: string
  description?: string
  image?: ImageProps['src']
  imageAlt?: string
  overlay?: boolean
  gradient?: boolean
  fullWidth?: boolean
  className?: string
  children?: React.ReactNode
}

export function Banner({
  size,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  overlay = false,
  gradient = false,
  fullWidth = false,
  className,
  children,
}: BannerProps) {
  const [loaded, setLoaded] = useState(false)
  const isMounted = useIsMounted()

  const Wrapper = fullWidth ? DummyWrapper : Container

  return (
    <Wrapper
      className={classNames(
        'relative text-white',
        {
          'bg-brand-black text-center py-1 px-4': size?.startsWith('xs'),
          'text-sm': size === 'xs-large',
          'text-xs font-bold uppercase': size === 'xs-small',

          'h-24': size === 's',

          'h-44 laptop:h-40': size === 'm',

          'h-64 laptop:h-56': size === 'l',

          'h-44 laptop:h-96': size === 'xl',
        },
        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={classNames('transition-opacity', {
            '!opacity-0': !loaded,
          })}
          onLoadingComplete={() => (isMounted() ? setLoaded(true) : null)}
        />
      )}

      {overlay && (
        <div className="absolute inset-0 bg-neutral-darkest opacity-40" />
      )}

      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-l from-brand-black" />
      )}

      {!children && (
        <header className="absolute inset-0 flex flex-col justify-center p-6 text-shadow-medium gap-2 laptop:gap-0 laptop:flex-row laptop:items-center laptop:p-12">
          <div
            className={classNames(
              'flex flex-col uppercase gap-2 laptop:gap-4',
              description ? 'w-full laptop:w-3/6' : 'w-full'
            )}
          >
            {title && (
              <h1
                className={classNames({
                  'text-3xl font-normal tracking-wider leading-tight laptop:text-7xl':
                    size === 'xl',
                  subhead: size === 's',
                })}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {subtitle && (
              <p
                className={classNames({
                  'text-sm font-bold laptop:text-3xl': size !== 's',
                  'body-regular': size === 's',
                })}
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            )}
          </div>

          {description && (
            <p
              className={classNames(
                'w-full laptop:w-3/6 font-bold hidden laptop:block',
                {
                  'text-sm': size === 'l',

                  'text-xl': size === 'xl',
                }
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </header>
      )}

      {children}
    </Wrapper>
  )
}
