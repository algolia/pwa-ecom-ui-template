import type { GetStaticPropsContext, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

import { Search } from '@instantsearch/search/search'

import { BannerXS } from '@/components/banner/banner-xs'
import { Footer } from '@/components/footer/footer'
import type { NavProps } from '@/components/nav/nav'
import { appId, indexName, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/page'
import { urlToSearchState } from '@/utils/url'

export type PageLayoutProps = {
  children?: React.ReactNode
  resultsState?: any
}

const Nav = dynamic<NavProps>(() =>
  import(/* webpackChunkName: 'nav' */ '@/components/nav/nav').then(
    (mod) => mod.Nav
  )
)

export function PageLayout({ children, ...props }: PageLayoutProps) {
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

      <Footer />
    </Search>
  )
}

const getPropsPage = async (component: React.ComponentType, url: string) => {
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
  }
}

export const getServerSidePropsPage =
  (component: React.ComponentType) => (context: GetServerSidePropsContext) =>
    getPropsPage(component, context?.resolvedUrl || '')

export const getStaticPropsPage =
  (component: React.ComponentType) => (context: GetStaticPropsContext) =>
    getPropsPage(component, (context?.params?.id as string) || '')
