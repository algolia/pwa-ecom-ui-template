import type { BaseItem } from '@algolia/autocomplete-core'
import type {
  AutocompletePlugin,
  OnStateChangeProps,
} from '@algolia/autocomplete-js'

type CreateTemplatePluginProps = {
  container: HTMLElement | string
  render?: (rootEl: HTMLElement, props: OnStateChangeProps<any>) => void
  initialQuery?: string
}

type CustomAutocompletePlugin<
  TItem extends BaseItem,
  TData
> = AutocompletePlugin<TItem, TData> & {
  unsubscribe?: () => void
}

export function createTemplatePlugin<
  TItem extends Record<string, unknown>,
  TData
>({
  container,
  render,
  initialQuery = '',
}: CreateTemplatePluginProps): CustomAutocompletePlugin<TItem, TData> {
  const rootEl =
    typeof document !== 'undefined' ? document.createElement('div') : undefined
  let rafId = -1

  const renderFn = (props: OnStateChangeProps<any>) => {
    if (render && rootEl) {
      render(rootEl, props)
    }
  }

  return {
    subscribe() {
      rafId = window.requestAnimationFrame(() => {
        const containerEl =
          typeof container === 'string'
            ? document.querySelector<HTMLDivElement>(container)
            : container

        if (rootEl) {
          rootEl.setAttribute(
            'style',
            'position: relative; width: 100%; height: 100%;'
          )
          containerEl?.appendChild(rootEl)

          renderFn({
            state: { query: initialQuery },
          } as OnStateChangeProps<any>)
        }
      })
    },

    unsubscribe() {
      window.cancelAnimationFrame(rafId)
    },

    onStateChange(props) {
      renderFn(props as OnStateChangeProps<any>)
    },
  }
}
