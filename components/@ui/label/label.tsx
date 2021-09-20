export type LabelProps = {
  label: string
  className?: string
}

export function Label({
  label = '',
  className = 'label-uppercase',
}: LabelProps) {
  return <div className={className}>{label}</div>
}
