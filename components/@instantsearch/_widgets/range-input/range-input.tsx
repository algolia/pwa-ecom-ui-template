import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { connectRange } from 'react-instantsearch-core'

import { RangeInputCurrency } from './range-input-currency'

import { Input } from '@/components/@ui/input/input'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { clamp } from '@/utils/math'

export type RangeInputValueType = 'min' | 'max'

export const RangeInput = connectRange(
  ({ currentRefinement, min, max, precision, refine }) => {
    const [values, setValues] = useState({ min: '', max: '' })
    const step = useMemo(() => 1 / Math.pow(10, precision), [precision])

    const debouncedHandleInputChange = useDebouncedCallback(
      (v: string, valType: RangeInputValueType) => {
        let val = parseInt(v, 10)
        val = clamp(val, min, max)

        refine({
          ...currentRefinement,
          [valType]: val || '',
        })
      },
      300
    )

    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>, valType: RangeInputValueType) => {
        const val = event.target.value
        setValues((v) => ({
          ...v,
          [valType]: val,
        }))

        debouncedHandleInputChange(val, valType)
      },
      [debouncedHandleInputChange]
    )

    useEffect(() => {
      if (currentRefinement.min === min) {
        setValues((v) => ({
          ...v,
          min: '',
        }))
      }
      if (currentRefinement.max === max) {
        setValues((v) => ({
          ...v,
          max: '',
        }))
      }
    }, [currentRefinement, min, max])

    return (
      <form className="flex items-center gap-1">
        <RangeInputCurrency>
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={min}
            value={values.min}
            onChange={(event) => handleInputChange(event, 'min')}
          />
        </RangeInputCurrency>

        <span>{' to '}</span>

        <RangeInputCurrency>
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            placeholder={max}
            value={values.max}
            onChange={(event) => handleInputChange(event, 'max')}
          />
        </RangeInputCurrency>
      </form>
    )
  }
)
