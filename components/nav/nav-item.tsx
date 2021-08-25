import { useRouter } from 'next/dist/client/router'
import { useCallback, useMemo } from 'react'

import { Link } from '@ui/link/link'

import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { urlToSearchState } from '@/utils/url'

export type NavItemProps = {
  label: string
  href?: string
}

export function NavItem({ label, href }: NavItemProps) {
  const router = useRouter()

  const isSelected = useCallback(
    (val: string) => {
      const routerQuery = router?.query
      const searchState = urlToSearchState(val)

      if (isObjectEmpty(searchState)) return false

      return (
        routerQuery?.['hierarchicalMenu[hierarchical_categories.lvl0]'] ===
        searchState.hierarchicalMenu?.['hierarchical_categories.lvl0']
      )
    },
    [router?.query]
  )

  const labelLowercase = useMemo(
    () => encodeURIComponent(label.toLowerCase()),
    [label]
  )

  return (
    <li
      className={
        isSelected(href ?? labelLowercase)
          ? 'font-bold pointer-events-none'
          : ''
      }
    >
      <Link href={href ?? `/${labelLowercase}`} title={label} tabIndex={0}>
        {label}
      </Link>
    </li>
  )
}
