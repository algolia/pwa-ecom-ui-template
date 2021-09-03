import classNames from 'classnames'

export type IconProps = {
  icon: any
  className?: string
}

export function Icon({
  icon: IconCmp = null,
  className = 'w-6 h-6',
}: IconProps) {
  return <IconCmp className={classNames('fill-current', className)} />
}
