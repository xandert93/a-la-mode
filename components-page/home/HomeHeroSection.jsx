import { BackgroundVideo } from '@/components'
import { isVPXs, isVPLandscape } from '@/theme'
import { Box, Grid, Typography, Button as MuiButton } from '@mui/material'

const styles = {
  root: {
    position: 'relative',
    p: { xs: 2, sm: 4 }, // *** section padding...

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: `calc(100vh - 64px - 36px)`, // *** better way to do this?
    [isVPXs]: { height: `calc(100vh - 56px - 36px)` },
    [isVPLandscape]: { height: `calc(100vh - 48px - 36px)` },
  },

  content: {
    maxWidth: 600,
    textAlign: 'center',
    color: 'common.white',
    textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
  },

  button: {
    width: '15ch',
    borderColor: 'common.white',
    ':hover': {
      color: 'common.black',
      backgroundColor: 'common.white',
    },
  },
}

export const HomeHeroSection = () => {
  return (
    <Box component="section" sx={styles.root}>
      <BackgroundVideo poster="/videos/hero-video-1-poster.jpg" src="/videos/hero-video-1.mp4" />
      <Grid container direction="column" rowGap={{ xs: 3, sm: 4, md: 6 }} sx={styles.content}>
        <Typography component="h3" variant="h4" children="Summer'23" />
        <Typography component="h2" variant="h3" children="Explore the Everyday" />
        <Typography children="Embrace every moment this season, taking on new ventures in a thoughtfully curated collection for Summer'23" />
        <Grid container justifyContent="space-evenly" rowGap={2}>
          <Button href="#" children="Menswear" />
          <Button href="#" children="Womenswear" />
        </Grid>
      </Grid>
    </Box>
  )
}

const Button = ({ href, children }) => {
  return (
    <MuiButton
      variant="outlined"
      color="inherit" // only way to get white MUI styling (for now)
      href={href}
      children={children}
      sx={styles.button}
    />
  )
}
