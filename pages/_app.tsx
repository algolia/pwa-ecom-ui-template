import type { AppProps } from 'next/app'
import React from 'react'

import AppLayout from '@/layouts/AppLayout'

import '@/styles/_index.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
