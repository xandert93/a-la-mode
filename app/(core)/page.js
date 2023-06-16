'use client' // 🚧

/*
Next 12 font <head>

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ephesis&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

*/

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
} from './_components-home'

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
