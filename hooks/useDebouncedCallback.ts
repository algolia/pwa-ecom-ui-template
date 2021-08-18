import { useCallback, useEffect, useRef } from 'react'

export function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => void,
  wait: number
) {
  const argsRef = useRef<T>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  useEffect(() => cleanup, [])

  return useCallback(
    function debouncedCallback(...args: T) {
      argsRef.current = args

      cleanup()

      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current)
        }
      }, wait)
    },
    [callback, wait]
  )
}
