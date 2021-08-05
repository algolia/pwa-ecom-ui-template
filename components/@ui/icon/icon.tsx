import { useClassNames } from '@/hooks/useClassNames'

interface IconProps {
  icon: any
  className?: string
}

export default function Icon({
  icon: IconCmp = null,
  className,
}: IconProps): JSX.Element {
  return (
    <IconCmp
      className={useClassNames('fill-current w-6 h-6', className, [className])}
    />
  )
}
