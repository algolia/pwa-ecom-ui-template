import { useContext } from 'react'

import type { AppContextValue } from '@/contexts/AppContext'
import AppContext from '@/contexts/AppContext'

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error(
      `'useAppContext': This function should be call inside the 'App' component.`
    )
  }
  return context
}
