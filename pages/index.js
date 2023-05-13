import { Section } from '@/components'
import {
  HomeMain,
  HomeHeroSection,
  ProductPreviewsSection,
  CollectionsSection,
  NewsletterSection,
  BlogSection,
} from '@/components-page/home'

import { Box, Grid, Typography } from '@mui/material'

export default function HomePage() {
  const isLoggedIn = false

  return (
    <HomeMain>
      <HomeHeroSection />
      <PublicationsSection />
      <CollectionsSection />
      <BrandsSection />
      <ProductPreviewsSection type="trending" title="Our customers are loving these right now" />
      {!isLoggedIn && <NewsletterSection />}
      <ProductPreviewsSection type="new additions" title="Browse our latest arrivals" />
      <BlogSection />
    </HomeMain>
  )
}

const PublicationsSection = () => {
  return (
    <LogosSection
      title="As featured in"
      names={['elle', 'gq', 'cosmopolitan', 'hello', 'marie-claire', 'vogue']}
      location="publications"
      sx={{
        mt: 6, // since <HomeHeroSection> has padding-bottom already
        mb: 8,
      }}
    />
  )
}

const BrandsSection = () => {
  return (
    <LogosSection
      title="Brands you will love"
      names={['dkny', 'topman', 'lacoste', 'ralph-lauren', 'k-swiss', 'tommy-hilfiger']}
      location="brands"
      sx={{ my: 8 }}
    />
  )
}

const LogosSection = ({ title, names, location, ...props }) => {
  return (
    <Section maxWidth="lg" {...props}>
      {title && (
        <Typography
          align="center"
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={5}
          component="h2"
          variant="body2"
          children={title}
          mb={5}
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
