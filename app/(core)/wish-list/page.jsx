'use client'
import { Section } from '@/components'
import { useWishList } from '@/contexts/wish-list-context'
import { newProducts, popularProducts } from '@/data'
import { useEffectOnMount } from '@/hooks'
import { ProductPreviewCard } from '@/features/product'
import { genPageTitle } from '@/utils/helpers'
import { Grid } from '@mui/material'

import { useState } from 'react'

import { EmptyWishListSection } from './components'

// JFN

const productDb = [...popularProducts, ...newProducts]

export const metadata = {
  title: genPageTitle('Wish List'),
}

export default function WishListPage() {
  const { items, itemCount, hasItems, removeSavedItem } = useWishList()
  const [products, setProducts] = useState([])

  // *** need to fix - okay in production, but not in dev:
  useEffectOnMount(() => {
    const foundProducts = items.map((item) =>
      productDb.find((product) => product.name === item.name)
    )

    foundProducts.forEach((product) => (product.isSaved = true))
    setProducts(foundProducts)
  })

  return hasItems ? (
    <Section maxWidth="lg">
      <Grid container spacing={2} py={2}>
        {products.map((product) => (
          <Grid key={product.name} item xs={6} sm={4} md={3}>
            <ProductPreviewCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Section>
  ) : (
    <EmptyWishListSection />
  )
}
