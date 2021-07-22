import type { MouseEventHandler } from 'react'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: MouseEventHandler
}

export default function Button({
  children,
  className,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button type="button" className={`${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
