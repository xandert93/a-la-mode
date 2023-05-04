import { Link, NewsletterSection, Carousel, ProductPreviewCard } from '@/components'
import { HomeHeroSection } from '@/components-page/home'
import { collections, heroItems, latestProducts } from '@/data'
import { isVPXs } from '@/theme'
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material'

import { Box, Button, Container, Grid, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'

export default function HomePage() {
  const isLoggedIn = false

  return (
    <>
      <HomeHeroSection />
      <FeaturedInSection />
      {/* <CollectionSection /> */}
      <BrandsSection />
      {/* <CollectionsSection /> */}
      <NewProductsSection />
      {/* <TrendingProductsSection /> */}
      {!isLoggedIn && <NewsletterSection />}
      {/* <BlogSection /> */}
      {/* <SocialsSection /> */}
    </>
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
  return <img src="/blog.jpg" width="50px" />
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
    <Container style={{ padding: 24 }}>
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
    </Container>
  )
}

const LogosSection = ({ title, n, loc }) => {
  return (
    <Box component="section" sx={{ backgroundColor: 'background.highlight' }}>
      <Container maxWidth="md">
        <Typography textAlign={'center'} paragraph component="h2" variant="h6" children={title} />
        <Grid
          container
          alignItems={'center'}
          sx={(theme) => ({
            ...(theme.palette.mode === 'dark' && { filter: 'invert(1)' }),
          })}>
          {n.map((pub) => {
            return (
              <Grid key={pub} item xs={3} container justifyContent={'center'}>
                <img
                  src={'/images/' + loc + '/' + pub + '.png'}
                  style={{ maxWidth: '60%', maxHeight: 100 }}
                />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

const NewProductsSection = () => {
  return (
    <section>
      <Container>
        <Grid container alignItems={'center'}>
          <Typography component="h2" children="New Arrivals" />
          <Button children="Shop Men's" />
          <Button children="Shop Women's" />
          <Button children="Shop Kids'" />
        </Grid>
        {/* 👇 thinking to convert to horizontal carousel - see Nike or Asos */}
        <ProductPreviewList />
      </Container>
    </section>
  )
}

const ProductPreviewList = () => {
  const isXs = useMediaQuery(isVPXs)

  if (isXs)
    return (
      <Carousel
        autoPlay={false}
        navButtonsAlwaysInvisible
        animation="slide"
        duration={1200}
        swipe={true}>
        {latestProducts.map((product) => (
          <Box p={1}>
            <ProductPreviewCard key={product.name} {...product} />
          </Box>
        ))}
      </Carousel>
    )
  else
    return (
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {latestProducts.map((product) => (
          <Grid key={product.name} item lg={3} md={4} sm={6}>
            <ProductPreviewCard {...product} />
          </Grid>
        ))}
      </Grid>
    )
}

const CollectionsSection = () => {
  return (
    <section>
      <Grid container spacing={1} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {collections.map((c, index) => (
          <Grid key={c.id} item xs={12} md={index < 3 ? 4 : 6}>
            <CategoryPreview category={c} />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

const CategoryPreview = ({ category }) => {
  return (
    <Link href="/">
      <Box sx={{ height: '50vh' }}>
        <img
          src={category.imageUrl}
          style={{
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

const CollectionSection = () => {
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
          <HeroCarouselItem key={h.title} {...h} />
        ))}
      </Carousel>
    </section>
  )
}

const HeroCarouselItem = ({ title, description, imageUrl, href }) => {
  return (
    <Grid container spacing={4} /* sx={{ height: '80vh' }} */>
      <Grid item xs={5} container>
        <img style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} src={imageUrl} />
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
