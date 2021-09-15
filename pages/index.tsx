import { Configure } from 'react-instantsearch-dom'

import { Banner } from '@/components/banner/banner'
import { ProductsShowcase } from '@/components/products-showcase/products-showcase'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getStaticPropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import BannerImage from '@/public/static/images/home/banner.jpg'

export default function Home(props: SearchPageLayoutProps) {
  return (
    <SearchPageLayout {...props}>
      <Configure hitsPerPage={6} />

      <Banner
        size="xl"
        title="New<br />Collection"
        subtitle="Spring/summer 2021"
        image={BannerImage}
        imageAlt="New Collection - Spring/Summer 2021"
        fullWidth={true}
        overlay={true}
        classNameTitle="text-3xl font-normal tracking-wider leading-tight laptop:text-7xl"
      />

      <ProductsShowcase indexId="shoes" title="New in shoes" query="shoes" />
      <ProductsShowcase
        indexId="spring-summer-2021"
        title="Spring/summer 2021"
        ruleContexts={['home-spring-summer-2021']}
        className="laptop:bg-gray-50"
      />
      <ProductsShowcase
        indexId="recommended"
        title="Recommended for you"
        query="knitwear"
      />
    </SearchPageLayout>
  )
}

export const getStaticProps = getStaticPropsPage(Home as React.ComponentType)
