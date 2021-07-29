import { useRouter } from 'next/dist/client/router'
import { useCallback, useMemo } from 'react'

import Link from '../link/link'

interface NavItemProps {
  label: string
  href?: string
}

export default function NavItem({ label, href }: NavItemProps): JSX.Element {
  const router = useRouter()

  const isSelected = useCallback(
    (val: string) => {
      return router?.query?.category === val.replace('/', '')
    },
    [router?.query]
  )

  const labelLowercase = useMemo(() => label.toLowerCase(), [label])

  return (
    <li className={isSelected(href ?? labelLowercase) ? 'font-bold' : ''}>
      <Link href={href ?? `/${labelLowercase}`} title={label} tabIndex={0}>
        {label}
      </Link>
    </li>
  )
}
