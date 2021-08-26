import { useRouter } from 'next/dist/client/router'

import type { PageLayoutProps } from '@/layouts/page-layout'
import { PageLayout, getServerSidePropsPage } from '@/layouts/page-layout'

export default function Category(props: PageLayoutProps) {
  const router = useRouter()
  const query = router?.query

  return (
    <PageLayout {...props}>
      <div>Category page: {query?.category}</div>
    </PageLayout>
  )
}

export const getServerSideProps = getServerSidePropsPage(
  Category as React.ComponentType
)
