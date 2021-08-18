import type { GetServerSideProps } from 'next'
import { useCallback } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import { Hits } from '@/components/hits/hits'
import { RefinementsPanel } from '@/components/refinements-panel/refinements-panel'
import { useAppContext } from '@/hooks/useAppContext'
import { PageLayout, getServerSidePropsPage } from '@/layouts/page-layout'
import { ActionType } from '@/state/actions'

type SearchProps = {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Search(props: SearchProps) {
  const { state, dispatch } = useAppContext()
  const isExpanded = state.refinements.expanded

  const onExpand = useCallback(
    () =>
      dispatch({
        type: ActionType.SetRefinementExpanded,
        payload: !isExpanded,
      }),
    [dispatch, isExpanded]
  )

  return (
    <PageLayout {...props}>
      <Configure hitsPerPage={15} maxValuesPerFacet={50} />

      <div className="flex laptop:mx-20 laptop:mt-5 laptop:gap-5">
        <RefinementsPanel
          dynamicWidgets={true}
          isExpanded={isExpanded}
          onExpand={onExpand}
        />
        <Hits />
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsPage(
  Search as React.ComponentType
)
