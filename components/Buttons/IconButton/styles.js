import { isHoverable } from '@/theme'
import { alpha } from '@mui/material'

const styles = ({ shaded }) => {
  return ({ palette }) => ({
    ...(shaded && {
      bgcolor: alpha(palette.primary.main, 0.1),
      [isHoverable]: {
        '&:hover': {
          bgcolor: alpha(palette.primary.main, 0.2),
        },
      },
    }),
  })
}

export default styles
