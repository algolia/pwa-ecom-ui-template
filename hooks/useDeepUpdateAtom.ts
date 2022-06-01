import type { WritableAtom } from 'jotai'
import { useAtom } from 'jotai'
import type { Scope, SetAtom } from 'jotai/core/atom'
import { useCallback, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

type ResolveType<T> = T extends Promise<infer V> ? V : T

export function useDeepUpdateAtom<TValue, TUpdate>(
  anAtom: WritableAtom<TValue, TUpdate>,
  scope?: Scope
): [ResolveType<TValue>, SetAtom<TUpdate, void>] {
  const [currentAtomValue, _setAtomValue] = useAtom(anAtom, scope)

  const currentAtomValueRef = useRef(currentAtomValue)

  useEffect(() => {
    currentAtomValueRef.current = currentAtomValue
  }, [currentAtomValue])

  const setAtomValue = useCallback((update?: TUpdate) => {
    const currAtomValue = currentAtomValueRef.current

    const nextAtomValue =
      typeof update === 'function' ? update(currAtomValue) : update

    if (!isEqual(currAtomValue, nextAtomValue)) {
      _setAtomValue(nextAtomValue)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // @ts-expect-error
  return [currentAtomValue, setAtomValue]
}
