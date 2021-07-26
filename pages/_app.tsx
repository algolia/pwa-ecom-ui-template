import type { AppProps } from 'next/app'
import Head from 'next/head'

import AppLayout from '@/layouts/AppLayout'

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppLayout>
      <Head>
        <title>Spencer and Williams</title>
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}
