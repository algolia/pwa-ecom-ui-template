import { useMemo } from 'react'

import { Link } from '@ui/link/link'

export type NavItemProps = {
  label: string
  href?: string
}

export function NavItem({ label, href }: NavItemProps) {
  const isSelected = false

  const labelLowercase = useMemo(
    () => encodeURIComponent(label.toLowerCase()),
    [label]
  )

  return (
    <li className={isSelected ? 'font-bold pointer-events-none' : ''}>
      <Link href={href ?? `/${labelLowercase}`} title={label} tabIndex={0}>
        {label}
      </Link>
    </li>
  )
}
