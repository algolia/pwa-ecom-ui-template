import { atom } from 'jotai'
import { selectAtom, useUpdateAtom } from 'jotai/utils'
import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-core'

export type VirtualStateResultsProps = StateResultsProvided

export type VirtualStateResultsAtomValue = Partial<
  Pick<
    VirtualStateResultsProps,
    'isSearchStalled' | 'searchResults' | 'searchState'
  >
>

export const stateResultsAtom = atom<VirtualStateResultsAtomValue>({
  searchState: undefined,
  searchResults: undefined,
  isSearchStalled: undefined,
})

export const searchStateAtom = selectAtom(
  stateResultsAtom,
  ({ searchState }) => searchState,
  isEqual
)
export const searchResultsAtom = selectAtom(
  stateResultsAtom,
  ({ searchResults }) => searchResults,
  isEqual
)
export const isSearchStalledAtom = selectAtom(
  stateResultsAtom,
  ({ isSearchStalled }) => isSearchStalled
)

function VirtualStateResultsComponent({
  searchState,
  searchResults,
  isSearchStalled,
}: VirtualStateResultsProps) {
  const setStateResults = useUpdateAtom(stateResultsAtom)

  useEffect(() => {
    setStateResults({ searchState, searchResults, isSearchStalled })
  }, [setStateResults, searchState, searchResults, isSearchStalled])

  return null
}

export const VirtualStateResults = connectStateResults(
  memo(VirtualStateResultsComponent, isEqual)
)
