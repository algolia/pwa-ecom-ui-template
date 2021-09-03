export type RefinementType =
  | 'color'
  | 'hierarchical'
  | 'list'
  | 'price'
  | 'rating'
  | 'size'
  | 'sort'

export type RefinementOptions = Record<string, any>

export type RefinementWidget = {
  type: RefinementType
  options: RefinementOptions
}

export type Refinement = {
  type?: RefinementType
  header: string
  label: string
  isExpanded?: boolean
  options?: RefinementOptions
  widgets?: RefinementWidget[]
}

export type RefinementLayout = 'bar' | 'panel'
