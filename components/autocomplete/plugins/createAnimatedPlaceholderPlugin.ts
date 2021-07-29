import type { AutocompletePlugin } from '@algolia/autocomplete-js'

type CreateAnimatedPlaceholderPluginProps = {
  placeholders: string[]
  placeholderTemplate: (currentPlaceholder: string) => string
  wordDelay?: number
  letterDelay?: number
}

export default function createAnimatedPlaceholderPlugin<
  TItem extends Record<string, unknown>,
  TData
>({
  placeholders,
  placeholderTemplate,
  wordDelay = 1000,
  letterDelay = 150,
}: CreateAnimatedPlaceholderPluginProps): AutocompletePlugin<TItem, TData> {
  let currentPlaceholderWordIdx = 0
  let placeholderInterval: ReturnType<typeof setInterval>

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

        setTimeout(() => {
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
      // Wait for the autocomplete to be mounted
      window.requestAnimationFrame(() => {
        // Get placeholder div/input element
        const placeholderEl =
          document.querySelector('.aa-DetachedSearchButtonPlaceholder') ||
          document.querySelector('.aa-Input')

        if (!placeholderEl) return

        // Get placeholder type
        const isInputPlaceholder = placeholderEl.hasAttribute('placeholder')

        updatePlaceholder((placeholderWord) => {
          // Get final placeholder
          const placeholder =
            typeof placeholderTemplate === 'function'
              ? placeholderTemplate(placeholderWord)
              : placeholderWord

          // Update placeholder element attribute/innerHTML
          if (isInputPlaceholder) {
            // Don't update placeholder if input is focused or has value
            if (
              document.activeElement !== placeholderEl &&
              !(placeholderEl as HTMLInputElement).value
            ) {
              placeholderEl.setAttribute('placeholder', placeholder)
            }
          } else {
            placeholderEl.innerHTML = placeholder
          }
        })
      })
    },
  }
}
