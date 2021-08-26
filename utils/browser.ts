export const isBrowser = typeof window !== 'undefined'

export function getScrollbarWidth() {
  return isBrowser
    ? window.innerWidth - document.documentElement.clientWidth
    : 0
}
