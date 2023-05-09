import { Section } from '@/components'
import { ProductPreviewSwiper } from '@/features/product'
import { Button, Container, Typography, Grid } from '@mui/material'

export const NewProductsSection = () => {
  return (
    <Section>
      <Typography component="h2" variant="h6" children="Our Latest Additions" />
      {/* <Grid container alignItems="center">
          <Button children="Shop Men's" />
          <Button children="Shop Women's" />
          <Button children="Shop Kids'" />
        </Grid> */}
      <ProductPreviewSwiper />
    </Section>
  )
}
