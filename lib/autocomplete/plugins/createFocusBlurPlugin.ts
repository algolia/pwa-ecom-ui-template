import type { BaseItem } from '@algolia/autocomplete-core'
import type { AutocompletePlugin } from '@algolia/autocomplete-js'

type CreateFocusBlurPluginProps = {
  onFocusBlur?: (isFocused: boolean) => void
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
  let rafId = -1

  const onFocus = () => {
    if (typeof onFocusBlur === 'function') onFocusBlur(true)
  }
  const onBlur = () => {
    if (typeof onFocusBlur === 'function') onFocusBlur(false)
  }

  return {
    subscribe() {
      // Wait for the autocomplete to be mounted
      rafId = window.requestAnimationFrame(() => {
        inputEl = document.querySelector('.aa-Input')

        if (inputEl) {
          inputEl.addEventListener('focus', onFocus)
          inputEl.addEventListener('blur', onBlur)
        }
      })
    },

    unsubscribe() {
      window.cancelAnimationFrame(rafId)

      if (inputEl) {
        inputEl.removeEventListener('focus', onFocus)
        inputEl.removeEventListener('blur', onBlur)
      }
    },
  }
}
