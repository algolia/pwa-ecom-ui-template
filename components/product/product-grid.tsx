import type { ProductCardProps } from './product-card'
import { ProductCard } from './product-card'

export type ProductGridCardProps = ProductCardProps & {
  objectID: string
}

export interface ProductGridProps {
  products: ProductGridCardProps[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ol className="grid grid-cols-2 gap-4 p-2.5 laptop:grid-cols-5 laptop:mt-10 laptop:p-0 laptop:gap-6">
      {products.map(({ objectID, ...props }: ProductGridCardProps) => (
        <li key={objectID}>
          <ProductCard {...props} />
        </li>
      ))}
    </ol>
  )
}
