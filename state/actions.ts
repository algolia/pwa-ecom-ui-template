export enum ActionType {
  SetGridVisibility = 'SetGridVisibility',
}

export interface SetGridVisibility {
  type: ActionType.SetGridVisibility
  payload: boolean
}

export type AppActions = SetGridVisibility
