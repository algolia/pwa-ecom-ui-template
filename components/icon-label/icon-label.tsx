import Icon from '@/components/icon/icon'
import Label from '@/components/label/label'

type LabelPosition = 'top' | 'bottom' | 'left' | 'right'

interface IconLabelProps {
  icon: any
  label: string
  labelPosition?: LabelPosition
  hideLabel?: boolean
  className?: string
  labelTheme?: string
}

export default function Iconlabel({
  icon,
  label,
  labelPosition = 'bottom',
  hideLabel = false,
  className = '',
  labelTheme,
}: IconLabelProps): JSX.Element {
  let posStyle: string
  switch (labelPosition) {
    case 'top':
      posStyle = 'flex-col-reverse'
      break
    case 'left':
      posStyle = 'flex-row-reverse'
      break
    case 'right':
      posStyle = 'flex-row'
      break
    case 'bottom':
    default:
      posStyle = 'flex-col'
      break
  }

  return (
    <div className={`flex ${posStyle} gap-0.5 items-center ${className}`}>
      <Icon icon={icon} />
      {!hideLabel && <Label label={label} theme={labelTheme} />}
    </div>
  )
}
