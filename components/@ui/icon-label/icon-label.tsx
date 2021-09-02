import classNames from 'classnames'

import { Icon } from '@ui/icon/icon'
import { Label } from '@ui/label/label'

export type LabelPosition = 'bottom' | 'left' | 'right' | 'top'

export type IconLabelProps = {
  icon?: any
  label?: string
  labelPosition?: LabelPosition
  className?: string
  classNameIcon?: string
  labelTheme?: string
}

export function IconLabel({
  icon,
  label,
  labelPosition = 'bottom',
  className,
  classNameIcon,
  labelTheme,
}: IconLabelProps) {
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

  const cn = classNames(`flex gap-1 items-center`, posStyle, className)

  return (
    <div className={cn}>
      {icon && <Icon icon={icon} className={classNameIcon} />}
      {label && <Label label={label} theme={labelTheme} />}
    </div>
  )
}
