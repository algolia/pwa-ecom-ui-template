import 'react-instantsearch-dom'

declare module 'react-instantsearch-dom' {
  // eslint-disable-next-line react/prefer-stateless-function
  export class ExperimentalDynamicWidgets extends React.Component<any> {}

  export interface RangeInputCurrentRefinement {
    min?: number
    max?: number
  }

  export interface RatingMenuCurrentRefinement {
    min?: number
    max?: number
  }

  export interface RatingMenuProvided {
    refine: (value: RatingMenuCurrentRefinement) => any
    createURL: (...args: any[]) => any
    min: number
    max: number
    count: Array<{ value: string; count: number }>
    currentRefinement: RatingMenuCurrentRefinement
  }
}
