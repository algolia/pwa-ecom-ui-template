import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { Link } from '@ui/link/link'

export type NavItemProps = {
  label: string
  href?: string
}

export function NavItem({ label, href = '' }: NavItemProps) {
  const router = useRouter()

  const isSelected = useMemo(
    () => router?.asPath.startsWith(href),
    [router?.asPath, href]
  )

  const labelLowercase = useMemo(
    () => encodeURIComponent(label.toLowerCase()),
    [label]
  )

  return (
    <li className={isSelected ? 'font-bold' : ''}>
      <Link
        href={href ?? `/${labelLowercase}`}
        title={label}
        tabIndex={0}
        className="can-hover:transition-colors can-hover:hover:text-neutral-dark"
      >
        {label}
      </Link>
    </li>
  )
}
