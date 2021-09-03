import { useRef } from 'react'
import isEqual from 'react-fast-compare'

export function checkDeps(deps: React.DependencyList, name: string) {
  const reactHookName = `React.${name.replace(/DeepCompare/, '')}`

  if (!deps || deps.length === 0) {
    throw new Error(
      `${name} should not be used with no dependencies. Use ${reactHookName} instead.`
    )
  }
}

export function useDeepCompareMemoize(value: React.DependencyList) {
  const ref = useRef<React.DependencyList>([])

  if (!isEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
