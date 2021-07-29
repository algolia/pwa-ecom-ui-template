import Icon from '@/components/icon/icon'
import Label from '@/components/label/label'

type LabelPosition = 'top' | 'bottom' | 'left' | 'right'

interface IconLabelProps {
  icon?: any
  label?: string
  labelPosition?: LabelPosition
  className?: string
  labelTheme?: string
}

export default function IconLabel({
  icon,
  label,
  labelPosition = 'bottom',
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
      {icon && <Icon icon={icon} />}
      {label && <Label label={label} theme={labelTheme} />}
    </div>
  )
}
