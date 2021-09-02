import FavoriteFillIcon from '@material-design-icons/svg/outlined/favorite.svg'
import FavoriteOutlineIcon from '@material-design-icons/svg/outlined/favorite_border.svg'
import classNames from 'classnames'
import type { MouseEventHandler } from 'react'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import type { ClassNamesArgument } from '@/hooks/useClassNames'

export type ProductFavoriteProps = {
  isFavorite?: boolean
  className?: ClassNamesArgument
  onClick: MouseEventHandler
}

export function ProductFavorite({
  isFavorite = false,
  className,
  onClick,
}: ProductFavoriteProps) {
  const cn = classNames('bg-white rounded-sm w-7 h-7 flex shadow', className)

  return (
    <Button className={cn} title="Add to favorite" onClick={onClick}>
      <Icon
        icon={isFavorite ? FavoriteFillIcon : FavoriteOutlineIcon}
        className="w-4 h-4 m-auto"
      />
    </Button>
  )
}
