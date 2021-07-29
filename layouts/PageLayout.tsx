import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import BannerXS from '@/components/banner/banner-xs'
import Search from '@/components/search/search'
import { appId, indexName, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/page'
import { urlToSearchState } from '@/utils/url'

interface PageLayoutProps {
  children?: React.ReactNode
  resultsState: InstantSearchProps['resultsState']
}

const Nav = dynamic(
  () => import(/* webpackChunkName: 'svg' */ '@/components/nav/nav')
)

export default function PageLayout({
  children,
  ...props
}: PageLayoutProps): JSX.Element {
  return (
    <Search
      appId={appId}
      searchApiKey={searchApiKey}
      indexName={indexName}
      {...props}
    >
      <BannerXS>20% Off! Code: SPRING21 - Terms apply*</BannerXS>
      <Nav />

      <main>{children}</main>
    </Search>
  )
}

export const getServerSidePropsPage =
  (component: React.ComponentType) =>
  async (context: GetServerSidePropsContext) => {
    const searchState = urlToSearchState(context.resolvedUrl)
    const resultsState = await getResultsState({
      component,
      searchState,
      appId,
      searchApiKey,
      indexName,
    })

    return {
      props: {
        searchState,
        resultsState,
      },
    }
  }
