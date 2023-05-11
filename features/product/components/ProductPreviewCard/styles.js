import { isHoverable } from '@/theming'

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

  'like-button': {
    position: 'absolute',

    // *** probs not best (JFN), but when hoverable, padding is applied which affects positioning
    [isHoverable]: {
      top: '3%',
      right: '4%',
    },

    top: '1%',
    right: '1%',

    transition: ({ transitions }) => transitions.create('transform'),
    ':hover': {
      transform: 'scale(0.95)',
    },
  },

  icon: (isLiked) => ({
    fill: isLiked ? 'red' : 'transparent', // background-color
    stroke: isLiked ? 'red' : 'black', // border
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
