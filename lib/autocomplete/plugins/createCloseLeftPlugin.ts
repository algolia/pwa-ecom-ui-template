import type {
  OnStateChangeProps,
  AutocompletePlugin,
} from '@algolia/autocomplete-js'

export default function createCloseLeftPlugin<
  TItem extends Record<string, unknown>,
  TData
>(): AutocompletePlugin<TItem, TData> {
  let clearBtnEl: HTMLElement | null
  let submitBtnEl: HTMLElement | null

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
        if (clearBtnEl) prefixLabelEl?.prepend(clearBtnEl)
      })
    },

    onStateChange({ state }: OnStateChangeProps<TItem>) {
      const isQueryEmpty = !state.query

      // Show/hide clear/submit button elements based on the current query
      if (clearBtnEl) clearBtnEl.style.display = isQueryEmpty ? 'none' : 'block'
      if (submitBtnEl)
        submitBtnEl.style.display = isQueryEmpty ? 'block' : 'none'
    },
  }
}
