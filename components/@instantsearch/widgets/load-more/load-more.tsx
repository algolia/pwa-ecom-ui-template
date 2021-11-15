import type {
  ButtonComponentProps,
  TextTranslationArgs,
} from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { LoadMoreWithProgressBar } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { useAtomValue } from 'jotai/utils'
import { memo, useCallback, useEffect, useRef } from 'react'

import { Button } from '@ui/button/button'

import { withDebugLayer } from '@/components/@dev/debug-layer/debug-layer'
import { searchQueryAtom } from '@/components/@instantsearch/hooks/useUrlSync'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function LoadMoreButton({
  translations,
  isSearchStalled,
  refineNext,
}: ButtonComponentProps) {
  const refineCounter = useRef(0)
  const loadMoreClicked = useRef(false)

  const { setObservedNode } = useIntersectionObserver({
    callback: (entry) => {
      if (
        entry.isIntersecting &&
        !isSearchStalled &&
        (refineCounter.current <= 2 || loadMoreClicked.current)
      ) {
        refineNext()
        refineCounter.current++
      }
    },
    threshold: 0,
  })

  const handleLoadMoreClick = useCallback(() => {
    loadMoreClicked.current = true
    refineNext()
  }, [refineNext])

  const searchQuery = useAtomValue(searchQueryAtom)
  useEffect(() => {
    refineCounter.current = 0
    loadMoreClicked.current = false
  }, [searchQuery])

  return (
    <Button
      type="primary"
      disabled={isSearchStalled}
      ref={setObservedNode}
      onClick={handleLoadMoreClick}
    >
      {isSearchStalled ? translations.searchStalled : translations.loadMore}
    </Button>
  )
}

function LoadMoreComponent() {
  return (
    <LoadMoreWithProgressBar
      buttonComponent={LoadMoreButton}
      className="my-12 gap-4"
      translations={{
        text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
          `You've seen ${nbSeenHits} product${
            nbSeenHits > 1 ? 's' : ''
          } out of ${nbTotalHits}`,
      }}
    />
  )
}

export const LoadMore = memo(
  withDebugLayer(LoadMoreComponent, 'LoadMoreWidget')
)
