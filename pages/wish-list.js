import { DeleteIcon, Section, Span } from '@/components'
import { EmptyWishListSection } from '@/components-page/wish-list'
import { NAMES } from '@/constants'
import { useWishList } from '@/context/global-context'
import { newProducts, popularProducts } from '@/data'
import { ProductPreviewCard } from '@/features/product'
import { useEffectOnMount } from '@/hooks'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'

const productDb = popularProducts.concat(newProducts)

export default function WishListPage() {
  const { items, itemCount, hasItems, removeSavedItem } = useWishList()
  const [products, setProducts] = useState([])

  useEffectOnMount(() => {
    const foundProducts = items.map((item) =>
      productDb.find((product) => product.name === item.name)
    )
    foundProducts.forEach((product) => (product.isSaved = true))
    setProducts(foundProducts)

    return () => setProducts([])
  })

  return (
    <>
      <Head>
        <title children={`Wish List | ${NAMES.COMPANY}`} />
      </Head>

      {hasItems ? (
        <Section maxWidth="lg">
          <Grid container spacing={2} p={2}>
            {products.map((product) => (
              <Grid key={product.name} item xs={6} sm={4} md={3}>
                <ProductPreviewCard {...product} />
              </Grid>
            ))}
          </Grid>
        </Section>
      ) : (
        <EmptyWishListSection />
      )}
    </>
  )
}
