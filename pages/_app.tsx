import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'

/// #if DEV
import { Dev } from '@dev/dev'
import '@/lib/dev/wdyr'
/// #endif

import { BannerXS } from '@/components/banner/banner-xs'
import type { FooterProps } from '@/components/footer/footer'
import type { HeaderProps } from '@/components/header/header'
import { LoadingBar } from '@/components/loading-bar/loading-bar'
import { Overlay } from '@/components/overlay/overlay'
import { AppLayout } from '@/layouts/app-layout'
import { isDev } from '@/utils/env'
import { scrollToTop } from '@/utils/scrollToTop'

import '@/styles/_index.css'

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

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <title>Spencer and Williams</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </Head>

      <BannerXS>20% Off! Code: SPRING21 - Terms apply*</BannerXS>
      <Header />

      <AnimatePresence exitBeforeEnter={true} onExitComplete={scrollToTop}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>

      <Footer />

      <LoadingBar />
      <Overlay />

      {isDev && <Dev />}
    </AppLayout>
  )
}
