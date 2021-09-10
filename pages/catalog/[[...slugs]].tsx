import { useAtomValue } from 'jotai/utils'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import { Products } from '@/components/products/products'
import { RefinementsBar } from '@/components/refinements-bar/refinements-bar'
import { RefinementsPanel } from '@/components/refinements-panel/refinements-panel'
import { configAtom } from '@/config/config'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import type { PageLayoutProps } from '@/layouts/page-layout'
import { getPropsPage, PageLayout } from '@/layouts/page-layout'
import { isBrowser } from '@/utils/browser'

// const Products = dynamic<any>(() =>
//   import(
//     /* webpackChunkName: 'search' */ '@/components/products/products'
//   ).then((mod) => mod.Products)
// )

// const RefinementsBar = dynamic<any>(() =>
//   import(
//     /* webpackChunkName: 'search' */ '@/components/refinements-bar/refinements-bar'
//   ).then((mod) => mod.RefinementsBar)
// )

// const RefinementsPanel = dynamic<any>(() =>
//   import(
//     /* webpackChunkName: 'refinements-panel' */ '@/components/refinements-panel/refinements-panel'
//   ).then((mod) => mod.RefinementsPanel)
// )

export default function Catalog(props: PageLayoutProps) {
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const { laptop } = useTailwindScreens()

  if (!isBrowser) console.log('PageProps', props)

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

export function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps = async ({ params }) => {
  const url = params.slugs
    ? `http://localhost:3000/catalog/${params.slugs.join('/')}`
    : ''

  return await getPropsPage(Catalog as React.ComponentType, url)
}
