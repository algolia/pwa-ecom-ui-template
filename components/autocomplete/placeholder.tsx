import { useEffect, useMemo } from 'react'

import type { AutocompleteProps } from './autocomplete'
import { usePlaceholder } from './usePlaceholder'

type AutocompletePlaceholder = Pick<AutocompleteProps, 'placeholders'> & {
  autocompleteContainer: Element
  wordDelay?: number
  letterDelay?: number
}

export default function Placeholder({
  placeholders = [],
  autocompleteContainer,
  wordDelay,
  letterDelay,
}: AutocompletePlaceholder): null {
  // Get placeholder DOM element
  const placeholderEl = autocompleteContainer.querySelector(
    '.aa-DetachedSearchButtonPlaceholder'
  )

  // Get current placeholder and compute full placeholder
  const placeholder = usePlaceholder(placeholders, wordDelay, letterDelay)
  const placeholderFull = useMemo(() => `Search ${placeholder}`, [placeholder])

  // Update placeholder element innerHTML
  useEffect(() => {
    if (placeholderEl) {
      placeholderEl.innerHTML = placeholderFull
    } else {
      throw new Error(`'Placeholder': Can't find placeholder DOM element.`)
    }
  }, [placeholderFull, placeholderEl])

  // Renderless component
  return null
}
