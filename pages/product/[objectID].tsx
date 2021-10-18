import type { GetServerSidePropsContext } from 'next'
import { Hits, Configure } from 'react-instantsearch-dom'

import { Container } from '@/components/container/container'
import { ProductDetailHit } from '@/components/product-detail/product-detail-hit'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

export default function Product({ objectID, ...props }: ProductPageProps) {
  return (
    <SearchPageLayout {...props}>
      <Container>
        <Configure filters={`objectID:${objectID?.toUpperCase()}`} />
        <Hits hitComponent={ProductDetailHit} />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })
