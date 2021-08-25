import { useRouter } from 'next/dist/client/router'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import { PageLayout, getServerSidePropsPage } from '@/layouts/page-layout'

type CategoryProps = {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Category(props: CategoryProps) {
  const router = useRouter()
  const query = router?.query

  return (
    <PageLayout {...props}>
      <div>Category page: {query?.category}</div>
    </PageLayout>
  )
}

export const getServerSideProps = getServerSidePropsPage(
  Category as React.ComponentType
)
