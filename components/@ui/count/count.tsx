import classNames from 'classnames'

export type CountProps = {
  children: React.ReactNode
  className?: string
}

export function Count({ children, className }: CountProps) {
  return (
    <div
      className={classNames(
        'bg-neutral-light text-brand-black w-5 h-5 small-bold rounded-full flex items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  )
}
