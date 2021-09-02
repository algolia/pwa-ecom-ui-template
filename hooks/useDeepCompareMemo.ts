import { useMemo } from 'react'

import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

import { isDev } from '@/utils/env'

export function useDeepCompareMemo<T>(
  factory: () => T,
  dependencies: React.DependencyList
) {
  if (isDev) {
    checkDeps(dependencies, 'useDeepCompareMemo')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies))
}
