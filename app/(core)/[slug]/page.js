import { newProducts, popularProducts } from '@/data'
import { genPageTitle } from '@/utils/helpers'
import { notFound } from 'next/navigation'
import { HomeMain } from '../_components-home/HomeMain'
import { ProductReviewsSection, ProductSection, RecommendedProductsSection } from './components'

const productDb = [...popularProducts, ...newProducts]

// 🔥 An object containing the parameters of the current route
export const generateMetadata = async (props, parent) => {
  const product = getProduct(props.params.slug)
  if (!product) return { notFound: true } // behaves same as notFound() below

  return {
    title: genPageTitle(product.name),
    description: product.description,
  }
}

/*
 🔥  Apparently, we don't need to worry about the fact that our code is seemingly going to make
  two requests for the same data because:

  "When rendering a route, Next.js will automatically deduplicate fetch requests 
  for the same data across generateMetadata, generateStaticParams, Layouts, Pages, 
  and Server Components. React cache can be used if fetch is unavailable."

  Read more here: https://nextjs.org/docs/app/building-your-application/data-fetching#automatic-fetch-request-deduping

*/

// 🔥 At build time, fetch valid slugs and give each to page
// Next executes just once
export const generateStaticParams = async () => {
  return productDb.map((product) => ({ slug: product.slug })) // Return a list of `params` to populate the [slug] dynamic segment
}

const getProduct = (slug) => productDb.find((product) => product.slug === slug)

// Multiple versions of this page will be statically generated
// Next executes <ProductPage> for every param, creating HTML + JSON for each
export default async function ProductPage(context) {
  const product = getProduct(context.params.slug)
  if (!product) notFound() // 🔥: https://nextjs.org/docs/app/api-reference/functions/not-found
  // calls component in ./not-found.js (if present). Else will swap page out for /app/not-found.js (if unspecified, uses Next's default)

  /* JFN - just extending <HomeMain>. Once I've built more pages and see the pattern, perhaps create <AuthMain> and <Main> */

  return (
    <HomeMain sx={{ 'section:first-of-type': { mt: { xs: 2, md: 3 } } }}>
      <ProductSection {...product} />
      <ProductReviewsSection />
      <RecommendedProductsSection />
    </HomeMain>
  )
}

// "shop the look"."wear it with" section? See M&S: https://www.marksandspencer.com/linen-blend-hawaiian-floral-shirt/p/clp60580705#intid=pid_pg1pip48g4r1c1

/*
read another time - registering product as a recently viewed product:

  useEffect(() => {
    // store viewed products chronologically in LS
    // remove any existing instance of that product and then make it first in array
    // if array has 11 products, pop the last, capping it at 10 products in total

    let viewedProducts = JSON.parse(localStorage.getItem('viewed-products')) ?? []
    viewedProducts = viewedProducts.filter((p) => p.name !== product.name)
    viewedProducts.unshift(product)
    if (viewedProducts.length === 11) viewedProducts.pop()
    localStorage.setItem('viewed-products', JSON.stringify(viewedProducts))

    // tried to do some of this CRUD by storing products as dictionary, but chronological ordering proved sticky.
  }, [])

*/

/*
Add breadcrumbs eventually:

  <Breadcrumbs
     children={['Link 1', 'Link 2', 'Link 3'].map((l) => (
  // https://mui.com/material-ui/react-breadcrumbs/:
     <Typography key={l} children={l} />
     ))}
  />

*/

/*
    return (
      <HomeMain sx={{ 'section:first-of-type': { mt: { xs: 2, md: 3 } } }}>
        <ProductSection {...product} />
        <ProductReviewsSection />
        <RecommendedProductsSection />
      </HomeMain>
    )


*/
