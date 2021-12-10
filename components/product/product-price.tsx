import classNames from 'classnames'

export type ProductPriceCurrency = {
  symbol: string
  position: 'prefix' | 'suffix'
}

export type ProductPriceProps = {
  price: number
  originalPrice?: number
  currency?: ProductPriceCurrency
  precision?: number
  className?: string
  classNamePrice?: string
  classNameOriginalPrice?: string
}

export function ProductPrice({
  price,
  originalPrice,
  currency,
  precision = 2,
  className = 'items-baseline gap-2 italic',
  classNamePrice,
  classNameOriginalPrice,
}: ProductPriceProps) {
  return (
    <div className={classNames('flex', className)}>
      <span className={classNames('text-venus-base font-bold', classNamePrice)}>
        {currency?.position === 'prefix' ? currency.symbol : null}
        {price.toFixed(precision).toLocaleString()}
        {currency?.position === 'suffix' ? currency.symbol : null}
      </span>
      {originalPrice && (
        <span
          className={classNames(
            'text-neutral-dark text-xs line-through',
            classNameOriginalPrice
          )}
        >
          {currency?.position === 'prefix' ? currency.symbol : null}
          {originalPrice.toFixed(precision).toLocaleString()}
          {currency?.position === 'suffix' ? currency.symbol : null}
        </span>
      )}
    </div>
  )
}
