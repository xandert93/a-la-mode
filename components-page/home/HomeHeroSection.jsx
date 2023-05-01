import { BackgroundVideo } from '@/components'
import { HomeHeroButton } from './HomeHeroButton'
import { isVPXs, isVPLandscape } from '@/theme'
import { Box, Grid, Typography } from '@mui/material'

const sx = {
  root: {
    position: 'relative',
    p: { xs: 2, sm: 4 }, // *** section padding...

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: `calc(100vh - 64px)`,
    [isVPXs]: { height: `calc(100vh - 56px)` },
    [isVPLandscape]: { height: `calc(100vh - 48px)` },
  },

  content: {
    maxWidth: 600,
    textAlign: 'center',
    color: 'common.white',
    textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
  },
}

export const HomeHeroSection = () => {
  return (
    <Box component="section" sx={sx.root}>
      <BackgroundVideo poster="/videos/hero-video-1-poster.jpg" src="/videos/hero-video-1.mp4" />
      <Grid container direction="column" rowGap={{ xs: 3, sm: 4, md: 6 }} sx={sx.content}>
        <Typography component="h3" variant="h4" children="Summer'23" />
        <Typography component="h2" variant="h3" children="Explore the Everyday" />
        <Typography children="Embrace every moment this season, taking on new ventures in a thoughtfully curated collection for Summer'23" />
        <Grid container justifyContent="space-evenly" rowGap={2}>
          <HomeHeroButton href="#" children="Menswear" />
          <HomeHeroButton href="#" children="Womenswear" />
        </Grid>
      </Grid>
    </Box>
  )
}
