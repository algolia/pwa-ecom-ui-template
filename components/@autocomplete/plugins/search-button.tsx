import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import { useCallback } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import { createTemplatePlugin } from '@/lib/autocomplete/plugins/createTemplatePlugin'
import { Button } from '@ui/button/button'

type SearchButtonPluginCreatorParams = {
  initialQuery?: string
  onClick?: (props: OnStateChangeProps<any>) => void
}

type SearchButtonProps = {
  props: OnStateChangeProps<any>
  onClick?: (props: OnStateChangeProps<any>) => void
}

function SearchButton({
  props,
  onClick: customOnClick = () => {},
}: SearchButtonProps) {
  const onClick = useCallback(
    () => customOnClick(props),
    [customOnClick, props]
  )

  return (
    <div
      className="absolute right-0 h-full pr-2 pt-2 pb-2"
      hidden={Boolean(!props.state?.query)}
    >
      <Button type="tertiary" className="h-full" onClick={onClick}>
        Search
      </Button>
    </div>
  )
}

export function searchButtonPluginCreator({
  initialQuery,
  onClick,
}: SearchButtonPluginCreatorParams) {
  let root: Root | null = null
  let rootElCache: HTMLElement | null = null

  return createTemplatePlugin({
    initialQuery,
    container: '.aa-InputWrapperSuffix',
    render(rootEl, props) {
      if (!root || rootElCache !== rootEl) {
        rootElCache = rootEl
        root?.unmount()
        root = createRoot(rootEl)
      }
      root.render(<SearchButton props={props} onClick={onClick} />)
    },
  })
}
