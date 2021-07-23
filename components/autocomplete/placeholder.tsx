import type { RefObject } from 'react'
import { useEffect, useMemo } from 'react'

import type { AutocompleteProps } from './autocomplete'
import { usePlaceholder } from './usePlaceholder'

type AutocompletePlaceholder = Pick<AutocompleteProps, 'placeholders'> & {
  autocompleteRef: RefObject<HTMLDivElement>
  wordDelay?: number
  letterDelay?: number
}

export default function Placeholder({
  placeholders = [],
  autocompleteRef,
  wordDelay,
  letterDelay,
}: AutocompletePlaceholder): null {
  // Get current placeholder and compute full placeholder
  const placeholder = usePlaceholder(placeholders, wordDelay, letterDelay)
  const placeholderFull = useMemo(() => `Search ${placeholder}`, [placeholder])

  useEffect(() => {
    if (!autocompleteRef.current) return undefined

    // Get placeholder div/input element
    const placeholderEl =
      autocompleteRef.current.querySelector(
        '.aa-DetachedSearchButtonPlaceholder'
      ) || autocompleteRef.current.querySelector('.aa-Input')

    // Update placeholder element attribute/innerHTML
    if (placeholderEl) {
      const isInputPlaceholder = placeholderEl.hasAttribute('placeholder')

      if (isInputPlaceholder) {
        placeholderEl.setAttribute('placeholder', placeholderFull)
      } else {
        placeholderEl.innerHTML = placeholderFull
      }
    }

    return () => {}
  }, [autocompleteRef, placeholderFull])

  // Renderless component
  return null
}
