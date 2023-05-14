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

  'like-button': (isLiked) => ({
    position: 'absolute',
    p: {
      xs: 0.75, // default of `1` looks a bit crap on xs
      lg: 1,
    },
    backgroundColor: ({ palette }) => alpha(palette.primary.main, isLiked ? 0 : 0.5),

    // *** probs not best (JFN), but when hoverable, padding is applied which affects positioning
    [isHoverable]: {
      top: '4%',
      right: '6%',
    },

    top: '1%',
    right: '1%',

    transition: ({ transitions }) => transitions.create('transform'),
    [isHoverable]: {
      ':hover': {
        transform: 'scale(0.95)',
      },
    },
  }),

  icon: (isLiked) => ({
    stroke: 'white', // border
    fill: ({ palette }) => (isLiked ? palette.primary.main : 'transparent'), // background-color
  }),

  'image-box': {
    borderRadius: 1,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    aspectRatio: '4/5',
    objectFit: 'cover',
  },

  // Inspired by <AvatarGroup> - inspect MUI use for further configuration: https://mui.com/material-ui/react-avatar/#grouped
  'color-circle': (color) => ({
    marginRight: '-4px',
    height: 20,
    width: 20,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: 'primary.touch',
    backgroundColor: color,
  }),
}

export default styles
