import type {
  AutocompleteApi,
  AutocompleteOptions,
  Pragma,
} from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import classNames from 'classnames'
import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import type { ReactNode } from 'react'
import { createElement, Fragment, useEffect, useRef } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'

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
  const panelRootRef = useRef<Root | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)

  const setAutocomplete = useUpdateAtom(autocompleteAtom)

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    const autocompleteInstance = autocomplete({
      container: customContainer ? customContainer : containerRef.current,
      panelContainer: customPanelContainer
        ? customPanelContainer
        : panelContainerRef.current,
      panelPlacement: 'full-width',
      initialState: {
        query: initialQuery,
      },
      renderer: {
        createElement: createElement as Pragma,
        Fragment,
        render: () => {},
      },
      render({ children: acChildren }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root
          panelRootRef.current?.unmount()
          panelRootRef.current = createRoot(root)
        }

        panelRootRef.current.render(acChildren as ReactNode)
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
