import { Main } from '@/components'
import { ProductDetailSection, ProductReviewsSection } from '@/components-page/product-detail'
import { NAMES } from '@/constants'
import { newProducts, popularProducts } from '@/data'
import { Breadcrumbs, Typography } from '@mui/material'

import Head from 'next/head'

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

export default function ProductDetailPage(product) {
  // Nike made each a <input:radio> (interesting). But all sites seemed to perform a HTTP request each time a size was picked. Something to explore and revisit later.

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
      <Breadcrumbs
        children={['Link 1', 'Link 2', 'Link 3'].map((l) => (
          // https://mui.com/material-ui/react-breadcrumbs/:
          <Typography key={l} children={l} />
        ))}
      />
      <Main rowGap={5}>
        <ProductDetailSection {...product} />
        {/* <RecommendedProductsSection />
        <ProductReviewsSection /> */}
      </Main>
    </>
  )
}

const RecommendedProductsSection = () => {
  return null
}

// "shop the look"."wear it with" section? See M&S: https://www.marksandspencer.com/linen-blend-hawaiian-floral-shirt/p/clp60580705#intid=pid_pg1pip48g4r1c1
