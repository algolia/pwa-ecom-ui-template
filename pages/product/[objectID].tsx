import { useRouter } from 'next/router'
import { Configure } from 'react-instantsearch-core'
import { Hits } from 'react-instantsearch-dom'

import { Container } from '@/components/container/container'
import { ProductDetailHit } from '@/components/product-detail/product-detail-hit'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

export default function Product(props: SearchPageLayoutProps) {
  const router = useRouter()
  const objectID = router?.query.objectID as string

  return (
    <SearchPageLayout {...props}>
      <Container>
        <Configure filters={`objectID:${objectID?.toUpperCase()}`} />
        <Hits hitComponent={ProductDetailHit} />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = getServerSidePropsPage(
  Product as React.ComponentType
)
