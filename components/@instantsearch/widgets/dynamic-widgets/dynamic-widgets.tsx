import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

export type DynamicWidgetsProps = {
  children: React.ReactNode
  enabled?: boolean
  [index: string]: any
}

function DummyWrapper({
  children,
  ...props
}: {
  children: React.ReactNode
  [index: string]: any
}) {
  return <div {...props}>{children}</div>
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
    <DummyWrapper {...props}>{children}</DummyWrapper>
  )
}
