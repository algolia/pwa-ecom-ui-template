import { ActionType } from './actions'
import type { AppActions } from './actions'
import type { AppState } from './state'

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.SetDevGridVisibility:
      return {
        ...state,
        dev: { grid: { hidden: action.payload } },
      }

    case ActionType.SetRefinementExpanded:
      return {
        ...state,
        refinements: {
          expanded: action.payload,
        },
      }

    default:
      return state
  }
}
