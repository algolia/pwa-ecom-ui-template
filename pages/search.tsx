import dynamic from 'next/dynamic'

import { RefinementsBar } from '@/components/refinements-bar/refinements-bar'
import { RefinementsPanel } from '@/components/refinements-panel/refinements-panel'
import type { PageLayoutProps } from '@/layouts/page-layout'
import { PageLayout } from '@/layouts/page-layout'

const Products = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'search' */ '@/components/products/products'
  ).then((mod) => mod.Products)
)

export default function Search(props: PageLayoutProps) {
  return (
    <PageLayout {...props}>
      <div className="flex flex-col p-2.5 laptop:flex-row laptop:p-0 laptop:mx-20 laptop:mt-5">
        <RefinementsPanel />

        <div className="flex-grow flex flex-col gap-2.5 laptop:gap-5">
          <RefinementsBar />
          <Products />
        </div>
      </div>
    </PageLayout>
  )
}
