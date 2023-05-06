import { ProductPreviewSwiper } from '@/features/product'
import { Button, Container, Typography, Grid } from '@mui/material'

export const NewProductsSection = () => {
  return (
    <section>
      <Container>
        <Typography component="h2" variant="h6" children="New Arrivals" />
        {/* <Grid container alignItems="center">
          <Button children="Shop Men's" />
          <Button children="Shop Women's" />
          <Button children="Shop Kids'" />
        </Grid> */}
        <ProductPreviewSwiper />
      </Container>
    </section>
  )
}
