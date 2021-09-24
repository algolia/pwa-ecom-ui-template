import { useEffect, useLayoutEffect } from 'react'

import { isBrowser } from '@/utils/browser'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
