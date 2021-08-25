import type {
  GetStaticPropsContext,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next'

import { Search } from '@instantsearch/search/search'

import { BannerXS } from '@/components/banner/banner-xs'
import { FooterDynamic as Footer } from '@/components/footer/footer'
import { HeaderDynamic as Header } from '@/components/header/header'
import { LoadingBar } from '@/components/loading-bar/loading-bar'
import { Overlay } from '@/components/overlay/overlay'
import { appId, indexName, searchApiKey } from '@/utils/env'
import { getResultsState } from '@/utils/page'
import { urlToSearchState } from '@/utils/url'

export type PageLayoutProps = {
  children?: React.ReactNode
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
