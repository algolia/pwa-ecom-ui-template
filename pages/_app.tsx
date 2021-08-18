import type { AppProps } from 'next/app'
import Head from 'next/head'

/// #if DEV
import { Dev } from '@dev/dev'
import '@/lib/dev/wdyr'
/// #endif

import { AppLayout } from '@/layouts/app-layout'
import { isDev } from '@/utils/env'

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <title>Spencer and Williams</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </Head>

      <Component {...pageProps} />

      {isDev && <Dev />}
    </AppLayout>
  )
}
