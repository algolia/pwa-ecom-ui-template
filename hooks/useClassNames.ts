import type { Argument } from 'classnames'
import classnames from 'classnames'
import type { DependencyList } from 'react'
import { useMemo } from 'react'

export function useClassNames(...args: Argument[]) {
  const deps = args[args.length - 1] || []

  return useMemo(() => {
    const classNamesArgs = args
    classNamesArgs.splice(-1, 1)
    return classnames(classNamesArgs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps as DependencyList)
}

export type ClassNamesArgument = Argument
