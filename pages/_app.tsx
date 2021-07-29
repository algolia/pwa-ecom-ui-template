import type { AppProps } from 'next/app'
import Head from 'next/head'

/// #if DEV
import Dev from '@/components/dev/dev'
/// #endif
import AppLayout from '@/layouts/AppLayout'
import { isDev } from '@/utils/env'

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppLayout>
      <Head>
        <title>Spencer and Williams</title>
      </Head>
      <Component {...pageProps} />
      {isDev && <Dev />}
    </AppLayout>
  )
}
