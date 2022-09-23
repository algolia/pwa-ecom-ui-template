import recommend from '@algolia/recommend'
import {
  RelatedProducts,
  FrequentlyBoughtTogether,
} from '@algolia/recommend-react'
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react'
import type { GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import { Hits, Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/container/container'
import { RelatedProductCard } from '@/components/product-card/related-product-card'
import { ProductDetailHit } from '@/components/product-detail/product-detail-hit'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import { appId, searchApiKey, recommendIndexName } from '@/utils/env'
import '@algolia/ui-components-horizontal-slider-theme'
import { scrollToTop } from '@/utils/scrollToTop'

const recommendClient = recommend(appId, searchApiKey)

export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
  context: any
}

export default function Product({ objectID, ...props }: ProductPageProps) {
  useEffect(() => {
    scrollToTop('smooth')
  }, [objectID])

  return (
    <SearchPageLayout {...props}>
      <Container>
        <Configure filters={`objectID:${objectID?.toUpperCase()}`} />
        <Hits hitComponent={ProductDetailHit} />
      </Container>
      <section className="py-4 laptop:py-16 laptop:bg-gray-50">
        <Container>
          <FrequentlyBoughtTogether
            headerComponent={() => (
              <h2 className="text-sm font-semibold tracking-[2px] uppercase mb-3 laptop:mb-6 laptop:ml-3 laptop:heading-3">
                Frequently bought together
              </h2>
            )}
            recommendClient={recommendClient}
            indexName={recommendIndexName}
            objectIDs={[objectID]}
            itemComponent={(cardProps) => (
              <RelatedProductCard
                insightsEventName="PDP: Frequently Bought Together Clicked"
                {...cardProps}
              />
            )}
            view={HorizontalSlider}
          />
        </Container>
      </section>
      <section className="py-4 laptop:py-16">
        <Container>
          <RelatedProducts
            headerComponent={() => (
              <h2 className="text-sm font-semibold tracking-[2px] uppercase mb-3 laptop:mb-6 laptop:ml-3 laptop:heading-3">
                Related products
              </h2>
            )}
            recommendClient={recommendClient}
            indexName={recommendIndexName}
            objectIDs={[objectID]}
            itemComponent={(cardProps) => (
              <RelatedProductCard
                insightsEventName="PDP: Related Product Clicked"
                {...cardProps}
              />
            )}
            view={HorizontalSlider}
          />
        </Container>
      </section>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })
