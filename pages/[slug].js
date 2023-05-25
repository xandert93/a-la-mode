import { HomeMain } from '@/components-page/home'
import {
  ProductSection,
  ProductReviewsSection,
  RecommendedProductsSection,
} from '@/components-page/product'
import { NAMES } from '@/constants'
import { useBag } from '@/context/global-context'
import { newProducts, popularProducts } from '@/data'
import { useEffectOnMount } from '@/hooks'

import Head from 'next/head'
import { useEffect, useRef } from 'react'

const productDb = [...popularProducts, ...newProducts]

// At build time, fetch valid slugs and give each to getStaticProps
// Next executes just once
export const getStaticPaths = () => {
  const paths = productDb.map((product) => {
    return { params: { slug: product.slug } }
  })

  return {
    fallback: false,
    paths,
  }
}

// Then fetch each matching product and give each to ProductPage
// Next executes for every path, creating HTML + JSON for every path
export const getStaticProps = (context) => {
  const { slug } = context.params

  const product = productDb.find((product) => product.slug === slug)

  return { props: product }
}

/*
Add breadcrumbs eventually:

  <Breadcrumbs
     children={['Link 1', 'Link 2', 'Link 3'].map((l) => (
  // https://mui.com/material-ui/react-breadcrumbs/:
     <Typography key={l} children={l} />
     ))}
  />

*/

export default function ProductPage(product) {
  // JFN - to accommodate for Strict Mode, otherwise product gets added twice to LS
  const isSecondEffectRef = useRef(false)
  useEffect(() => {
    if (isSecondEffectRef.current) {
      // store viewed products chronologically in LS
      // remove any existing instance of that product and then make it first in array
      // if array has 11 products, pop the last, capping it at 10 products in total

      let viewedProducts = JSON.parse(localStorage.getItem('viewed-products')) ?? []
      viewedProducts = viewedProducts.filter((p) => p.name !== product.name)
      viewedProducts.unshift(product)
      if (viewedProducts.length === 11) viewedProducts.pop()
      localStorage.setItem('viewed-products', JSON.stringify(viewedProducts))

      // tried to do some of this CRUD by storing products as dictionary, but chronological ordering proved sticky.
    }

    return () => (isSecondEffectRef.current = true)
  }, [])

  return (
    <>
      <Head>
        <title
          children={`${product.name} | ${NAMES.COMPANY}`} // *** accurate use?
        />
        <meta
          name="description"
          content={product.description} // *** accurate use?
        />
      </Head>

      {/* JFN - just extending <HomeMain>. Once I've built more pages and see the pattern, perhaps create <AuthMain> and <Main> */}
      <HomeMain sx={{ 'section:first-of-type': { mt: { xs: 2, md: 3 } } }}>
        <ProductSection {...product} />
        <ProductReviewsSection />
        <RecommendedProductsSection />
      </HomeMain>
    </>
  )
}

// "shop the look"."wear it with" section? See M&S: https://www.marksandspencer.com/linen-blend-hawaiian-floral-shirt/p/clp60580705#intid=pid_pg1pip48g4r1c1
