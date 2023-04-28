import { Link, MailingForm } from '@/components'
import { categories, heroItems } from '@/data'

import { Box, Button, Grid, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <CategoryPreviewList />
      <MailingForm /> */}
    </>
  )
}

const CategoryPreviewList = () => {
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
            borderRadius: 3,
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
      <HeroSectionCarousel />
    </section>
  )
}

const HeroSectionCarousel = () => {
  return (
    <Carousel
      autoPlay={true && false}
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
  )
}

const HeroCarouselItem = ({ title, description, imageUrl, href }) => {
  return (
    <Grid container style={{ height: '100vh' /*move above carousel?*/ }}>
      <Grid item xs={6} container>
        <img
          style={{ display: 'block', width: '100%', maxHeight: '100vh', objectFit: 'contain' }}
          src={imageUrl}
        />
      </Grid>
      <Grid
        item
        xs={6}
        style={{ gap: 32 }}
        container
        direction={'column'}
        justifyContent={'center'}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h5">{description}</Typography>
        <Button href={href} style={{ alignSelf: 'flex-start' }} variant="contained">
          Shop Now
        </Button>
      </Grid>
    </Grid>
  )
}
