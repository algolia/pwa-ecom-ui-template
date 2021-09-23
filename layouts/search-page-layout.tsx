import { useAtomValue } from 'jotai/utils'
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import { Search } from '@instantsearch/search'
import { urlToSearchState } from '@instantsearch/utils/url'

import { searchClientAtom } from './app-layout'
import type { BasicPageLayoutProps } from './basic-page-layout'
import { BasicPageLayout } from './basic-page-layout'

import { useUrlSync } from '@/components/@instantsearch/hooks/useUrlSync'
import { configAtom } from '@/config/config'
import { useUserToken } from '@/hooks/useUserToken'
import { isBrowser } from '@/utils/browser'
import { appId, searchApiKey, indexName } from '@/utils/env'
import { getResultsState } from '@/utils/getResultsState'

export type SearchPageLayoutProps = BasicPageLayoutProps & {
  resultsState?: any
  searchState?: any
  userToken?: string
}

function SearchPageLayoutComponent({
  children,
  resultsState,
  searchState: initialSearchState,
  userToken: initialUserToken,
  ...props
}: SearchPageLayoutProps) {
  const { searchParameters: configSearchParameters } = useAtomValue(configAtom)
  const searchClient = useAtomValue(searchClientAtom)
  const { searchState, onSearchStateChange, createURL } = useUrlSync()
  const userToken = useUserToken() ?? initialUserToken

  const searchParameters = useMemo(
    () => ({
      userToken,
      enablePersonalization: Boolean(userToken),
      ...configSearchParameters,
    }),
    [userToken, configSearchParameters]
  )

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
  options?: GetServerSidePropsOptions | GetStaticPropsOptions,
  customProps?: Record<string, any>
) => {
  const searchState = urlToSearchState(url)
  const resultsState = await getResultsState({
    component,
    searchState,
    appId,
    searchApiKey,
    indexName,
    userToken: customProps?.userToken,
  })

  return {
    props: {
      ...customProps,
      searchState,
      resultsState,
    },
    ...options,
  }
}

export const getServerSidePropsPage = (
  component: React.ComponentType,
  options?: GetServerSidePropsOptions,
  customProps?: Record<string, any>
) =>
  function (context: GetServerSidePropsContext) {
    let props = customProps

    const userTokenCookie = context.req.cookies._ALGOLIA
    if (userTokenCookie) {
      props = { ...customProps, userToken: userTokenCookie }
    }

    return getPropsPage(component, context?.resolvedUrl || '', options, props)
  }

export const getStaticPropsPage =
  (
    component: React.ComponentType,
    options?: GetStaticPropsOptions,
    customProps?: Record<string, any>
  ) =>
  (context: GetStaticPropsContext) =>
    getPropsPage(
      component,
      (context?.params?.id as string) || '',
      options,
      customProps
    )
