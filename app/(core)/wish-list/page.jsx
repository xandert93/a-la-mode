'use client'

import { Section } from '@/components'
import { useWishList } from '@/contexts/wish-list-context'
import { newProducts, popularProducts } from '@/data'
import { ProductPreviewCard } from '@/features/product'
import { genPageTitle } from '@/utils/helpers'
import { Grid } from '@mui/material'

import { useState, useEffect } from 'react'

import { EmptyWishListSection } from './components'

// JFN

const productDb = [...popularProducts, ...newProducts]

export const metadata = {
  title: genPageTitle('Wish List'),
}

export default function WishListPage() {
  const { items, hasItems } = useWishList()
  const [products, setProducts] = useState([])

  // JFN obvs
  useEffect(() => {
    if (!hasItems) return

    const foundProducts = items.map((item) =>
      productDb.find((product) => product.name === item.name)
    )

    foundProducts.forEach((product) => (product.isSaved = true))
    setProducts(foundProducts)
  }, [hasItems])

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
