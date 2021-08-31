import { memo, useState } from 'react'

import { Link } from '@ui/link/link'

import { ProductColorVariationList } from './product-color-variation-list'
import { ProductFavorite } from './product-favorite'
import { ProductImage } from './product-image'
import { ProductLabel } from './product-label'
import { ProductPrice } from './product-price'
import { ProductRating } from './product-rating'
import type { ProductTagType } from './product-tag'
import { ProductTag } from './product-tag'
import { ProductTitle } from './product-title'

import { useClassNames } from '@/hooks/useClassNames'

export type ProductCardProps = {
  url?: string
  image?: string
  tags?: ProductTagType[]
  label?: string
  title?: string
  labelHighlighting?: React.ComponentType
  titleHighlighting?: React.ComponentType
  colors?: string[]
  price?: number
  originalPrice?: number
  currency?: string
  rating?: number
  reviews?: number
  available?: boolean
}

export const ProductCard = memo(function ProductCard({
  url = '',
  image,
  tags,
  label,
  title,
  labelHighlighting,
  titleHighlighting,
  colors,
  price,
  originalPrice,
  currency,
  rating,
  reviews,
  available,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article
      className={useClassNames(
        'w-full h-full relative border border-transparent transition-all laptop:p-3 can-hover:laptop:hover:shadow-sm can-hover:laptop:hover:border-neutral-light',
        { 'opacity-50': !available },
        [available]
      )}
    >
      <Link
        href={url}
        title="See product details"
        className="flex flex-col gap-2 pointer-events-none"
      >
        <div className="relative">
          {image && <ProductImage src={image} alt={title} />}

          {tags && tags.length > 0 && (
            <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
              {tags.map((tag) => (
                <ProductTag
                  key={tag.label}
                  label={tag.label}
                  theme={tag.theme}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <header className="flex flex-col gap-1">
            {label && (
              <ProductLabel highlighting={labelHighlighting}>
                {label}
              </ProductLabel>
            )}
            {title && (
              <ProductTitle highlighting={titleHighlighting}>
                {title}
              </ProductTitle>
            )}
          </header>

          <footer className="flex flex-col gap-1">
            {colors && <ProductColorVariationList colors={colors} />}
            {price && (
              <ProductPrice
                price={price}
                originalPrice={originalPrice}
                currency={currency}
              />
            )}
            {typeof rating !== 'undefined' && (
              <ProductRating rating={rating} review={reviews} />
            )}
          </footer>
        </div>
      </Link>

      <ProductFavorite
        className="absolute top-1 right-1 laptop:top-4 laptop:right-4"
        isFavorite={isFavorite}
        onClick={() => setIsFavorite((favorite) => !favorite)}
      />
    </article>
  )
})
