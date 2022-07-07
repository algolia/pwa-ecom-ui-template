import { useAtomValue } from 'jotai'
import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

import { configAtom } from '@/config/config'

export type DynamicWidgetsProps = {
  children: React.ReactNode
  enabled?: boolean
  [index: string]: any
}

export function DynamicWidgets({
  children,
  enabled = true,
  ...props
}: DynamicWidgetsProps) {
  const { searchParameters } = useAtomValue(configAtom)
  return enabled ? (
    <ExperimentalDynamicWidgets
      maxValuesPerFacet={searchParameters.maxValuesPerFacet}
      {...props}
    >
      {children}
    </ExperimentalDynamicWidgets>
  ) : (
    <div {...props}>{children}</div>
  )
}
