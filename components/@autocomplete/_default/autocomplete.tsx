import type {
  AutocompleteApi,
  AutocompleteOptions,
} from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import classNames from 'classnames'
import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import type { ReactElement } from 'react'
import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

export type AutocompleteProps = Partial<AutocompleteOptions<any>> & {
  container?: HTMLElement | string
  panelContainer?: HTMLElement | string
  initialQuery?: string
  hidePanel?: boolean
  children?: React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
}

export const autocompleteAtom = atom<AutocompleteApi<any> | null>(null)

export function Autocomplete({
  container: customContainer,
  panelContainer: customPanelContainer,
  plugins = [],
  initialQuery = '',
  hidePanel = false,
  children,
  ...props
}: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)

  const setAutocomplete = useUpdateAtom(autocompleteAtom)

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    const autocompleteInstance = autocomplete({
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

    setAutocomplete(autocompleteInstance)

    return () => {
      setAutocomplete(null)

      // Waiting for an 'unsubscribe' method on Autocomplete plugin API
      plugins.forEach((plugin: any) => {
        if (typeof plugin.unsubscribe === 'function') {
          plugin.unsubscribe()
        }
      })

      autocompleteInstance?.destroy()
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
