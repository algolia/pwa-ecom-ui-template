interface LabelProps {
  label: string
  theme?: string
}

export default function Label({
  label = '',
  theme = 'label-uppercase',
}: LabelProps): JSX.Element {
  return <div className={theme}>{label}</div>
}
