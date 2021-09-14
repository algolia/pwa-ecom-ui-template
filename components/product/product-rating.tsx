import { useMemo } from 'react'

import { clamp } from '@/utils/math'
import StarFillIcon from '~icons/ic/outline-star'
import StarOulineIcon from '~icons/ic/outline-star-outline'

export type ProductRatingProps = {
  rating: number
  maxRating?: number
  review?: number
}

export function ProductRating({
  rating,
  maxRating = 6,
  review,
}: ProductRatingProps) {
  const ratingParsed = useMemo(
    () => clamp(Math.round(rating), 0, maxRating),
    [rating, maxRating]
  )

  const stars = []
  for (let i = 0; i < maxRating; i++) {
    const Star = i >= ratingParsed ? StarOulineIcon : StarFillIcon
    stars.push(<li key={i}>{<Star className="w-3 h-3" />}</li>)
  }

  return (
    <div className="flex gap-1.5 items-center">
      <ul className="flex gap-[1px]">{stars}</ul>
      {review && <span className="tag-bold">({review})</span>}
    </div>
  )
}
