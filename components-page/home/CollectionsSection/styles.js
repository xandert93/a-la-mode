import { isHoverable, isVPMaxSmAndLandscape } from '@/theming'
import { alpha } from '@mui/material'

const styles = {
  overlay: (theme) => ({
    ...theme.mixins.absCover,

    color: 'white',
    textAlign: 'center',

    backgroundColor: alpha(theme.palette.common.black, 0.12),
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

  preview: {
    borderRadius: 1,
    overflow: 'hidden',
  },

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
