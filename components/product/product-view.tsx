import classNames from 'classnames'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

import type { ProductCardProps } from './product-card'
import { ProductCard } from './product-card'

import type { ViewMode } from '@/components/view-modes/view-modes'

export type ProductViewCardProps = ProductCardProps & {
  objectID: string
}

export type ProductViewProps = {
  products: ProductViewCardProps[]
  view?: ViewMode
}

const listItemTransition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
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

export function ProductView({ products, view = 'grid' }: ProductViewProps) {
  const [productsPerPage, setProductsPerPage] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!productsPerPage) setProductsPerPage(products.length)
  }, [productsPerPage, products.length])

  return (
    <m.ol
      className={classNames('overflow-hidden', {
        'grid grid-cols-2 gap-4 laptop:grid-cols-5': view === 'grid',
        'flex flex-col gap-4 laptop:grid laptop:grid-cols-2 laptop:gap-0':
          view === 'list',
      })}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <AnimatePresence>
        {products.map(({ objectID, ...props }: ProductViewCardProps, i) => (
          <m.li
            key={objectID}
            layout={shouldReduceMotion ? false : 'position'}
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
