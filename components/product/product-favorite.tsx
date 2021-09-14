import classNames from 'classnames'
import type { MouseEventHandler } from 'react'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import FavoriteFillIcon from '~icons/ic/outline-favorite'
import FavoriteOutlineIcon from '~icons/ic/outline-favorite-border'

export type ProductFavoriteProps = {
  isFavorite?: boolean
  className?: string
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
