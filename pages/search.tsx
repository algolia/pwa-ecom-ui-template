import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import { configAtom } from '@/config/config'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import type { PageLayoutProps } from '@/layouts/page-layout'
import { PageLayout } from '@/layouts/page-layout'

const Products = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'search' */ '@/components/products/products'
  ).then((mod) => mod.Products)
)

const RefinementsBar = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'search' */ '@/components/refinements-bar/refinements-bar'
  ).then((mod) => mod.RefinementsBar)
)

const RefinementsPanel = dynamic<any>(() =>
  import(
    /* webpackChunkName: 'refinements-panel' */ '@/components/refinements-panel/refinements-panel'
  ).then((mod) => mod.RefinementsPanel)
)

export default function Search(props: PageLayoutProps) {
  const { refinementsLayout } = useAtomValue(configAtom)
  const { laptop } = useTailwindScreens()

  return (
    <PageLayout {...props}>
      <div className="flex flex-col p-2.5 laptop:flex-row laptop:p-0 laptop:mx-20 laptop:mt-5">
        {(refinementsLayout === 'panel' || !laptop) && <RefinementsPanel />}

        <div className="flex-grow flex flex-col gap-2.5 laptop:gap-5">
          <RefinementsBar showWidgets={refinementsLayout === 'bar' && laptop} />
          <Products />
        </div>
      </div>
    </PageLayout>
  )
}
