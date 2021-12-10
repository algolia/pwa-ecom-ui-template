import StarFillIcon from '@material-design-icons/svg/outlined/star.svg'
import StarOulineIcon from '@material-design-icons/svg/outlined/star_outline.svg'
import classNames from 'classnames'
import { useMemo } from 'react'

import { clamp } from '@/utils/math'

export type ProductRatingProps = {
  rating: number
  maxRating?: number
  reviews?: number
  reviewComponent?: React.ComponentType<{ reviews: number }>
  className?: string
  classNameStar?: string
}

export function ProductRating({
  rating,
  maxRating = 4,
  reviews,
  reviewComponent: ReviewComponent,
  className,
  classNameStar = 'w-3 h-3',
}: ProductRatingProps) {
  const ratingParsed = useMemo(
    () => clamp(Math.round(rating), 0, maxRating),
    [rating, maxRating]
  )

  const stars = []
  for (let i = 0; i < maxRating; i++) {
    const Star = i >= ratingParsed ? StarOulineIcon : StarFillIcon
    stars.push(<li key={i}>{<Star className={classNameStar} />}</li>)
  }

  return (
    <div className={classNames('flex gap-1.5 items-center', className)}>
      <ul className="flex gap-px">{stars}</ul>
      {reviews &&
        (ReviewComponent ? (
          <ReviewComponent reviews={reviews} />
        ) : (
          <span className="tag-bold">({reviews})</span>
        ))}
    </div>
  )
}
