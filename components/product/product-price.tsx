export interface ProductPriceProps {
  price: number
  originalPrice?: number
  currency?: string
}

export function ProductPrice({
  price,
  originalPrice,
  currency = '$',
}: ProductPriceProps): JSX.Element {
  return (
    <div className="flex items-baseline gap-2 italic">
      <span className="text-venus-base font-bold">
        {currency}
        {price.toLocaleString()}
      </span>
      {originalPrice && (
        <span className="text-neutral-dark text-xs line-through">
          {currency}
          {originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  )
}
