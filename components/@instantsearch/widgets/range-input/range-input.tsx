import type { ChangeEvent } from 'react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { RangeInputProvided } from 'react-instantsearch-core'
import { connectRange } from 'react-instantsearch-dom'

import { RangeInputCurrency } from './range-input-currency'

import { Input } from '@/components/@ui/input/input'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useDeepCompareState } from '@/hooks/useDeepCompareSetState'
import { clamp } from '@/utils/math'

export type RangeInputValueType = 'max' | 'min'

export type RangeInputProps = RangeInputProvided

function RangeInputComponent({
  currentRefinement,
  min,
  max,
  precision,
  refine,
}: RangeInputProps) {
  const [values, setValues] = useDeepCompareState({ min: '', max: '' })
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
    [setValues, debouncedHandleInputChange]
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
  }, [setValues, currentRefinement, min, max])

  return (
    <form className="flex items-center gap-1">
      <RangeInputCurrency>
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder={min?.toLocaleString()}
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
          placeholder={max?.toLocaleString()}
          value={values.max}
          onChange={(event) => handleInputChange(event, 'max')}
        />
      </RangeInputCurrency>
    </form>
  )
}

export const RangeInput = connectRange(memo(RangeInputComponent, isEqual))
