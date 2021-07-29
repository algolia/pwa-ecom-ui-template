import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import PageLayout, { getServerSidePropsPage } from '@/layouts/PageLayout'

interface CategoryProps {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Category(props: CategoryProps): JSX.Element {
  const router = useRouter()
  const query = router?.query

  return (
    <PageLayout {...props}>
      <div>Category page: {query?.category}</div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsPage(
  Category as React.ComponentType
)
