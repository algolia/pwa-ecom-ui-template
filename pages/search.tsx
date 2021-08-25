import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { useUpdateAtom } from 'jotai/utils'
import dynamic from 'next/dynamic'
import React from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-dom'

import { Button } from '@/components/@ui/button/button'
import { IconLabel } from '@/components/@ui/icon-label/icon-label'
import {
  RefinementsPanel,
  refinementsPanelMobileExpandedAtom,
} from '@/components/refinements-panel/refinements-panel'
import { getServerSidePropsPage, PageLayout } from '@/layouts/page-layout'

const Hits = dynamic<any>(() =>
  import(/* webpackChunkName: 'search' */ '@/components/hits/hits').then(
    (mod) => mod.Hits
  )
)

type SearchProps = {
  searchState: InstantSearchProps['searchState']
  resultsState: InstantSearchProps['resultsState']
}

export default function Search(props: SearchProps) {
  const setMobileExpanded = useUpdateAtom(refinementsPanelMobileExpandedAtom)

  return (
    <PageLayout {...props}>
      <Configure hitsPerPage={10} maxValuesPerFacet={50} />

      <div className="flex flex-col p-2.5 laptop:flex-row laptop:p-0 laptop:mx-20 laptop:mt-5 laptop:gap-5">
        <RefinementsPanel dynamicWidgets={true} />

        <div className="flex ml-auto laptop:hidden">
          <Button onClick={() => setMobileExpanded(true)}>
            <IconLabel
              icon={FilterIcon}
              label="Filter &amp; Sort"
              labelPosition="right"
              labelTheme="label-regular"
            />
          </Button>
        </div>

        <Hits />
      </div>
    </PageLayout>
  )
}

export const getServerSideProps = getServerSidePropsPage(
  Search as React.ComponentType
)
