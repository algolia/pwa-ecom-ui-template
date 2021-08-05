import type { AppProps } from 'next/app'
import Head from 'next/head'

import AppLayout from '@/layouts/AppLayout'
import { isDev } from '@/utils/env'
/// #if DEV
import Dev from '@dev/dev'
/// #endif

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
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
