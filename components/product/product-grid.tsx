import classNames from 'classnames'
import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'

import type { ProductCardProps } from './product-card'
import { ProductCard } from './product-card'

import type { ViewMode } from '@/components/view-modes/view-modes'

export type ProductGridCardProps = ProductCardProps & {
  objectID: string
}

export type ProductGridProps = {
  products: ProductGridCardProps[]
  view?: ViewMode
}

const listItemTransition = {
  type: 'spring',
  duration: 0.5,
  bounce: 0.15,
}

const listItemVariants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function ProductGrid({ products, view = 'grid' }: ProductGridProps) {
  const [productsPerPage, setProductsPerPage] = useState(0)

  useEffect(() => {
    if (!productsPerPage) setProductsPerPage(products.length)
  }, [productsPerPage, products.length])

  return (
    <m.ol
      className={classNames('overflow-hidden', {
        'grid grid-cols-2 gap-4 laptop:grid-cols-5 laptop:gap-6':
          view === 'grid',
        'flex flex-col gap-4 laptop:gap-0': view === 'list',
      })}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <AnimatePresence>
        {products.map(({ objectID, ...props }: ProductGridCardProps, i) => (
          <m.li
            key={objectID}
            layout="position"
            transition={listItemTransition}
            variants={listItemVariants}
            custom={i % productsPerPage}
          >
            <ProductCard view={view} {...props} />
          </m.li>
        ))}
      </AnimatePresence>
    </m.ol>
  )
}
