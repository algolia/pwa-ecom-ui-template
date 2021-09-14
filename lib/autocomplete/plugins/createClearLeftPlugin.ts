import type { BaseItem } from '@algolia/autocomplete-core'
import type {
  OnStateChangeProps,
  AutocompletePlugin,
} from '@algolia/autocomplete-js'

type CreateClearLeftPluginProps = {
  initialQuery?: string
}

type CustomAutocompletePlugin<
  TItem extends BaseItem,
  TData
> = AutocompletePlugin<TItem, TData> & {
  unsubscribe?: () => void
}

export function createClearLeftPlugin<
  TItem extends Record<string, unknown>,
  TData
>({
  initialQuery = '',
}: CreateClearLeftPluginProps = {}): CustomAutocompletePlugin<TItem, TData> {
  let clearBtnEl: HTMLElement | null
  let submitBtnEl: HTMLElement | null
  let rafId = -1

  const toggleBtns = (queryEmpty: boolean) => {
    if (clearBtnEl) clearBtnEl.style.display = queryEmpty ? 'none' : 'block'
    if (submitBtnEl) submitBtnEl.style.display = queryEmpty ? 'block' : 'none'
  }

  return {
    subscribe() {
      // Wait for the autocomplete to be mounted
      rafId = window.requestAnimationFrame(() => {
        clearBtnEl = document.querySelector('.aa-ClearButton')
        submitBtnEl = document.querySelector('.aa-SubmitButton')

        // Move clear button from suffix container to prefix
        const prefixLabelEl = document.querySelector(
          '.aa-InputWrapperPrefix .aa-Label'
        )
        if (clearBtnEl) {
          prefixLabelEl?.prepend(clearBtnEl)
        }

        toggleBtns(!initialQuery)
      })
    },

    unsubscribe() {
      window.cancelAnimationFrame(rafId)
    },

    onStateChange({ state }: OnStateChangeProps<TItem>) {
      // Show/hide clear/submit button elements based on the current query
      toggleBtns(!state.query)
    },
  }
}
