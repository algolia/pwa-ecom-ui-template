import { atom } from 'jotai'
import { selectAtom, useUpdateAtom } from 'jotai/utils'
import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-core'

export type StateResultsProps = StateResultsProvided

export type StateResultsAtomValue = Partial<
  Pick<StateResultsProps, 'isSearchStalled' | 'searchResults' | 'searchState'>
>

export const stateResultsAtom = atom<StateResultsAtomValue>({
  searchState: undefined,
  searchResults: undefined,
  isSearchStalled: false,
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

function StateResultsComponent({
  searchState,
  searchResults,
  isSearchStalled,
}: StateResultsProps) {
  const setStateResults = useUpdateAtom(stateResultsAtom)

  useEffect(() => {
    setStateResults({ searchState, searchResults, isSearchStalled })
  }, [setStateResults, searchState, searchResults, isSearchStalled])

  return null
}

export const StateResults = connectStateResults(
  memo(StateResultsComponent, isEqual)
)
