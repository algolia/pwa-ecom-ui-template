import type { MouseEventHandler } from 'react'

import { useClassNames } from '@/hooks/useClassNames'

import Icon from '../icon/icon'

interface ButtonProps {
  children?: React.ReactNode
  className?: string
  onClick?: MouseEventHandler
  title?: string
  type?: 'native' | 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'large'
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
  disabled = false,
  icon,
}: ButtonProps): JSX.Element {
  const cn = useClassNames(
    className,
    'btn',
    {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
    },
    [className, type, size]
  )

  return (
    <button
      type="button"
      title={title}
      className={type === 'native' ? className : cn}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  )
}
