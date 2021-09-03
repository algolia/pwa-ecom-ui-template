import 'react-instantsearch-dom'

declare module 'react-instantsearch-dom' {
  // eslint-disable-next-line react/prefer-stateless-function
  export class ExperimentalDynamicWidgets extends React.Component<any> {}
}
