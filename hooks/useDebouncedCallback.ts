import { useCallback, useEffect, useMemo, useRef } from 'react'

export function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => void,
  wait: number = 150
) {
  const argsRef = useRef<T>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const cleanup = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  return useMemo(
    () =>
      function debouncedCallback(...args: T) {
        argsRef.current = args

        cleanup()

        timeout.current = setTimeout(() => {
          if (argsRef.current) {
            callback(...argsRef.current)
          }
        }, wait)
      },
    [cleanup, callback, wait]
  )
}
