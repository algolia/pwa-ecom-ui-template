import classNames from 'classnames'
import { forwardRef } from 'react'

import type { ButtonProps } from '@ui/button/button'
import { Button } from '@ui/button/button'
import { Collapse } from '@ui/collapse/collapse'
import { Count } from '@ui/count/count'
import { Icon } from '@ui/icon/icon'

import { useIsVisible } from '@/hooks/useIsVisible'
import ArrowIcon from '~icons/ic/outline-keyboard-arrow-down'

export type DropdownOption = {
  value: string
  label: string
}

export type DropdownProps = Omit<ButtonProps, 'ref'> & {
  header: React.ReactNode | string
  count?: number
  children: React.ReactNode
  className?: string
  classNameContainer?: string
  isOpen?: boolean
  initialIsOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      header,
      count = 0,
      children,
      className,
      classNameContainer,
      isOpen: customIsOpen,
      initialIsOpen = false,
      onToggle,
      ...props
    }: DropdownProps,
    customRef
  ) {
    const {
      ref: defaultRef,
      isVisible,
      setIsVisible: setIsOpen,
    } = useIsVisible(initialIsOpen)

    const isOpen = customIsOpen ?? isVisible
    const ref = customRef ?? defaultRef

    return (
      <div className={classNames('relative group', className)} ref={ref}>
        <Button
          className={classNames(
            'w-full small-bold flex items-center justify-between px-2 py-1.5 border rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uranus-base',
            {
              'bg-brand-black border-neutral-light text-white hover:text-neutral-light':
                isOpen,
              'bg-white border-neutral-dark hover:text-brand-black hover:bg-neutral-lightest':
                !isOpen,
            }
          )}
          onClick={() => {
            if (typeof onToggle === 'function') {
              onToggle(isOpen)
            } else {
              setIsOpen((c) => !c)
            }
          }}
          {...props}
        >
          <span className="mr-2">{header}</span>
          {count > 0 && (
            <Count
              className={classNames(
                'mr-0.5 group-hover:bg-neutral-light transition-colors',
                {
                  'bg-neutral-lightest text-brand-black': isOpen,
                }
              )}
            >
              {count}
            </Count>
          )}
          <Icon
            icon={ArrowIcon}
            className={classNames('w-6 h-6 transition-transform', {
              'rotate-180': isOpen,
            })}
          />
        </Button>

        <Collapse
          isCollapsed={!isOpen}
          className={classNames(
            'z-dropdown min-w-max w-full absolute left-0 border border-neutral-light rounded-sm mt-1.5 bg-white shadow-small',
            classNameContainer
          )}
        >
          {children}
        </Collapse>
      </div>
    )
  }
)
