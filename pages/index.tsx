import type { GetStaticProps } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import { Hits } from '@/components/hits/hits'
import PageLayout, { getStaticPropsPage } from '@/layouts/PageLayout'

interface IndexProps {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <PageLayout {...props}>
      <Configure hitsPerPage={10} />

      <div className="flex laptop:mx-20 laptop:gap-16">
        <div className="hidden w-60 flex-shrink-0 laptop:flex" />
        <Hits />
      </div>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = getStaticPropsPage(
  Index as React.ComponentType
)
