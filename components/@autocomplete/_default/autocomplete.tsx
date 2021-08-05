import type { AutocompleteOptions } from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import type { ReactElement } from 'react'
import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

import { useClassNames } from '@/hooks/useClassNames'

export interface AutocompleteProps extends Partial<AutocompleteOptions<any>> {
  container?: string | HTMLElement
  panelContainer?: string | HTMLElement
  initialQuery?: string
  hidePanel?: boolean
  children?: React.ReactNode
}

export default function Autocomplete({
  container: customContainer,
  panelContainer: customPanelContainer,
  plugins = [],
  initialQuery = '',
  hidePanel = false,
  children,
  ...props
}: AutocompleteProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: customContainer ?? containerRef.current,
      panelContainer: customPanelContainer ?? panelContainerRef.current,
      panelPlacement: 'full-width',
      detachedMediaQuery: '(max-width: 1439px)',
      openOnFocus: true,
      initialState: {
        query: initialQuery,
      },
      classNames: {
        root: 'Root',
        form: 'Form',
        input: 'Input',
        submitButton: 'SubmitButton',
        loadingIndicator: 'LoadingIndicator',
        label: 'Label',
        panel: 'Panel',
        detachedSearchButton: 'DetachedSearchButton',
        detachedSearchButtonIcon: 'DetachedSearchButtonIcon',
        detachedSearchButtonPlaceholder: 'DetachedSearchButtonPlaceholder',
      },
      renderer: { createElement, Fragment },
      render({ children: acChildren }, root) {
        render(acChildren as ReactElement, root)
      },
      plugins,
      ...props,
    })

    return () => {
      // Waiting for an 'unsubscribe' method on Autocomplete plugin API
      plugins.forEach((plugin: any) => {
        if (typeof plugin.unsubscribe === 'function') {
          plugin.unsubscribe()
        }
      })

      search.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customContainer, customPanelContainer])

  const panelClassName = useClassNames(
    'absolute w-full z-10',
    { hidden: hidePanel },
    [hidePanel]
  )

  return (
    <>
      <div className="w-full h-full flex items-center" ref={containerRef} />
      <div className={panelClassName} ref={panelContainerRef} />

      {children}
    </>
  )
}
