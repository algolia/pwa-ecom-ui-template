import type { GetServerSidePropsContext } from 'next'
import type { InstantSearchProps } from 'react-instantsearch-dom'

/// #if DEV
import Dev from '@/components/dev/dev'
/// #endif
import Nav from '@/components/nav/nav'
import Search from '@/components/search/search'
import { isDev } from '@/utils/env'
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
      appId={process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID!}
      searchApiKey={process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY!}
      indexName={process.env.NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME!}
      {...props}
    >
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
      appId: process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID!,
      searchApiKey: process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY!,
      indexName: process.env.NEXT_PUBLIC_INSTANTSEARCH_INDEX_NAME!,
    })

    return {
      props: {
        searchState,
        resultsState,
      },
    }
  }
