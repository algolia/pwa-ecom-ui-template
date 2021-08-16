import type {
  OnStateChangeProps,
  AutocompletePlugin,
} from '@algolia/autocomplete-js'

type CreateClearLeftPluginProps = {
  initialQuery?: string
}

export function createClearLeftPlugin<
  TItem extends Record<string, unknown>,
  TData
>({ initialQuery = '' }: CreateClearLeftPluginProps = {}): AutocompletePlugin<
  TItem,
  TData
> {
  let clearBtnEl: HTMLElement | null
  let submitBtnEl: HTMLElement | null

  const toggleBtns = (queryEmpty: boolean) => {
    if (clearBtnEl) clearBtnEl.style.display = queryEmpty ? 'none' : 'block'
    if (submitBtnEl) submitBtnEl.style.display = queryEmpty ? 'block' : 'none'
  }

  return {
    subscribe() {
      // Wait for the autocomplete to be mounted
      window.requestAnimationFrame(() => {
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

    onStateChange({ state }: OnStateChangeProps<TItem>) {
      // Show/hide clear/submit button elements based on the current query
      toggleBtns(!state.query)
    },
  }
}
