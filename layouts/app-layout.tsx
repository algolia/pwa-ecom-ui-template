import { useMemo, useReducer } from 'react'

import { AppContext } from '@/contexts/AppContext'
import { MediaContextProvider } from '@/lib/media'
import { appReducer } from '@/state/reducer'
import { initialAppState } from '@/state/state'

export type AppLayoutProps = {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
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
      <MediaContextProvider>{children}</MediaContextProvider>
    </AppContext.Provider>
  )
}
