import type {
  AutocompleteApi,
  AutocompleteOptions,
} from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'
import type { ReactElement } from 'react'
import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

import { searchStateAtom } from '@/components/@instantsearch/search'

export type AutocompleteProps = Partial<AutocompleteOptions<any>> & {
  container?: HTMLElement | string
  panelContainer?: HTMLElement | string
  initialQuery?: string
  hidePanel?: boolean
  children?: React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
}

export function Autocomplete({
  container: customContainer,
  panelContainer: customPanelContainer,
  plugins = [],
  initialQuery = '',
  hidePanel = false,
  children,

  ...props
}: AutocompleteProps) {
  const autocompleteRef = useRef<AutocompleteApi<any>>()
  const containerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    autocompleteRef.current = autocomplete({
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

      autocompleteRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customContainer,
    customPanelContainer,
    initialQuery,
    plugins,
    props.onSubmit,
    props.onStateChange,
  ])

  const searchState = useAtomValue(searchStateAtom)
  useEffect(
    () => autocompleteRef.current?.setQuery(searchState.query),
    [searchState.query]
  )

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
