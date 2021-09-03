import 'react-instantsearch-core'

declare module 'react-instantsearch-core' {
  // SortBy
  export interface SortByProvided {
    items: Array<{ label: string; value: string; isRefined: boolean }>
    currentRefinement: string
    refine: (...args: any[]) => void
    createURL: (...args: any[]) => string
  }

  // RangeInput
  export type RangeInputRefinement = {
    min?: number
    max?: number
  }

  export interface RangeInputProvided {
    currentRefinement: RangeInputRefinement
    min: number
    max: number
    precision: number
    refine: (...args: any[]) => void
    createURL: (...args: any[]) => string
  }

  // RatingMenu
  export interface RatingMenuRefinement {
    min?: number
    max?: number
  }

  export interface RatingMenuProvided {
    refine: (value: RatingMenuRefinement) => any
    createURL: (...args: any[]) => any
    min: number
    max: number
    count: Array<{ value: string; count: number }>
    currentRefinement: RatingMenuRefinement
  }

  // RelevantSort
  export interface RelevantSortProvided {
    isVirtualReplica: boolean
    isRelevantSorted: boolean
    refine: (value: number | undefined) => any
    buttonTextComponent: React.Component
    textComponent?: React.Component
  }
}
