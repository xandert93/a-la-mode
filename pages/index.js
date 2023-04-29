import { Link, MailingForm, Carousel } from '@/components'
import { categories, heroItems, latestProducts } from '@/data'
import { Favorite, FavoriteBorder, HeartBroken } from '@mui/icons-material'

import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

export default function HomePage() {
  return (
    <>
      {/* <HeroSection />
      <CategoryList /> */}
      <NewArrivalsSection />
      {/* <MailingForm /> */}
    </>
  )
}

const NewArrivalsSection = () => {
  return (
    <section>
      <Container>
        <Grid container alignItems={'center'}>
          <Typography component="h2" children="New Arrivals" />
          <Button children="Shop Men's" />
          <Button children="Shop Women's" />
          <Button children="Shop Kids'" />
        </Grid>
        <Grid container spacing={1.5}>
          {latestProducts.map((product) => (
            <Grid item xs={3}>
              <ProductPreview {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}

const ProductPreview = ({ name, price, imageUrls, href }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ gap: 1 }}
      component={Link}
      underline="none"
      href={href}>
      <ProductPreviewImages urls={imageUrls} />
      <Typography children={'£' + price} sx={{ fontWeight: 'bold' }} />
      <Typography children={name} />
    </Grid>
  )
}

const ProductPreviewImages = ({ urls }) => {
  const [index, setIndex] = useState(0)

  const toggleImage = (newIndex) => () => setIndex(newIndex)

  return (
    <Grid
      container
      onMouseEnter={toggleImage(1)}
      onMouseLeave={toggleImage(0)}
      sx={{ position: 'relative' }}>
      <img src={urls[index]} style={{ display: 'block', width: '100%' }} />
      <ProductPreviewLikeButton />
    </Grid>
  )
}

const ProductPreviewLikeButton = () => {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <IconButton
      sx={{
        position: 'absolute',
        display: 'flex',
        bottom: '1%',
        right: '1%',
        transition: 'transform 0.2s ease',
        ':hover': {
          transform: 'scale(1.1)',
        },
      }}
      onClick={(e) => {
        e.preventDefault()
        setIsLiked((prev) => !prev)
      }}>
      <Favorite
        sx={{
          fill: isLiked ? 'red' : 'transparent',
          stroke: isLiked ? 'red' : 'black',
        }}
      />
    </IconButton>
  )
}

const CategoryList = () => {
  return (
    <Grid container spacing={1} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {categories.map((c, index) => (
        <Grid item xs={12} md={index < 3 ? 4 : 6}>
          <CategoryPreview category={c} />
        </Grid>
      ))}
    </Grid>
  )
}

const CategoryPreview = ({ category }) => {
  return (
    <Link href="/">
      <Box sx={{ height: '50vh' }}>
        <img
          src={category.imageUrl}
          style={{
            display: 'block',
            // borderRadius: 3,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Link>
  )
}

const HeroSection_w_Video = () => {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}>
      <Typography variant="h3" children="Summer'23" />
      <Typography variant="h2" children="Explore the Everyday" />
      <Typography children="Embrace every moment this season, taking on new ventures in a thoughtfully curated collection for Summer'23" />
      <Grid container justifyContent={'space-evenly'}>
        <Button variant="contained" href="#" children="Menswear" />
        <Button variant="contained" href="#" children="Womenswear" />
      </Grid>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <video
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay
          muted
          loop>
          <source src="/videos/hero-video-2.mp4" />
          Your Browser is not supported.
        </video>
      </div>
    </section>
  )
}

const HeroSection = () => {
  return (
    <section>
      <Carousel
        autoPlay={true}
        indicators={false}
        cycleNavigation={true}
        stopAutoPlayOnHover={true}
        interval={5500}
        animation="slide"
        duration={1500}
        swipe>
        {heroItems.map((h) => (
          <HeroCarouselItem {...h} />
        ))}
      </Carousel>
    </section>
  )
}

const HeroCarouselItem = ({ title, description, imageUrl, href }) => {
  return (
    <Grid container spacing={4} /* sx={{ height: '80vh' }} */>
      <Grid item xs={5} container>
        <img
          style={{ display: 'block', width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          src={imageUrl}
        />
      </Grid>
      <Grid item xs={7} sx={{ gap: 4 }} container direction={'column'} justifyContent={'center'}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h5">{description}</Typography>
        <Button href={href} style={{ alignSelf: 'flex-start' }} variant="contained">
          Shop Now
        </Button>
      </Grid>
    </Grid>
  )
}
