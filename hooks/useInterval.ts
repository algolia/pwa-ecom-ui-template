import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay) return undefined

    function tick() {
      if (savedCallback.current) savedCallback.current()
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
