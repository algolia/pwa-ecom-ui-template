import { Flipper, Flipped } from 'react-flip-toolkit'

import type { ProductCardProps } from './product-card'
import { ProductCard } from './product-card'

export type ProductGridCardProps = ProductCardProps & {
  objectID: string
}

export type ProductGridProps = {
  products: ProductGridCardProps[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <Flipper
      flipKey={products.map((product) => product.objectID)}
      staggerConfig={{ default: { speed: 0.5 } }}
    >
      <ol className="grid grid-cols-2 gap-4 overflow-hidden laptop:grid-cols-5 laptop:gap-6">
        {products.map(({ objectID, ...props }: ProductGridCardProps) => (
          <Flipped
            key={objectID}
            flipId={objectID}
            translate={true}
            opacity={true}
          >
            <li>
              <ProductCard {...props} />
            </li>
          </Flipped>
        ))}
      </ol>
    </Flipper>
  )
}
