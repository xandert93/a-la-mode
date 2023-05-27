import { CoverImage, HeartIcon, IconButton, Link, MoneyTypography, Span } from '@/components'
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
} from '@/components-page/home'
import { Box, Grid, Paper, Rating, Typography } from '@mui/material'

export default function HomePage() {
  const isLoggedIn = false

  // return <ProductPreview />

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

const ProductPreview = () => {
  const product = {
    name: 'Natural Herringbone Linen Jacket',
    prices: { previous: 7999, current: 5999 },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis officia veritatis sunt nostrum quas tempore necessitatibus tenetur. Dolorum reprehenderit facilis veritatis modi. Illo facere, vel ratione assumenda nisi ex quibusdam!',
    features: ['feature 1', 'feature 2', 'feature 3', 'feature 4'],
    imageUrls: [
      '/images/products/popular/linen-jacket-1.jpg',
      '/images/products/popular/linen-jacket-2.jpg',
    ],
    stockCount: 8,
    rating: {
      count: 787,
      average: 4.8,
    },
    colors: ['Blanched Almond', 'Beige', 'Old Lace', 'Linen', 'Antique White'],
    lastPurchasedAt: 'Yesterday',
    createdAt: '', // can display "NEW" flag in UI
  }

  return (
    <Box maxWidth={300} position="relative">
      <Link href="#">
        <Box
          position="relative"
          sx={{
            aspectRatio: '4/5',
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
            overflow: 'hidden',
          }}>
          <CoverImage
            src={product.imageUrls[0]}
            alt={product.name + 'image 1'}
            // jfn
          />
        </Box>

        <Grid container rowGap={1.5} mt={1}>
          <Grid container columnGap={0.5} alignItems="center">
            <MoneyTypography
              lineHeight={1}
              children={product.prices.previous}
              sx={{ textDecoration: 'line-through' }}
              variant="caption"
              color="text.disabled"
            />
            <MoneyTypography
              lineHeight={1}
              children={product.prices.current}
              color="error.main"
              fontWeight={500}
            />
          </Grid>
          <Typography lineHeight={1} children={product.name} textTransform="capitalize" />

          <ProductColors colors={product.colors} />
          <Rating
            classes={{
              iconFilled: {
                color: 'black',
              },
            }}
            size="small"
            value={3.5}
          />
        </Grid>
      </Link>

      <IconButton children={<HeartIcon />} sx={{ position: 'absolute', right: 0, top: 330 }} />
    </Box>
  )
}

const ProductColors = ({ colors }) => {
  return (
    <Grid container>
      {colors.slice(0, 3).map((color) => (
        <ColorSquare key={color} bgcolor={color.replace(/ /g, '')} />
      ))}
      {colors.length > 3 && (
        <Typography
          children={'+' + String(colors.length - 3)}
          fontSize={12}
          color="text.secondary"
        />
      )}
    </Grid>
  )
}

const ColorSquare = (props) => {
  return (
    <Box
      sx={{
        marginRight: 1,
        height: 24,
        width: 24,
        border: '1px solid',
        borderColor: 'text.primary',
        borderRadius: 0.5,
      }}
      {...props}
    />
  )
}
