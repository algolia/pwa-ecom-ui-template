import { ActionType } from './actions'
import type { AppActions } from './actions'
import type { AppState } from './state'

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.SetGridVisibility:
      return {
        ...state,
        dev: { grid: { hidden: action.payload } },
      }

    default:
      return state
  }
}
