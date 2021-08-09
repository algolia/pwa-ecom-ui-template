import type { GetStaticProps } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import { Hits } from '@/components/hits/hits'
import { RefinementsPanel } from '@/components/refinements-panel/refinements-panel'
import PageLayout, { getStaticPropsPage } from '@/layouts/PageLayout'

interface IndexProps {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <PageLayout {...props}>
      <Configure hitsPerPage={10} />

      <div className="flex laptop:mx-20 laptop:gap-16 laptop:mt-10">
        <RefinementsPanel />
        <Hits />
      </div>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = getStaticPropsPage(
  Index as React.ComponentType
)
