import { isomorphicDocument } from './browser'

export function scrollToTop(
  behavior: 'auto' | 'smooth' = 'auto',
  root = isomorphicDocument?.documentElement
) {
  if (root) {
    const rootEl = root
    const defaultScrollBehavior = rootEl.style.scrollBehavior
    rootEl.style.scrollBehavior = behavior
    rootEl.scrollTop = 0
    rootEl.style.scrollBehavior = defaultScrollBehavior
  }
}
