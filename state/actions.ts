export enum ActionType {
  SetDevGridVisibility = 'SetDevGridVisibility',
  SetRefinementExpanded = 'SetRefinementExpanded',
}

export interface SetDevGridVisibility {
  type: ActionType.SetDevGridVisibility
  payload: boolean
}

export interface SetRefinementExpanded {
  type: ActionType.SetRefinementExpanded
  payload: boolean
}

export type AppActions = SetDevGridVisibility | SetRefinementExpanded
