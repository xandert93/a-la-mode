import { Section } from '@/components'
import {
  HomeMain,
  HomeHeroSection,
  NewProductsSection,
  CollectionsSection,
  NewsletterSection,
  BlogSection,
} from '@/components-page/home'
import { heroItems } from '@/data'

import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'

import { Swiper } from 'swiper/react'

export default function HomePage() {
  const isLoggedIn = false

  return (
    <HomeMain>
      <HomeHeroSection />
      <FeaturedInSection />
      {/* <CollectionSection /> */}
      <CollectionsSection />
      <BrandsSection />

      <NewProductsSection />
      {/* <TrendingProductsSection /> */}
      {!isLoggedIn && <NewsletterSection />}
      <BlogSection />
    </HomeMain>
  )
}

const FeaturedInSection = () => {
  return (
    <LogosSection
      title="As featured in"
      names={['elle', 'gq', 'cosmopolitan', 'hello', 'marie-claire', 'vogue']}
      location="publications"
    />
  )
}

const BrandsSection = () => {
  return (
    <LogosSection
      title="Brands we love"
      names={['dkny', 'topman', 'lacoste', 'ralph-lauren', 'k-swiss', 'tommy-hilfiger']}
      location="brands"
    />
  )
}

const LogosSection = ({ title, names, location }) => {
  return (
    <Section maxWidth="lg">
      {title && (
        <Typography
          align="center"
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={5}
          fontWeight="bold"
          component="h2"
          variant="body2"
          children={title}
          paragraph
        />
      )}
      <Box px={{ sm: 2 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 3, md: 5, lg: 7 }} // could use gap, but then we'd lose MUI flex-wrapping with spacing functionality
          sx={(theme) => ({
            filter: 'invert(50%)',
            ...(theme.palette.mode === 'dark' && {
              filter: 'grayscale(1) invert(80%)',
            }),
          })}>
          {names.map((name) => {
            return (
              <Grid
                key={name}
                item
                xs={3.5} // show 3 per row on xs
                md={2} // show 6 per row on sm+
                container
                justifyContent="center">
                <Box
                  component="img"
                  src={'/images/' + location + '/' + name + '.png'}
                  sx={{ maxWidth: '100%', maxHeight: 24 }}
                  alt={name}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Section>
  )
}

const TrendingProductsSection = () => {
  return (
    <Section>
      <Typography component="h2" variant="h6" children="This is what we're loving right now" />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <img
            src="https://i.ebayimg.com/images/g/DocAAOSwftlijc3Q/s-l500.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <Typography>Ready to look cute in pastels & florals? Yeah, you are.</Typography>
          <Typography>Dress Trends</Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://whitfieldandward.co.uk/wp-content/uploads/2018/08/Bespoke-montage-e1534492507791.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <Typography>For those who use every excuse to dress up.</Typography>
          <Typography>Tuxedos & Suits</Typography>
        </Grid>
      </Grid>
    </Section>
  )
}

const CollectionSection = () => {
  return (
    <section>
      <Swiper
        autoPlay={true}
        indicators={false}
        cycleNavigation={true}
        stopAutoPlayOnHover={true}
        interval={5500}
        animation="slide"
        duration={1500}
        swipe>
        {heroItems.map((h) => (
          <HeroCarouselItem key={h.title} {...h} />
        ))}
      </Swiper>
    </section>
  )
}

const HeroCarouselItem = ({ title, description, imageUrl, href }) => {
  return (
    <Grid container spacing={4} /* sx={{ height: '80vh' }} */>
      <Grid item xs={5} container>
        <img style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} src={imageUrl} />
      </Grid>
      <Grid item xs={7} sx={{ gap: 4 }} container direction={'column'} justifyContent="center">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h5">{description}</Typography>
        <Button href={href} style={{ alignSelf: 'flex-start' }} variant="contained">
          Shop Now
        </Button>
      </Grid>
    </Grid>
  )
}
