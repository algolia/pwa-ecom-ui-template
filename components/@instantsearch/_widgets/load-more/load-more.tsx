import type { ButtonComponentProps } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { LoadMoreWithProgressBar } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { memo } from 'react'

import { Button } from '@ui/button/button'

function LoadMoreButton({
  translations,
  isSearchStalled,
  refineNext,
}: ButtonComponentProps) {
  return (
    <Button type="primary" disabled={isSearchStalled} onClick={refineNext}>
      {isSearchStalled ? translations.searchStalled : translations.loadMore}
    </Button>
  )
}

export const LoadMore = memo(function LoadMore() {
  return (
    <LoadMoreWithProgressBar
      buttonComponent={LoadMoreButton}
      className="my-12 gap-4"
    />
  )
})
