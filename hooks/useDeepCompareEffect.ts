import { useEffect } from 'react'

import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

import { isDev } from '@/utils/env'

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: React.DependencyList
) {
  if (isDev) {
    checkDeps(dependencies, 'useDeepCompareEffect')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies))
}
