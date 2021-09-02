import type { ButtonComponentProps } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { LoadMoreWithProgressBar } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { memo } from 'react'

import { Button } from '@ui/button/button'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function LoadMoreButton({
  translations,
  isSearchStalled,
  refineNext,
}: ButtonComponentProps) {
  const { setObservedNode } = useIntersectionObserver({
    callback: (entry) => {
      if (entry.isIntersecting) refineNext()
    },
    threshold: 0,
  })

  return (
    <Button
      type="primary"
      disabled={isSearchStalled}
      ref={setObservedNode}
      onClick={refineNext}
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
    />
  )
}

export const LoadMore = memo(LoadMoreComponent)
