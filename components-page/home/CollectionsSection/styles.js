import { isHoverable, isVPMaxSmAndLandscape } from '@/theme'
import { alpha } from '@mui/material'

const styles = {
  overlay: (theme) => ({
    ...theme.mixins.absCover,
    color: 'white',
    textAlign: 'center',
    backgroundColor: alpha('#000', 0.12),
    transition: theme.transitions.create('background-color'),
    [isHoverable]: {
      ':hover': {
        backgroundColor: 'initial',

        // *** better way to do this?
        '& ~ div > img': {
          transform: 'scale(1.05)',
        },
      },
    },
  }),

  title: (theme) => ({
    textTransform: 'uppercase',
    letterSpacing: 5,
    ...theme.mixins.textOutline('black'),
  }),

  description: (theme) => ({
    ...theme.mixins.textOutline('black'),
  }),

  'image-box': {
    position: 'relative',
    overflow: 'hidden',
    height: '50vh',
    [isVPMaxSmAndLandscape]: {
      height: '75vh',
    },
  },

  image: (theme) => ({
    transition: theme.transitions.create('transform'),
  }),
}

export default styles
