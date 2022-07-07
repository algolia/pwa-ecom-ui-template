import classNames from 'classnames'
import type { MouseEvent, MouseEventHandler } from 'react'
import { useCallback, useState } from 'react'

import { ProductColorVariationList } from '@/components/product/product-color-variation-list'
import { ProductDescription } from '@/components/product/product-description'
import { ProductFavorite } from '@/components/product/product-favorite'
import { ProductImage } from '@/components/product/product-image'
import { ProductLabel } from '@/components/product/product-label'
import type { ProductPriceCurrency } from '@/components/product/product-price'
import { ProductPrice } from '@/components/product/product-price'
import { ProductRating } from '@/components/product/product-rating'
import type { ProductTagType } from '@/components/product/product-tag'
import { ProductTag } from '@/components/product/product-tag'
import { ProductTitle } from '@/components/product/product-title'
import type { ViewMode } from '@/components/view-modes/view-modes'
import { Link } from '@ui/link/link'

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
  currency?: ProductPriceCurrency
  rating?: number
  reviews?: number
  available?: boolean
  view?: ViewMode
  onLinkClick?: MouseEventHandler<HTMLElement>
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
  available = true,
  view = 'grid',
  onLinkClick,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const handleFavoriteClick = useCallback(
    () => setIsFavorite((favorite) => !favorite),
    []
  )

  const handleLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (typeof onLinkClick === 'function') onLinkClick(e)
    },
    [onLinkClick]
  )

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
        onClick={handleLinkClick}
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
            {(label || labelHighlighting) && (
              <ProductLabel highlighting={labelHighlighting}>
                {label}
              </ProductLabel>
            )}
            {(title || titleHighlighting) && (
              <ProductTitle highlighting={titleHighlighting}>
                {title}
              </ProductTitle>
            )}
            {(description || descriptionSnippeting) && view === 'list' && (
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
              <ProductRating rating={rating} reviews={reviews} />
            )}
          </footer>
        </div>
      </Link>

      <ProductFavorite
        className={classNames(
          'hidden absolute top-1 laptop:block laptop:top-4',
          {
            'left-1 laptop:left-4': view === 'list',
            'right-1 laptop:right-4': view === 'grid',
          }
        )}
        isFavorite={isFavorite}
        onClick={handleFavoriteClick}
      />
    </article>
  )
}
