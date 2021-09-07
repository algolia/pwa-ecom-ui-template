import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { useCallback } from 'react'

export type LinkProps = PropsWithChildren<
  NextLinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
>

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
  const router = useRouter()

  const onClick = useCallback(
    (e) => {
      if (router.asPath === href) {
        e.preventDefault()
      }
    },
    [router, href]
  )

  return (
    <NextLink
      {...{ href, as, replace, scroll, shallow, prefetch, locale }}
      scroll={false}
    >
      <a role="link" tabIndex={0} onClick={onClick} {...anchorProps}>
        {children}
      </a>
    </NextLink>
  )
}
