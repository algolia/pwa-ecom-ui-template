import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

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
  return enabled ? (
    <ExperimentalDynamicWidgets {...props}>
      {children}
    </ExperimentalDynamicWidgets>
  ) : (
    <div {...props}>{children}</div>
  )
}
