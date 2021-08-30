import { m } from 'framer-motion'

import type { ProductCardProps } from './product-card'
import { ProductCard } from './product-card'

export type ProductGridCardProps = ProductCardProps & {
  objectID: string
}

export type ProductGridProps = {
  products: ProductGridCardProps[]
}

const transition = {
  type: 'spring',
  duration: 0.5,
  bounce: 0.15,
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ol className="grid grid-cols-2 gap-4 overflow-hidden laptop:grid-cols-5 laptop:gap-6">
      {products.map(({ objectID, ...props }: ProductGridCardProps) => (
        <m.li key={objectID} layout="position" transition={transition}>
          <ProductCard {...props} />
        </m.li>
      ))}
    </ol>
  )
}
