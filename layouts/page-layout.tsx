import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'
import dynamic from 'next/dynamic'

import { Search } from '@instantsearch/search/search'

import { BannerXS } from '@/components/banner/banner-xs'
import type { FooterProps } from '@/components/footer/footer'
import type { HeaderProps } from '@/components/header/header'
import { LoadingBar } from '@/components/loading-bar/loading-bar'
import { Overlay } from '@/components/overlay/overlay'
import { appId, indexName, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/getResultsState'
import { urlToSearchState } from '@/utils/url'

export const Header = dynamic<HeaderProps>(() =>
  import(/* webpackChunkName: 'common' */ '@/components/header/header').then(
    (mod) => mod.Header
  )
)

export const Footer = dynamic<FooterProps>(() =>
  import(/* webpackChunkName: 'common' */ '@/components/footer/footer').then(
    (mod) => mod.Footer
  )
)

export type PageLayoutProps = {
  children: React.ReactNode
  searchState?: any
  resultsState?: any
}

export function PageLayout({ children, ...props }: PageLayoutProps) {
  return (
    <Search
      appId={appId}
      searchApiKey={searchApiKey}
      indexName={indexName}
      {...props}
    >
      <BannerXS>20% Off! Code: SPRING21 - Terms apply*</BannerXS>
      <Header />

      <main>{children}</main>

      <Footer />

      <LoadingBar />
      <Overlay />
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
