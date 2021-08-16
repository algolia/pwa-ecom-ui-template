import { useClassNames } from '@/hooks/useClassNames'

export type IconProps = {
  icon: any
  className?: string
}

export function Icon({ icon: IconCmp = null, className }: IconProps) {
  return (
    <IconCmp
      className={useClassNames('fill-current w-6 h-6', className, [className])}
    />
  )
}
