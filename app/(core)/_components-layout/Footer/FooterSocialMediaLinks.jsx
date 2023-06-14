import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon,
  YouTubeIcon,
  IconButton,
} from '@/components'
import { Grid } from '@mui/material'

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    Icon: InstagramIcon,
  },
  {
    name: 'YouTube',
    href: '#',
    Icon: YouTubeIcon,
  },
  {
    name: 'Twitter',
    href: '#',
    Icon: TwitterIcon,
  },
  {
    name: 'Facebook',
    href: '#',
    Icon: FacebookIcon,
  },
  {
    name: 'Pinterest',
    href: '#',
    Icon: PinterestIcon,
  },
]

const styles = {
  button: {
    color: 'primary.light',
  },
}

export const FooterSocialMediaLinks = () => {
  return (
    <Grid container wrap="nowrap" justifyContent="center" columnGap={{ xs: 1.5, md: 2 }}>
      {socialLinks.map(({ name, href, Icon }) => {
        const ariaLabel = `Visit our ${name} Page`

        return (
          <IconButton
            key={name}
            href={href}
            target="_blank"
            aria-label={ariaLabel}
            title={ariaLabel}
            sx={styles.button}
            children={<Icon />}
          />
        )
      })}
    </Grid>
  )
}
