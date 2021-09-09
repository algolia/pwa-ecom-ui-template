import { useAtomValue } from 'jotai/utils'
import dynamic from 'next/dynamic'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
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
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const { laptop } = useTailwindScreens()

  return (
    <PageLayout {...props}>
      <div className="flex flex-col p-2.5 laptop:p-0 laptop:mx-20">
        <Breadcrumb attributes={breadcrumbAttributes} />

        <div className="flex flex-col laptop:flex-row">
          {(refinementsLayout === 'panel' || !laptop) && <RefinementsPanel />}

          <div className="flex-grow flex flex-col gap-2 laptop:gap-5">
            <RefinementsBar
              showWidgets={refinementsLayout === 'bar' && laptop}
            />
            <Products />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
