import type { RefObject } from 'react'

export function getRefElement<T>(
  element?: RefObject<Element> | T
): Element | T | null | undefined {
  if (element && 'current' in element) {
    return element.current
  }

  return element
}
