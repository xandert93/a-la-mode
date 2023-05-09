import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon, YouTubeIcon } from '@/components'
import { Grid, IconButton } from '@mui/material'

export const FooterSocialMediaLinks = () => {
  return (
    <Grid container wrap="nowrap" columnGap={2}>
      <IconButton href="#" children={<InstagramIcon />} />
      <IconButton href="#" children={<YouTubeIcon />} />
      <IconButton href="#" children={<TwitterIcon />} />
      <IconButton href="#" children={<FacebookIcon />} />
      <IconButton href="#" children={<PinterestIcon />} />
    </Grid>
  )
}