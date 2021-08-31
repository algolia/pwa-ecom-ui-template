import classNames from 'classnames'
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function Input({ className, ...props }: InputProps) {
  return <input className={classNames('input', className)} {...props} />
}
