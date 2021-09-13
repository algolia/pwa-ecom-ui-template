import { Configure } from 'react-instantsearch-dom'

import { BannerXL } from '@/components/banner/banner-xl'
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

      <BannerXL
        image={BannerImage}
        imageAlt="New Collection - Spring/Summer 2021"
        headerClassname="uppercase flex flex-col justify-end gap-3 p-6 text-white text-shadow-medium laptop:px-16 laptop:py-9"
      >
        <h1 className="text-3xl font-semibold tracking-wider leading-tight laptop:text-7xl">
          New
          <br />
          Collection
        </h1>
        <p className="text-sm font-bold laptop:text-3xl">Spring/summer 2021</p>
      </BannerXL>

      <ProductsShowcase indexId="shoes" title="New in shoes" query="shoes" />
      <ProductsShowcase
        indexId="spring-summer-2021"
        title="Spring/summer 2021"
        query="jean"
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
