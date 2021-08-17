import { render } from 'react-dom'

import { Button } from '@ui/button/button'

import { createTemplatePlugin } from '@/lib/autocomplete/plugins/createTemplatePlugin'

type SearchButtonPluginCreatorProps = {
  initialQuery?: string
}

export function searchButtonPluginCreator({
  initialQuery,
}: SearchButtonPluginCreatorProps) {
  return createTemplatePlugin({
    initialQuery,
    container: '.aa-InputWrapperSuffix',
    render(root, { state }) {
      render(
        <div
          className="absolute right-0 h-full pr-2 pt-2 pb-2"
          hidden={Boolean(!state?.query)}
        >
          <Button type="tertiary" className="h-full">
            Search
          </Button>
        </div>,
        root
      )
    },
  })
}
