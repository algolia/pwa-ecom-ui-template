import { useCallback, useMemo, useRef, useState } from 'react'

import { Button } from '@ui/button/button'

import { ProductColorVariationItem } from './product-color-variation-item'

export type ProductColorVariationListProps = {
  colors: string[]
  limit?: number
}

export function ProductColorVariationList({
  colors,
  limit = 5,
}: ProductColorVariationListProps) {
  const colorsSliced = useMemo(() => colors.slice(0, limit), [colors, limit])
  const colorsRemaining = useMemo(() => colors.slice(limit), [colors, limit])
  const colorsRemainingLength = useMemo(
    () => colorsRemaining.length,
    [colorsRemaining]
  )
  const showMoreClicked = useRef(false)

  const [currentColors, setCurrentColors] = useState(colorsSliced)

  const showMore = useCallback(() => {
    showMoreClicked.current = true
    setCurrentColors(colors)
  }, [colors])

  return (
    <ul className="flex items-center gap-1.5">
      {currentColors.map((color) => (
        <ProductColorVariationItem key={color} color={color} />
      ))}

      {colorsRemainingLength > 0 && !showMoreClicked.current && (
        <li className="tag-regular">
          <Button
            className="uppercase text-neutral-darkest"
            title="Show more colors"
            onClick={showMore}
          >
            +{colorsRemainingLength} more
          </Button>
        </li>
      )}
    </ul>
  )
}
