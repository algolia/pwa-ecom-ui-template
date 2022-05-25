import type { GetServerSidePropsContext } from 'next'
import { Hits, Configure } from 'react-instantsearch-dom'
import { RelatedProductCardHit } from '@/components/product-card/related-product-card'

import { Container } from '@/components/container/container'
import { ProductDetailHit } from '@/components/product-detail/product-detail-hit'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

import {
  appId,
  searchApiKey,
  recommendIndexName
} from '@/utils/env'

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import '@algolia/ui-components-horizontal-slider-theme';

import {
  RelatedProducts,
  FrequentlyBoughtTogether
} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

const recommendClient = recommend(appId, searchApiKey);


export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

export default function Product({ objectID, ...props }: ProductPageProps) {
  return (
    <SearchPageLayout {...props}>
      <Container>
        <Configure filters={`objectID:${objectID?.toUpperCase()}`} />
        <Hits hitComponent={ProductDetailHit} />
        <div>
          <RelatedProducts
          recommendClient={recommendClient}
          indexName={recommendIndexName}
          objectIDs={[objectID]}
          itemComponent={RelatedProductCardHit}
         view={HorizontalSlider}
        />
      </div>
       <FrequentlyBoughtTogether
        recommendClient={recommendClient}
        indexName={recommendIndexName}
        objectIDs={[objectID]}
        itemComponent={RelatedProductCardHit}
        view={HorizontalSlider}
      />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })