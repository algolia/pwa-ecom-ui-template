interface IconProps {
  icon: any
}

export default function Icon({ icon: IconCmp = null }: IconProps): JSX.Element {
  return <IconCmp className="fill-current w-7 h-7" />
}
