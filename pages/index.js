import { Section } from '@/components'
import {
  HomeMain,
  HomeHeroSection,
  NewProductsSection,
  CollectionsSection,
  NewsletterSection,
} from '@/components-page/home'
import { heroItems } from '@/data'
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material'

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
      <TrendingProductsSection />
      {!isLoggedIn && <NewsletterSection />}
      <BlogSection />
      <SocialsSection />
    </HomeMain>
  )
}

const FeaturedInSection = () => {
  return (
    <LogosSection
      title="As featured in"
      n={['elle', 'gq', 'marie-claire', 'vogue']}
      loc="publications"
    />
  )
}

const BrandsSection = () => {
  return (
    <LogosSection
      title="Brands You Need in Your Closet"
      n={['dkny', 'k-swiss', 'lacoste', 'levis']}
      loc="brands"
    />
  )
}

const BlogSection = () => {
  return (
    <Section>
      <img src="/blog.jpg" width="50px" />
    </Section>
  )
}

const SocialsSection = () => {
  return (
    <Grid
      container
      component="section"
      direction={'column'}
      gap={2}
      sx={{ backgroundColor: 'background.highlight', padding: 2 }}>
      <Typography component="h2" align="center" children="Join the conversation" />
      <Grid container justifyContent="center" columnGap={{ xs: 3, sm: 4 }}>
        <IconButton
          href="#"
          sx={{
            background:
              'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
          }}
          children={<Instagram sx={{ color: 'common.white', fontSize: { xs: 28, sm: 32 } }} />}
        />
        <IconButton
          disableRipple
          href="#"
          sx={{ backgroundColor: 'red' }}
          children={<YouTube sx={{ color: 'common.white', fontSize: { xs: 28, sm: 32 } }} />}
        />
        <IconButton
          disableRipple
          href="#"
          sx={{ backgroundColor: '#1DA1F2' }}
          children={<Twitter sx={{ color: 'common.white', fontSize: { xs: 28, sm: 32 } }} />}
        />
        <IconButton
          disableRipple
          href="#"
          sx={{ backgroundColor: '#0165E1' }}
          children={<Facebook sx={{ color: 'common.white', fontSize: { xs: 28, sm: 32 } }} />}
        />
      </Grid>
    </Grid>
  )
}

const SocialMediaLinks = () => {
  return (
    <Grid>
      <IconButton href="#" children={<Instagram />} />
      <IconButton href="#" children={<YouTube />} />
      <IconButton href="#" children={<Twitter />} />
      <IconButton href="#" children={<Facebook />} />
    </Grid>
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

const LogosSection = ({ title, n, loc }) => {
  return (
    <Section maxWidth="md">
      <Typography textAlign="center" component="h2" variant="h6" children={title} />
      <Grid
        container
        alignItems="center"
        sx={(theme) => ({
          ...(theme.palette.mode === 'dark' && { filter: 'invert(1)' }),
        })}>
        {n.map((pub) => {
          return (
            <Grid key={pub} item xs={3} container justifyContent="center">
              <img
                src={'/images/' + loc + '/' + pub + '.png'}
                style={{ maxWidth: '60%', maxHeight: 100 }}
              />
            </Grid>
          )
        })}
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
