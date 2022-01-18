import { useCallback } from 'react'

import { isDev } from '@/utils/env'

import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

export function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
) {
  if (isDev) {
    checkDeps(dependencies, 'useDeepCompareCallback')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, useDeepCompareMemoize(dependencies))
}
