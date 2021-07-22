import { useEffect, useState } from 'react'

export function usePlaceholder(
  placeholders: string[],
  wordDelay: number = 1000,
  letterDelay: number = 150
) {
  const [placeholderWord, setPlaceholderWord] = useState('')

  useEffect(() => {
    let currentPlaceholderWordIdx = 0
    let placeholderInterval: ReturnType<typeof setInterval>
    let placeholderTimeout: ReturnType<typeof setTimeout>

    const updatePlaceholder = () => {
      setPlaceholderWord('')

      let currentPlaceholderLetterIdx = 1
      const currentPlaceholderWord = placeholders[currentPlaceholderWordIdx]
      const currentPlaceholderWordLength = currentPlaceholderWord.length

      placeholderInterval = setInterval(() => {
        if (currentPlaceholderLetterIdx > currentPlaceholderWordLength) {
          clearInterval(placeholderInterval)

          currentPlaceholderWordIdx =
            (currentPlaceholderWordIdx + 1) % placeholders.length

          placeholderTimeout = setTimeout(() => {
            updatePlaceholder()
          }, wordDelay)

          return
        }

        const currentPlaceholderLetters = currentPlaceholderWord.slice(
          0,
          currentPlaceholderLetterIdx
        )
        currentPlaceholderLetterIdx++
        setPlaceholderWord(currentPlaceholderLetters)
      }, letterDelay)
    }

    updatePlaceholder()

    return () => {
      clearInterval(placeholderInterval)
      clearTimeout(placeholderTimeout)
    }
  }, [placeholders, wordDelay, letterDelay])

  return placeholderWord
}
