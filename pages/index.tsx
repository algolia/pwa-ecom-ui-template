import type { GetStaticProps } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import { Hits } from '@/components/hits/hits'
import { RefinementsPanel } from '@/components/refinements-panel/refinements-panel'
import { useAppContext } from '@/hooks/useAppContext'
import { PageLayout, getStaticPropsPage } from '@/layouts/page-layout'
import { ActionType } from '@/state/actions'

interface IndexProps {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Index(props: IndexProps): JSX.Element {
  const { state, dispatch } = useAppContext()
  const isExpanded = state.refinements.expanded

  return (
    <PageLayout {...props}>
      <Configure hitsPerPage={10} maxValuesPerFacet={50} />

      <div className="flex laptop:mx-20 laptop:mt-10">
        <RefinementsPanel
          dynamicWidgets={true}
          isExpanded={isExpanded}
          onExpand={() =>
            dispatch({
              type: ActionType.SetRefinementExpanded,
              payload: !isExpanded,
            })
          }
        />
        <Hits />
      </div>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = getStaticPropsPage(
  Index as React.ComponentType
)
