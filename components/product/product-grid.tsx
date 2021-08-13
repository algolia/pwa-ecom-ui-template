import { Flipper, Flipped } from 'react-flip-toolkit'

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
    <Flipper
      flipKey={products.map((product) => product.objectID)}
      staggerConfig={{ default: { speed: 0.5 } }}
    >
      <ol className="grid grid-cols-2 gap-4 p-2.5 laptop:grid-auto-fill laptop:p-0 laptop:gap-6">
        {products.map(({ objectID, ...props }: ProductGridCardProps) => (
          <Flipped
            key={objectID}
            flipId={objectID}
            translate={true}
            opacity={true}
            stagger={true}
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
