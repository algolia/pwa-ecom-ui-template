import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import AppLayout from '@/layouts/AppLayout'

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppLayout>
      <Head>
        <title>PWA Storefront UI template</title>
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}
