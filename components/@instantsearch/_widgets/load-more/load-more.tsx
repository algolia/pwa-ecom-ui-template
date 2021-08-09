import type { ButtonComponentProps } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'
import { LoadMoreWithProgressBar } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar'

import Button from '@ui/button/button'

function LoadMoreButton({ refineNext }: ButtonComponentProps): JSX.Element {
  return (
    <Button type="primary" onClick={refineNext}>
      Load More
    </Button>
  )
}

export default function LoadMore(): JSX.Element {
  return (
    <LoadMoreWithProgressBar
      buttonComponent={LoadMoreButton}
      className="my-12 gap-4"
    />
  )
}
