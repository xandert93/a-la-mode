import { Typography } from '@mui/material'
import styles from './styles'

export const GradientTypography = ({ sx, color1, color2, degs, ...props }) => {
  return <Typography sx={[styles({ color1, color2, degs }), sx]} {...props} />
}
