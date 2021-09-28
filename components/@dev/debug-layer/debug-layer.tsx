import classNames from 'classnames'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import React, { useState, useCallback } from 'react'

export type DebugLayerProps = {
  children: React.ReactNode
  name: string
}

export type WithDebugLayerProps = Record<string, unknown>

export const debugLayerEnabledAtom = atom(false)

function DebugLayer({ children, name }: DebugLayerProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleOver = useCallback((e) => {
    e.stopPropagation()
    setIsHovered(true)
  }, [])
  const handleOut = useCallback((e) => {
    e.stopPropagation()
    setIsHovered(false)
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames('relative cursor-default')}
      onMouseOver={handleOver}
      onFocus={handleOver}
      onMouseOut={handleOut}
      onBlur={handleOut}
    >
      {children}

      <div
        className={classNames(
          'z-dev absolute pointer-events-none w-full h-full inset-0 border transition-colors border-transparent',
          isHovered && 'can-hover:border-venus-base'
        )}
      >
        <span
          role="link"
          tabIndex={0}
          className={classNames(
            'pointer-events-auto cursor-pointer select-none absolute top-0 -left-px -translate-y-full p-1 text-xs font-mono font-bold bg-venus-base text-white rounded-tr-md transition-opacity opacity-0',
            isHovered && 'can-hover:opacity-100 can-hover:hover:opacity-60'
          )}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

export function withDebugLayer(
  wrappedComponent: React.FunctionComponent<any>,
  name?: string
) {
  return function WithDebugLayer({ ...props }: WithDebugLayerProps) {
    const enabled = useAtomValue(debugLayerEnabledAtom)
    const c = wrappedComponent(props)

    if (!c) return null
    if (!enabled) return c

    return (
      <DebugLayer
        name={name || wrappedComponent.displayName || 'AnonymousComponent'}
      >
        {c}
      </DebugLayer>
    )
  }
}
