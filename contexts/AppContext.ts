import type { Dispatch } from 'react'
import { createContext } from 'react'

import type { AppActions } from '@/state/actions'
import type { AppState } from '@/state/state'
import { initialAppState } from '@/state/state'

export type AppContextValue = {
  state: AppState
  dispatch: Dispatch<AppActions>
}

export const AppContext = createContext<AppContextValue>({
  state: initialAppState,
  dispatch: () => undefined,
})
AppContext.displayName = 'AppContext'
