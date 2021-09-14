import classNames from 'classnames'
import type { ForwardedRef } from 'react'

import type { ButtonProps } from '@ui/button/button'
import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import CloseIcon from '~icons/ic/outline-close'

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
  const cn = classNames(className, { 'chip-selected': selected }, 'chip')

  return (
    <Button type="native" className={cn} {...props}>
      {children}
      {closeIcon && <Icon icon={CloseIcon} className="w-5 h-5" />}
    </Button>
  )
}
