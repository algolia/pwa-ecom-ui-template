import { m } from 'framer-motion'
import { useAtomValue } from 'jotai/utils'
import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'

import { searchClientAtom } from './app-layout'

import { Search } from '@/components/@instantsearch/search'
import { appId, indexName, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/getResultsState'
import { urlToSearchState } from '@/utils/url'

export type PageLayoutProps = {
  children: React.ReactNode
  searchState?: any
  resultsState?: any
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const transition = { type: 'linear' }

export function PageLayout({ children, ...props }: PageLayoutProps) {
  const searchClient = useAtomValue(searchClientAtom)
  return (
    <Search
      searchClient={searchClient}
      appId={appId}
      searchApiKey={searchApiKey}
      indexName={indexName}
      {...props}
    >
      <m.main
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={transition}
      >
        {children}
      </m.main>
    </Search>
  )
}

export type GetServerSidePropsOptions = Partial<GetServerSidePropsResult<any>>
export type GetStaticPropsOptions = Partial<GetStaticPropsResult<any>>

const getPropsPage = async (
  component: React.ComponentType,
  url: string,
  options: GetServerSidePropsOptions | GetStaticPropsOptions | undefined
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
