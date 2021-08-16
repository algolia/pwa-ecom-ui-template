import { useRouter } from 'next/dist/client/router'
import { useCallback, useMemo } from 'react'

import { Link } from '@ui/link/link'

export type NavItemProps = {
  label: string
  href?: string
}

export function NavItem({ label, href }: NavItemProps) {
  const router = useRouter()

  const isSelected = useCallback(
    (val: string) => {
      return router?.query?.category === val.replace('/', '')
    },
    [router?.query]
  )

  const labelLowercase = useMemo(() => label.toLowerCase(), [label])

  return (
    <li
      className={
        isSelected(href ?? labelLowercase)
          ? 'font-bold pointer-events-none'
          : ''
      }
    >
      <Link
        href="/[category]"
        as={href ?? `/${labelLowercase}`}
        title={label}
        tabIndex={0}
      >
        {label}
      </Link>
    </li>
  )
}
