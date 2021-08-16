import { useMemo, useReducer } from 'react'

import { AppContext } from '@/contexts/AppContext'
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

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
