export type DummyWrapperProps = {
  children?: React.ReactNode
}

export function DummyWrapper({ children, ...props }: DummyWrapperProps) {
  return <div {...props}>{children}</div>
}
