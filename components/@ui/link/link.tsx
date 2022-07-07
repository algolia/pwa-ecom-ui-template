import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import type {
  AnchorHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'

export type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
    Omit<NextLinkProps, 'onClick'>
> & {
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function Link({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...anchorProps
}: LinkProps) {
  return (
    <NextLink
      {...{ href, as, replace, scroll, shallow, prefetch, locale }}
      scroll={false}
    >
      <a role="link" tabIndex={0} {...anchorProps}>
        {children}
      </a>
    </NextLink>
  )
}
