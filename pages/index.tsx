import type { GetServerSideProps } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import PageLayout, { getServerSidePropsPage } from '@/layouts/PageLayout'

interface IndexProps {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <PageLayout {...props}>
      <div></div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsPage(
  Index as React.ComponentType
)
