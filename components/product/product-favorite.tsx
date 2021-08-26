import FavoriteIcon from '@material-design-icons/svg/outlined/favorite_border.svg'
import type { MouseEventHandler } from 'react'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import type { ClassNamesArgument } from '@/hooks/useClassNames'
import { useClassNames } from '@/hooks/useClassNames'

export type ProductFavoriteProps = {
  className?: ClassNamesArgument
  onClick: MouseEventHandler
}

export function ProductFavorite({ className, onClick }: ProductFavoriteProps) {
  const cn = useClassNames(
    'bg-white rounded-sm w-7 h-7 flex shadow',
    className,
    [className]
  )

  return (
    <Button className={cn} title="Add to favorite" onClick={onClick}>
      <Icon icon={FavoriteIcon} className="w-4 h-4 m-auto" />
    </Button>
  )
}
