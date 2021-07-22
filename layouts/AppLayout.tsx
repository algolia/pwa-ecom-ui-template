import Head from 'next/head'
import { useMemo, useReducer } from 'react'

import AppContext from '@/contexts/AppContext'
import { appReducer } from '@/state/reducer'
import { initialAppState } from '@/state/state'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <AppContext.Provider value={value}>
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite-min.css"
        /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic"
        />
      </Head>
      {children}
    </AppContext.Provider>
  )
}
