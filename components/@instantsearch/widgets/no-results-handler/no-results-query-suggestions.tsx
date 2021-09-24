import SearchIcon from '@material-design-icons/svg/outlined/search.svg'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Configure, connectHits, Index } from 'react-instantsearch-core'
import type { HitsProvided } from 'react-instantsearch-core'

import { searchStateAtom } from '@instantsearch/hooks/useUrlSync'

import { Button } from '@/components/@ui/button/button'
import { Icon } from '@/components/@ui/icon/icon'
import { configAtom } from '@/config/config'
import { querySuggestionsIndexName } from '@/utils/env'

export type NoResultsQuerySuggestionsProps = {
  query: string
}

export type NoResultsQuerySuggestionsHitsProps = HitsProvided<any>

export type NoResultsQuerySuggestionsHitButtonProps = {
  query: string
}

function NoResultsQuerySuggestionsHitButton({
  query,
}: NoResultsQuerySuggestionsHitButtonProps) {
  const setSearchState = useUpdateAtom(searchStateAtom)

  const handleClick = useCallback(() => {
    setSearchState((currentSearchState) => ({ ...currentSearchState, query }))
  }, [setSearchState, query])

  return (
    <Button className="underline" onClick={handleClick}>
      {query}
    </Button>
  )
}

function NoResultsQuerySuggestionsHitsComponent({
  hits,
}: NoResultsQuerySuggestionsHitsProps) {
  if (hits.length === 0) {
    return null
  }

  return (
    <li>
      <span className="-ml-1.5">
        <span>Try searching using a more general term</span>
        <ul className="flex flex-col ml-4 gap-1 mt-2">
          {hits.map((hit) => (
            <li key={hit.objectID} className="flex items-center gap-1">
              <Icon icon={SearchIcon} className="w-4 h-4" />
              <NoResultsQuerySuggestionsHitButton query={hit.query} />
            </li>
          ))}
        </ul>
      </span>
    </li>
  )
}

const NoResultsQuerySuggestionsHits = connectHits(
  memo(NoResultsQuerySuggestionsHitsComponent, isEqual)
)

export function NoResultsQuerySuggestions({
  query,
}: NoResultsQuerySuggestionsProps) {
  const { searchParameters } = useAtomValue(configAtom)

  if (!querySuggestionsIndexName) {
    return null
  }

  return (
    <Index indexName={querySuggestionsIndexName}>
      <Configure
        {...searchParameters}
        removeWordsIfNoResults="allOptional"
        query={query}
        hitsPerPage={4}
      />
      <NoResultsQuerySuggestionsHits />
    </Index>
  )
}
