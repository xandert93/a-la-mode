import { isVPMinMd } from '@/theming'

const styles = {
  card: {
    backgroundColor: 'primary.touch',
  },

  container: {
    maxWidth: 1000,
    margin: '0 auto',
    p: { xs: 0, md: 3, lg: 4 },
  },

  'image-box': {
    position: 'relative',
    height: {
      xs: '40vh', // enables image to be limited by size of content in container and not vice versa
      sm: 'initial',
    },
    [isVPMinMd]: {
      borderRadius: 1,
      overflow: 'hidden',
    },
  },

  image: {
    filter: 'invert(0)',
  },

  'subscription-box': {
    px: { xs: 3, sm: 5, md: 6 },
    py: { xs: 3, sm: 4, md: 5 },
  },

  heading: {
    color: 'primary.dark',
    letterSpacing: 1,
  },

  'submit-button': {
    padding: '14px', // just to have similar size to <TextField>s, which have about ~14px padding
  },
}

export default styles
