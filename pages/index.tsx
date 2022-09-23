import { Configure } from 'react-instantsearch-dom'

import { Banner } from '@/components/banner/banner'
import { Container } from '@/components/container/container'
import { ProductCardHitShowcase } from '@/components/product-card/product-card-hit'
import { RecommendCardHit } from '@/components/product-card/recommend-card-hit'
import { ProductsShowcase } from '@/components/products-showcase/products-showcase'
import { TrendingShowcase } from '@/components/recommend-showcase/trending-showcase'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getStaticPropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import BannerImage from '@/public/static/images/home/banner.jpg'

export default function Home(props: SearchPageLayoutProps) {
  return (
    <SearchPageLayout {...props}>
      <Configure
        hitsPerPage={6}
        // We cannot retrieve the user token at build time, so we disable perso
        // feature to avoid an additional call to retrieve Algolia results at load time
        enablePersonalization={false}
        userToken={undefined}
      />

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

      <ProductsShowcase
        title="New in shoes"
        indexId="shoes"
        query="shoes"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Spring/summer 2021"
        indexId="spring-summer-2021"
        ruleContexts={['home-spring-summer-2021']}
        className="laptop:bg-gray-50"
        hitComponent={ProductCardHitShowcase}
      />
      <ProductsShowcase
        title="Recommended for you"
        indexId="recommended"
        query="jacket"
        hitComponent={ProductCardHitShowcase}
      />
      <section className="py-4 laptop:py-16 laptop:bg-gray-50">
        <Container>
          <TrendingShowcase
            title="Trending now"
            indexId="recommended"
            threshold={4}
            maxRecommendations={6}
            hitComponent={(cardProps) => (
              <RecommendCardHit
                insightsEventName="Homepage: Trending Product Clicked"
                highlighting={false}
                {...cardProps}
              />
            )}
          />
        </Container>
      </section>
    </SearchPageLayout>
  )
}

export const getStaticProps = () => getStaticPropsPage(Home)
