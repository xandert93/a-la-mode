import { isHoverable } from '@/theming'
import { alpha } from '@mui/material'

const styles = {
  root: ({ palette }) => ({
    p: 1, // this is default, but feel free to adjust

    backgroundColor: alpha(palette.primary.main, 0.1),
    [isHoverable]: {
      '&:hover': {
        backgroundColor: alpha(palette.primary.main, 0.2),
      },
    },
  }),
}

export default styles
