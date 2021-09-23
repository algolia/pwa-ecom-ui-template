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
  classNameLabel?: string
}

export function IconLabel({
  icon,
  label,
  labelPosition = 'bottom',
  className = 'gap-1',
  classNameIcon,
  classNameLabel,
}: IconLabelProps) {
  let classNamePosition: string
  switch (labelPosition) {
    case 'top':
      classNamePosition = 'flex-col-reverse'
      break
    case 'left':
      classNamePosition = 'flex-row-reverse'
      break
    case 'right':
      classNamePosition = 'flex-row'
      break
    case 'bottom':
    default:
      classNamePosition = 'flex-col'
      break
  }

  const cn = classNames(`flex items-center`, classNamePosition, className)

  return (
    <div className={cn}>
      {icon && <Icon icon={icon} className={classNameIcon} />}
      {label && <Label label={label} className={classNameLabel} />}
    </div>
  )
}
