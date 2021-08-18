import type { BaseItem } from '@algolia/autocomplete-core'
import type { AutocompletePlugin } from '@algolia/autocomplete-js'

type CreateAnimatedPlaceholderPluginProps = {
  placeholders: string[]
  placeholderTemplate: (currentPlaceholder: string) => string
  wordDelay?: number
  letterDelay?: number
}

type CustomAutocompletePlugin<
  TItem extends BaseItem,
  TData
> = AutocompletePlugin<TItem, TData> & {
  unsubscribe?: () => void
}

export function createAnimatedPlaceholderPlugin<
  TItem extends Record<string, unknown>,
  TData
>({
  placeholders,
  placeholderTemplate,
  wordDelay = 1000,
  letterDelay = 150,
}: CreateAnimatedPlaceholderPluginProps): CustomAutocompletePlugin<
  TItem,
  TData
> {
  let currentPlaceholderWordIdx = 0
  let placeholderInterval: ReturnType<typeof setInterval>
  let placeholderTimeout: ReturnType<typeof setTimeout>
  let subscribed = false

  const updatePlaceholder = (cb: (placeholderWord: string) => void) => {
    cb('')

    let currentPlaceholderLetterIdx = 1
    const currentPlaceholderWord = placeholders[currentPlaceholderWordIdx]
    const currentPlaceholderWordLength = currentPlaceholderWord.length

    placeholderInterval = setInterval(() => {
      if (currentPlaceholderLetterIdx > currentPlaceholderWordLength) {
        clearInterval(placeholderInterval)

        currentPlaceholderWordIdx =
          (currentPlaceholderWordIdx + 1) % placeholders.length

        placeholderTimeout = setTimeout(() => {
          updatePlaceholder(cb)
        }, wordDelay)

        return
      }

      const currentPlaceholderLetters = currentPlaceholderWord.slice(
        0,
        currentPlaceholderLetterIdx
      )
      currentPlaceholderLetterIdx++
      cb(currentPlaceholderLetters)
    }, letterDelay)
  }

  return {
    subscribe() {
      if (subscribed) return
      subscribed = true

      updatePlaceholder((placeholderWord) => {
        // Get placeholder input elements
        const placeholderEl = document.querySelector('.aa-Input')
        const placeholderDetachedEl = document.querySelector(
          '.aa-DetachedSearchButtonPlaceholder'
        )

        // Get final placeholder
        const placeholder =
          typeof placeholderTemplate === 'function'
            ? placeholderTemplate(placeholderWord)
            : placeholderWord

        // Don't update placeholder if input is focused or has value
        if (
          placeholderEl &&
          document.activeElement !== placeholderEl &&
          !(placeholderEl as HTMLInputElement).value
        ) {
          placeholderEl.setAttribute('placeholder', placeholder)
        }

        // Update detached mode placeholder if exists
        if (placeholderDetachedEl) {
          placeholderDetachedEl.innerHTML = placeholder
        }
      })
    },

    unsubscribe() {
      clearInterval(placeholderInterval)
      clearTimeout(placeholderTimeout)
    },
  }
}
