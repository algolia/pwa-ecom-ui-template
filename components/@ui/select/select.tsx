import classNames from 'classnames'
import { useCallback, useMemo, useRef, useState } from 'react'

import { Button } from '@ui/button/button'
import { Dropdown } from '@ui/dropdown/dropdown'

import { useIsVisible } from '@/hooks/useIsVisible'
import { modAbs } from '@/utils/math'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  options: SelectOption[]
  defaultOption?: SelectOption
  defaultOpen?: boolean
  placeholder?: string
  prefix?: string
  suffix?: string
  className?: string
  onChange?: (selectedOption: SelectOption) => void
}

export function Select({
  options,
  defaultOption,
  defaultOpen = false,
  placeholder = 'Select an option',
  prefix,
  suffix,
  className,
  onChange,
}: SelectProps) {
  const {
    ref,
    isVisible: isOpen,
    setIsVisible: setIsOpen,
  } = useIsVisible(defaultOpen)

  const [currentOption, setCurrentOption] = useState(defaultOption)
  const currentOptions = useMemo(
    () => options.filter((option) => option.value !== currentOption?.value),
    [options, currentOption]
  )

  const currentFocusedOptionIdx = useRef(-1)
  const optionEls = useRef<HTMLButtonElement[]>([])

  const handleKeyDown = useCallback(
    (e) => {
      const isArrowDown = e.key === 'ArrowDown'
      const isArrowUp = e.key === 'ArrowUp'

      if (isArrowDown || isArrowUp) {
        e.preventDefault()

        const direction = isArrowDown ? 1 : -1
        const newIdx = modAbs(
          currentFocusedOptionIdx.current + direction,
          currentOptions.length
        )
        currentFocusedOptionIdx.current = newIdx

        optionEls.current[newIdx].focus()
      }
    },
    [currentFocusedOptionIdx, currentOptions]
  )

  const handleDropdownToggle = useCallback(
    (o) => {
      setIsOpen(!o)
      if (!o) currentFocusedOptionIdx.current = -1
    },
    [setIsOpen]
  )

  return (
    <Dropdown
      header={
        <>
          {prefix} {currentOption?.label || placeholder} {suffix}
        </>
      }
      className={className}
      ref={ref}
      isOpen={isOpen}
      role="listbox"
      onToggle={handleDropdownToggle}
      onKeyDown={handleKeyDown}
    >
      <ul className="flex flex-col gap-1 py-2">
        {currentOptions.map((option, i) => {
          const isOptionSelected = option.value === currentOption?.value
          return (
            <li key={option.value}>
              <Button
                role="option"
                aria-selected={isOptionSelected}
                className={classNames(
                  'w-full text-left px-2 py-1 focus-visible:outline-none focus-visible:font-bold focus-visible:bg-neutral-lightest can-hover:hover:text-brand-black can-hover:hover:bg-neutral-lightest',
                  {
                    'font-bold': isOptionSelected,
                  }
                )}
                ref={(opt) => (opt ? (optionEls.current[i] = opt) : null)}
                onClick={() => {
                  setCurrentOption(option)
                  setIsOpen(false)
                  if (typeof onChange === 'function') onChange(option)
                }}
                onKeyDown={handleKeyDown}
              >
                {option.label}
              </Button>
            </li>
          )
        })}
      </ul>
    </Dropdown>
  )
}
