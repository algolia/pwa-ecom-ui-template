import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type PropTypes = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export default function Link({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...anchorProps
}: PropsWithChildren<PropTypes>) {
  return (
    <NextLink {...{ href, as, replace, scroll, shallow, prefetch, locale }}>
      <a {...anchorProps}>{children}</a>
    </NextLink>
  )
}
