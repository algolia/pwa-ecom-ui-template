import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import isEqual from 'react-fast-compare'

export function useDeepCompareState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [currentState, _setState] = useState<T>(initialState)

  const currentStateRef = useRef<T>(currentState)

  useEffect(() => {
    currentStateRef.current = currentState
  }, [currentState])

  const setState = useCallback((state: SetStateAction<T>) => {
    const currState = currentStateRef.current

    const nextState =
      typeof state === 'function'
        ? (state as (prevState: T) => T)(currState)
        : state

    if (!isEqual(currState, nextState)) {
      _setState(nextState)
    }
  }, [])

  return [currentState, setState]
}
