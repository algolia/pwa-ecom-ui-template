import type { AutocompleteOptions } from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import classNames from 'classnames'
import type { ReactElement } from 'react'
import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

import { createFocusBlurPlugin } from '@/lib/autocomplete/plugins/createFocusBlurPlugin'

export type AutocompleteProps = Partial<AutocompleteOptions<any>> & {
  container?: HTMLElement | string
  panelContainer?: HTMLElement | string
  initialQuery?: string
  hidePanel?: boolean
  children?: React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
  onFocusBlur?: (isFocused: boolean, hasQuery: boolean) => void
}

export function Autocomplete({
  container: customContainer,
  panelContainer: customPanelContainer,
  plugins = [],
  initialQuery = '',
  hidePanel = false,
  children,
  onFocusBlur,
  ...props
}: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    plugins.push(
      createFocusBlurPlugin({
        onFocusBlur,
      })
    )

    const search = autocomplete({
      container: customContainer ?? containerRef.current,
      panelContainer: customPanelContainer ?? panelContainerRef.current,
      panelPlacement: 'full-width',
      detachedMediaQuery: '(max-width: 1439px)',
      openOnFocus: true,
      initialState: {
        query: initialQuery,
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

  const panelClassName = classNames('absolute w-full z-autocomplete-panel', {
    hidden: hidePanel,
  })

  return (
    <>
      <div className="w-full h-full flex items-center" ref={containerRef} />
      <div className={panelClassName} ref={panelContainerRef} />

      {children}
    </>
  )
}
