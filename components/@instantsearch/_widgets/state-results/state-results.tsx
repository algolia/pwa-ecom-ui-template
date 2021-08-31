import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-core'

export type StateResultsProps = StateResultsProvided

export type StateResultsAtomValue = Partial<
  Pick<StateResultsProps, 'searchState' | 'searchResults' | 'isSearchStalled'>
>

export const stateResultsAtom = atom<StateResultsAtomValue>({
  searchState: undefined,
  searchResults: undefined,
  isSearchStalled: false,
})

export const searchStateAtom = atom((get) => get(stateResultsAtom).searchState)
export const searchResultsAtom = atom(
  (get) => get(stateResultsAtom).searchResults
)
export const isSearchStalledAtom = atom(
  (get) => get(stateResultsAtom).isSearchStalled
)

export const StateResults = connectStateResults(
  ({ searchState, searchResults, isSearchStalled }: StateResultsProps) => {
    const setStateResults = useUpdateAtom(stateResultsAtom)

    useEffect(() => {
      setStateResults({ searchState, searchResults, isSearchStalled })
    }, [setStateResults, searchState, searchResults, isSearchStalled])

    return null
  }
)
