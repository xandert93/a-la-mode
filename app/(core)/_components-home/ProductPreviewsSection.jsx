import { Section } from '@/components'
import { ProductPreviewsSwiper } from '@/features/product'
import { Button, Container, Typography, Grid } from '@mui/material'

export const ProductPreviewsSection = ({ type, title, products }) => {
  return (
    <Section maxWidth="xl">
      {/* <Typography component="h2" variant="h6" children="Our Latest Additions" /> */}
      {/* <Grid container alignItems="center">
          <Button children="Shop Men's" />
          <Button children="Shop Women's" />
          <Button children="Shop Kids'" />
        </Grid> */}
      <ProductPreviewsSwiper type={type} title={title} products={products} />
    </Section>
  )
}
