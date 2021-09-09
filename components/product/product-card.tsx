import classNames from 'classnames'
import { useState } from 'react'

import { Link } from '@ui/link/link'

import type { ViewMode } from '../view-modes/view-modes'

import { ProductColorVariationList } from './product-color-variation-list'
import { ProductDescription } from './product-description'
import { ProductFavorite } from './product-favorite'
import { ProductImage } from './product-image'
import { ProductLabel } from './product-label'
import { ProductPrice } from './product-price'
import { ProductRating } from './product-rating'
import type { ProductTagType } from './product-tag'
import { ProductTag } from './product-tag'
import { ProductTitle } from './product-title'

export type ProductCardProps = {
  url?: string
  image?: string
  tags?: ProductTagType[]
  label?: string
  labelHighlighting?: React.ComponentType
  title?: string
  titleHighlighting?: React.ComponentType
  description?: string
  descriptionSnippeting?: React.ComponentType
  colors?: string[]
  price?: number
  originalPrice?: number
  currency?: string
  rating?: number
  reviews?: number
  available?: boolean
  view?: ViewMode
}

export function ProductCard({
  url = '',
  image,
  tags,
  label,
  labelHighlighting,
  title,
  titleHighlighting,
  description,
  descriptionSnippeting,
  colors,
  price,
  originalPrice,
  currency,
  rating,
  reviews,
  available,
  view,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article
      className={classNames(
        'w-full h-full relative border border-transparent transition-all laptop:p-3 group can-hover:laptop:hover:shadow-sm can-hover:laptop:hover:border-neutral-light',
        { 'opacity-50': !available }
      )}
    >
      <Link
        href={url}
        title="See product details"
        className={classNames('flex gap-2', {
          'flex-col': view === 'grid',
          'flex-row items-start': view === 'list',
        })}
        onClick={(e) => e.preventDefault()}
      >
        <div
          className={classNames('relative', {
            'w-32 h-auto flex-shrink-0': view === 'list',
          })}
        >
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
            {description && view === 'list' && (
              <ProductDescription snippeting={descriptionSnippeting}>
                {description}
              </ProductDescription>
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
        className={classNames('absolute top-1 laptop:top-4 ', {
          'left-1 laptop:left-4': view === 'list',
          'right-1 laptop:right-4': view === 'grid',
        })}
        isFavorite={isFavorite}
        onClick={() => setIsFavorite((favorite) => !favorite)}
      />
    </article>
  )
}
