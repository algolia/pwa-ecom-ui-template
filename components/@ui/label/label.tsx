export type LabelProps = {
  label: string
  theme?: string
}

export function Label({ label = '', theme = 'label-uppercase' }: LabelProps) {
  return <div className={theme}>{label}</div>
}
