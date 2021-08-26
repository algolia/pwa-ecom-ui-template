import { useEffect, useState } from 'react'

import { isBrowser } from '@/utils/browser'

export function useMedia(queries: string[]) {
  const [state, setState] = useState(
    isBrowser
      ? () => queries.map((query) => window.matchMedia(query).matches)
      : new Array(queries.length).fill(false)
  )

  useEffect(() => {
    let mounted = true

    const updateState = (matches: boolean, i: number) => {
      setState((prevState) => {
        if (prevState[i] === matches) return prevState
        const newState = prevState
        newState[i] = matches
        return [...newState]
      })
    }

    const onChange = (e: MediaQueryListEvent, i: number) => {
      if (!mounted) {
        return
      }
      updateState(e.matches, i)
    }

    const mqls = queries.map((query, i) => {
      const mql = window.matchMedia(query)

      const mqlCb = (e: MediaQueryListEvent) => onChange(e, i)
      mql.addEventListener('change', mqlCb)

      updateState(mql.matches, i)

      return { mql, mqlCb }
    })

    return () => {
      mounted = false
      mqls.forEach(({ mql, mqlCb }) => mql.removeEventListener('change', mqlCb))
    }
  }, [queries])

  return state
}
