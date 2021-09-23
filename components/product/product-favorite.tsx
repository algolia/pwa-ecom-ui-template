import classNames from 'classnames'
import type { MouseEventHandler } from 'react'

import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'
import { Icon } from '@ui/icon/icon'

import FavoriteFillIcon from '~icons/ic/outline-favorite'
import FavoriteOutlineIcon from '~icons/ic/outline-favorite-border'

export type ProductFavoriteProps = {
  isFavorite?: boolean
  onClick: MouseEventHandler
  layout?: 'icon-label' | 'icon'
  className?: string
}

export function ProductFavorite({
  isFavorite = false,
  onClick,
  layout = 'icon',
  className,
}: ProductFavoriteProps) {
  const cn = classNames(
    'flex',
    { 'bg-white rounded-sm w-7 h-7 shadow': layout === 'icon' },
    className
  )
  const icon = isFavorite ? FavoriteFillIcon : FavoriteOutlineIcon
  const text = isFavorite ? 'Remove from favorite' : 'Add to favorite'

  return (
    <Button className={cn} title={text} onClick={onClick}>
      {layout === 'icon' ? (
        <Icon icon={icon} className="w-4 h-4 m-auto" />
      ) : (
        <IconLabel
          icon={icon}
          label={text}
          labelPosition="right"
          className="gap-2"
          classNameLabel=""
          classNameIcon="w-4 h-4"
        />
      )}
    </Button>
  )
}
