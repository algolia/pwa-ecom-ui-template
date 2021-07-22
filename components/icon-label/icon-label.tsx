import type { SvgIconComponent } from '@material-ui/icons'

type LabelPosition = 'top' | 'bottom' | 'left' | 'right'

interface IconLabelProps {
  icon: SvgIconComponent
  label: string
  labelPosition?: LabelPosition
}

export default function Iconlabel({
  icon: Icon,
  label = '',
  labelPosition = 'bottom',
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
    <div className={`flex ${posStyle} gap-0.5 items-center`}>
      <Icon />
      <div className="tag-regular">{label}</div>
    </div>
  )
}
