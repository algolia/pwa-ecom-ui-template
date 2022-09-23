import { useAtomValue } from 'jotai/utils'
import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import {
  currentHierarchicalAtom,
  currentBrandAtom,
} from '@/components/@instantsearch/widgets/current-refinements/current-refinements'
import { InfiniteHits } from '@/components/@instantsearch/widgets/infinite-hits/infinite-hits'
import { NoResultsHandler } from '@/components/@instantsearch/widgets/no-results-handler/no-results-handler'
import { QueryRuleBanners } from '@/components/@instantsearch/widgets/query-rule-banners/query-rule-banners'
import { Container } from '@/components/container/container'
import { ProductCardHit } from '@/components/product-card/product-card-hit'
import { RecommendCardHit } from '@/components/product-card/recommend-card-hit'
import { TrendingShowcase } from '@/components/recommend-showcase/trending-showcase'
import { viewModeAtom } from '@/components/view-modes/view-modes'
import { configAtom } from '@/config/config'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import { isMobile } from '@/utils/userAgent'

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

export default function Catalog(props: SearchPageLayoutProps) {
  const { breadcrumbAttributes, refinementsLayoutAtom } =
    useAtomValue(configAtom)
  const refinementsLayout = useAtomValue(refinementsLayoutAtom)
  const viewMode = useAtomValue(viewModeAtom)

  const { laptop } = useTailwindScreens()
  const isMounted = useIsMounted(true)
  const isLaptop = laptop && isMounted()

  const currentHierarchical = useAtomValue(currentHierarchicalAtom)
  const currentBrand = useAtomValue(currentBrandAtom)

  const ruleContexts = useMemo(() => (isMobile ? ['mobile-app'] : null), [])

  return (
    <SearchPageLayout ruleContexts={ruleContexts} {...props}>
      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <Breadcrumb attributes={breadcrumbAttributes} />

        <QueryRuleBanners limit={1} />

        <div className="flex flex-col laptop:flex-row">
          {(refinementsLayout === 'panel' || !isLaptop) && <RefinementsPanel />}

          <div className="flex-grow flex flex-col gap-2 laptop:gap-5">
            <RefinementsBar
              showRefinements={refinementsLayout === 'bar' && isLaptop}
            />

            <NoResultsHandler>
              {(currentBrand || currentHierarchical) && (
                <section className="p-4 laptop:bg-nebula-lightest">
                  <TrendingShowcase
                    title="Trending in this category"
                    indexId="recommended"
                    threshold={4}
                    maxRecommendations={6}
                    hitComponent={(cardProps) => (
                      <RecommendCardHit
                        insightsEventName="PLP: Trending Product Clicked"
                        highlighting={false}
                        {...cardProps}
                      />
                    )}
                    headerComponent={() => (
                      <h2 className="text-[1.2rem] ml-3 mb-3 mt-2">
                        Featured products
                      </h2>
                    )}
                  />
                </section>
              )}
              <InfiniteHits
                hitComponent={ProductCardHit}
                viewMode={viewMode}
                showLess={true}
                showMore={true}
              />
            </NoResultsHandler>
          </div>
        </div>
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Catalog, context)
