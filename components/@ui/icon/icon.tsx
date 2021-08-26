import { useClassNames } from '@/hooks/useClassNames'

export type IconProps = {
  icon: any
  className?: string
}

export function Icon({
  icon: IconCmp = null,
  className = 'w-6 h-6',
}: IconProps) {
  return (
    <IconCmp
      className={useClassNames('fill-current', className, [className])}
    />
  )
}
