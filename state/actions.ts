export enum ActionType {
  SetDevGridVisibility = 'SetDevGridVisibility',
  SetRefinementExpanded = 'SetRefinementExpanded',
}

export type SetDevGridVisibility = {
  type: ActionType.SetDevGridVisibility
  payload: boolean
}

export type SetRefinementExpanded = {
  type: ActionType.SetRefinementExpanded
  payload: boolean
}

export type AppActions = SetDevGridVisibility | SetRefinementExpanded
