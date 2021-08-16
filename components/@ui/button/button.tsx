import type { HTMLProps, MouseEventHandler } from 'react'

import { Icon } from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'size'> & {
  children?: React.ReactNode
  className?: string
  onClick?: MouseEventHandler
  title?: string
  type?: 'native' | 'primary' | 'secondary' | 'tertiary' | 'item'
  size?: 'small' | 'large'
  selected?: boolean
  disabled?: boolean
  icon?: any
}

export function Button({
  children,
  className,
  onClick,
  title,
  type = 'native',
  size = 'small',
  selected = false,
  disabled = false,
  icon,
  ...props
}: ButtonProps) {
  const cn = useClassNames(
    className,
    'btn',
    {
      'btn-primary': type === 'primary',
      'btn-secondary': type === 'secondary',
      'btn-tertiary': type === 'tertiary',
      'btn-item': type === 'item',
      'btn-small': size === 'small',
      'btn-large': size === 'large',
      'btn--selected': selected,
    },
    [className, type, size, selected]
  )

  return (
    <button
      type="button"
      title={title}
      className={type === 'native' ? className : cn}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  )
}
