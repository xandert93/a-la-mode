import { isHoverable } from '@/theme'
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
    backgroundColor: ({ palette }) => alpha(palette.common.white, isSaved ? 0 : 0.7),

    top: '5px',
    right: '5px',

    // *** probs not best (JFN), but when hoverable, padding is applied which affects positioning
    [isHoverable]: {
      top: '22px',
      right: '22px',
      ':hover': {
        transform: 'scale(0.95)',
        backgroundColor: 'common.white',
      },
    },

    transition: ({ transitions }) => transitions.create(['transform', 'background-color']),
  }),

  icon: (isSaved) => ({
    stroke: ({ palette }) => (isSaved ? 'white' : palette.primary.main), // border
    fill: ({ palette }) => (isSaved ? palette.primary.main : 'transparent'), // background-color
  }),

  'image-box': {
    position: 'relative',
    aspectRatio: '4/5',
    overflow: 'hidden',
  },
}

export default styles
