import CloseIcon from '@material-design-icons/svg/outlined/close.svg'
import type { ForwardedRef } from 'react'

import type { ButtonProps } from '@ui/button/button'
import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export type ChipProps = ButtonProps & {
  ref?: ForwardedRef<HTMLButtonElement>
  closeIcon?: boolean
}

export function Chip({
  children,
  className,
  selected,
  closeIcon = false,
  ...props
}: ChipProps) {
  const cn = useClassNames(className, { 'chip-selected': selected }, 'chip', [
    className,
    selected,
  ])

  return (
    <Button type="native" className={cn} {...props}>
      {children}
      {closeIcon && <Icon icon={CloseIcon} className="w-5 h-5" />}
    </Button>
  )
}
