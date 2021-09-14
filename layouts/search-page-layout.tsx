import { useAtomValue } from 'jotai/utils'
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Search } from '@instantsearch/search'
import { urlToSearchState } from '@instantsearch/utils/url'

import { searchClientAtom } from './app-layout'
import type { BasicPageLayoutProps } from './basic-page-layout'
import { BasicPageLayout } from './basic-page-layout'

import { useUrlSync } from '@/components/@instantsearch/hooks/useUrlSync'
import { configAtom } from '@/config/config'
import { isBrowser } from '@/utils/browser'
import { appId, searchApiKey, indexName } from '@/utils/env'
import { getResultsState } from '@/utils/getResultsState'

export type SearchPageLayoutProps = BasicPageLayoutProps & {
  searchState?: any
  resultsState?: any
}

function SearchPageLayoutComponent({
  children,
  resultsState,
  searchState: initialSearchState,
  ...props
}: SearchPageLayoutProps) {
  const { searchParameters } = useAtomValue(configAtom)
  const searchClient = useAtomValue(searchClientAtom)
  const { searchState, onSearchStateChange, createURL } = useUrlSync()

  return (
    <BasicPageLayout>
      <Search
        indexName={indexName}
        searchClient={searchClient}
        searchState={isBrowser ? searchState : initialSearchState}
        searchParameters={searchParameters}
        resultsState={resultsState}
        createURL={createURL}
        onSearchStateChange={onSearchStateChange}
        {...props}
      >
        {children}
      </Search>
    </BasicPageLayout>
  )
}

export const SearchPageLayout = memo(SearchPageLayoutComponent, isEqual)

export type GetServerSidePropsOptions = Partial<GetServerSidePropsResult<any>>
export type GetStaticPropsOptions = Partial<GetStaticPropsResult<any>>

export const getPropsPage = async (
  component: React.ComponentType,
  url: string,
  options?: GetServerSidePropsOptions | GetStaticPropsOptions
) => {
  const searchState = urlToSearchState(url)
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
    ...options,
  }
}

export const getServerSidePropsPage =
  (component: React.ComponentType, options?: GetServerSidePropsOptions) =>
  (context: GetServerSidePropsContext) =>
    getPropsPage(component, context?.resolvedUrl || '', options)

export const getStaticPropsPage =
  (component: React.ComponentType, options?: GetStaticPropsOptions) =>
  (context: GetStaticPropsContext) =>
    getPropsPage(component, (context?.params?.id as string) || '', options)
