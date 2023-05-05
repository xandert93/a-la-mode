import { isHoverable } from '@/theme'

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
    top: '4%',
    right: '5%',
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
    borderRadius: '12px',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
  },

  // Inspired by <AvatarGroup> - inspect MUI use for further configuration: https://mui.com/material-ui/react-avatar/#grouped
  'color-circle': (color) => ({
    marginRight: '-4px',
    height: 20,
    width: 20,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: 'background.highlight',
    backgroundColor: color,
  }),
}

export default styles
