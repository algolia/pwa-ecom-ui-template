import type { BaseItem } from '@algolia/autocomplete-core'
import type { AutocompletePlugin } from '@algolia/autocomplete-js'

type CreateFocusBlurPluginProps = {
  onFocusBlur?: (isFocused: boolean, hasQuery: boolean) => void
}

type CustomAutocompletePlugin<
  TItem extends BaseItem,
  TData
> = AutocompletePlugin<TItem, TData> & {
  unsubscribe?: () => void
}

export function createFocusBlurPlugin<
  TItem extends Record<string, unknown>,
  TData
>({ onFocusBlur }: CreateFocusBlurPluginProps = {}): CustomAutocompletePlugin<
  TItem,
  TData
> {
  let inputEl: HTMLInputElement | null
  let hasQuery = false

  const onFocus = () => {
    if (typeof onFocusBlur === 'function') onFocusBlur(true, hasQuery)
  }
  const onBlur = () => {
    if (typeof onFocusBlur === 'function') onFocusBlur(false, hasQuery)
  }

  return {
    subscribe() {
      // Wait for the autocomplete to be mounted
      window.requestAnimationFrame(() => {
        inputEl = document.querySelector('.aa-Input')

        if (inputEl) {
          inputEl.addEventListener('focus', onFocus)
          inputEl.addEventListener('blur', onBlur)
        }
      })
    },

    onStateChange({ state }) {
      hasQuery = Boolean(state.query)
    },

    unsubscribe() {
      if (inputEl) {
        inputEl.removeEventListener('focus', onFocus)
        inputEl.removeEventListener('blur', onBlur)
      }
    },
  }
}
