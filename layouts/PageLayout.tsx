import type { GetServerSidePropsContext } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import BannerXS from '@/components/banner/banner-xs'
/// #if DEV
import Dev from '@/components/dev/dev'
/// #endif
import Nav from '@/components/nav/nav'
import Search from '@/components/search/search'
import { appId, indexName, isDev, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/page'
import { urlToSearchState } from '@/utils/url'

interface PageLayoutProps {
  children?: React.ReactNode
  resultsState: InstantSearchProps['resultsState']
}

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

      {isDev && <Dev />}
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
