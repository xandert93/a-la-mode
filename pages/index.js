import {
  HomeMain,
  HomeHeroSection,
  CollectionsSection,
  NewsletterSection,
  ArticlesSection,
  PopularProductsSection,
  NewProductsSection,
  BrandsSection,
  PublicationsSection,
} from '@/components-page/home'

export default function HomePage() {
  const isLoggedIn = false

  return (
    <HomeMain>
      <HomeHeroSection />
      <PublicationsSection />
      <CollectionsSection />
      <BrandsSection />
      <PopularProductsSection />
      {!isLoggedIn && <NewsletterSection />}
      <NewProductsSection />
      <ArticlesSection />
    </HomeMain>
  )
}
