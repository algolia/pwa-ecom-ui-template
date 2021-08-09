import type { HTMLProps, MouseEventHandler } from 'react'

import { useClassNames } from '@/hooks/useClassNames'

import Icon from '../icon/icon'

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
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

export default function Button({
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
}: ButtonProps): JSX.Element {
  const cn = useClassNames(
    className,
    'btn',
    {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
      'btn-selected': selected,
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
