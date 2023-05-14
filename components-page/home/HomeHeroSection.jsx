import { BackgroundVideo, ImageButton, Section } from '@/components'
import { isVPXs, isVPXsAndLandscape } from '@/theming'
import { Grid, Typography } from '@mui/material'

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: `calc(100vh - 64px - 36px)`, // *** better way to do this?
    [isVPXs]: { height: `calc(100vh - 56px - 36px)` },
    [isVPXsAndLandscape]: { height: `calc(100vh - 48px - 36px)` },
  },

  content: (theme) => ({
    maxWidth: 600,
    color: 'white',
    textAlign: 'center',
    ...theme.mixins.textShadowDark,
  }),
}

export const HomeHeroSection = () => {
  return (
    <Section sx={styles.root}>
      <BackgroundVideo
        p={{ md: 2, lg: 3 }}
        poster="/videos/hero-video-1-poster.jpg"
        src="/videos/hero-video-1.mp4"
      />
      <Grid container direction="column" rowGap={{ xs: 3, sm: 4, md: 6 }} sx={styles.content}>
        <Typography component="h3" variant="h4" children="Summer'23" />
        <Typography component="h2" variant="h3" children="Explore the Everyday" />
        <Typography children="Embrace every moment this season, taking on new ventures in a thoughtfully curated collection for Summer'23" />
        <Grid container justifyContent="space-evenly" rowGap={2}>
          <ImageButton outlined elevation={8} children="Menswear" />
          <ImageButton outlined elevation={8} children="Womenswear" />
        </Grid>
      </Grid>
    </Section>
  )
}
