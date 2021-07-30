import type { GetStaticProps } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import PageLayout, { getStaticPropsPage } from '@/layouts/PageLayout'

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

export const getStaticProps: GetStaticProps = getStaticPropsPage(
  Index as React.ComponentType
)
