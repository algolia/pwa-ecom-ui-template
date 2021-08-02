import type {
  AutocompletePlugin,
  OnStateChangeProps,
} from '@algolia/autocomplete-js'

type CreateTemplatePluginProps = {
  container: string | HTMLElement
  render?: (root: HTMLElement, props: OnStateChangeProps<any>) => void
}

export default function createTemplatePlugin<
  TItem extends Record<string, unknown>,
  TData
>({
  container,
  render,
}: CreateTemplatePluginProps): AutocompletePlugin<TItem, TData> {
  const rootEl =
    typeof document !== 'undefined' ? document.createElement('div') : null

  const renderFn = (props: OnStateChangeProps<any>) => {
    if (render && rootEl) {
      render(rootEl, props)
    }
  }

  return {
    subscribe() {
      window.requestAnimationFrame(() => {
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

          renderFn({} as OnStateChangeProps<any>)
        }
      })
    },

    onStateChange(props) {
      renderFn(props as OnStateChangeProps<any>)
    },
  }
}
