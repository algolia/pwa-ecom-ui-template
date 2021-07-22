import type { Dispatch } from 'react'
import { createContext } from 'react'

import type { AppActions } from '@/state/actions'
import type { AppState } from '@/state/state'
import { initialAppState } from '@/state/state'

export interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppActions>
}

const AppContext = createContext<AppContextValue>({
  state: initialAppState,
  dispatch: () => undefined,
})

export default AppContext
