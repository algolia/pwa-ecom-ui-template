import classNames from 'classnames'

export type ProductPriceProps = {
  price: number
  originalPrice?: number
  currency?: string
  precision?: number
  className?: string
  classNamePrice?: string
  classNameOriginalPrice?: string
}

export function ProductPrice({
  price,
  originalPrice,
  currency = '$',
  precision = 2,
  className = 'items-baseline gap-2 italic',
  classNamePrice,
  classNameOriginalPrice,
}: ProductPriceProps) {
  return (
    <div className={classNames('flex', className)}>
      <span className={classNames('text-venus-base font-bold', classNamePrice)}>
        {currency}
        {price.toFixed(precision).toLocaleString()}
      </span>
      {originalPrice && (
        <span
          className={classNames(
            'text-neutral-dark text-xs line-through',
            classNameOriginalPrice
          )}
        >
          {currency}
          {originalPrice.toFixed(precision).toLocaleString()}
        </span>
      )}
    </div>
  )
}
