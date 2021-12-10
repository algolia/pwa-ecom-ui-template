import classNames from 'classnames'
import type { HTMLProps, MouseEventHandler } from 'react'
import { forwardRef } from 'react'

import { Icon } from '@ui/icon/icon'

export type ButtonType =
  | 'item'
  | 'native'
  | 'primary'
  | 'secondary'
  | 'tertiary'

export type ButtonSize = 'large' | 'small'

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'size'> & {
  children?: React.ReactNode
  className?: string
  onClick?: MouseEventHandler
  title?: string
  type?: ButtonType
  size?: ButtonSize
  selected?: boolean
  disabled?: boolean
  icon?: any
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
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
    }: ButtonProps,
    ref
  ) {
    const cn = classNames(className, 'btn', {
      'btn-primary': type === 'primary',
      'btn-secondary': type === 'secondary',
      'btn-tertiary': type === 'tertiary',
      'btn-item': type === 'item',
      'btn-small': size === 'small',
      'btn-large': size === 'large',
      'btn-selected': selected,
    })

    return (
      <button
        type="button"
        title={title}
        className={type === 'native' ? classNames('btn-native', className) : cn}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {icon && <Icon icon={icon} />}
        {children}
      </button>
    )
  }
)
