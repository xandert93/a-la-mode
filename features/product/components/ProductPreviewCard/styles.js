import { isHoverable } from '@/theming'
import { alpha } from '@mui/material'

export const styles = {
  root: {
    position: 'relative',
    [isHoverable]: {
      ':hover': {
        boxShadow: ({ shadows }) => shadows[8],
        // backgroundColor: '',
      },
    },
  },

  'save-button': (isSaved) => ({
    position: 'absolute',
    p: {
      xs: 0.75, // default of `1` looks a bit crap on xs
      lg: 1,
    },
    backgroundColor: ({ palette }) => alpha(palette.common.white, isSaved ? 0 : 0.2),

    top: '5px',
    right: '5px',

    // *** probs not best (JFN), but when hoverable, padding is applied which affects positioning
    [isHoverable]: {
      top: '22px',
      right: '22px',
      ':hover': {
        transform: 'scale(0.95)',
      },
    },

    transition: ({ transitions }) => transitions.create('transform'),
  }),

  icon: (isSaved) => ({
    stroke: 'white', // border
    fill: ({ palette }) => (isSaved ? palette.primary.main : 'transparent'), // background-color
  }),

  'image-box': {
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    aspectRatio: '4/5',
    objectFit: 'cover',
  },

  'color-circle': {
    marginRight: '-4px',
    height: 24,
    width: 24,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: 'primary.touch',
  },
}

export default styles
