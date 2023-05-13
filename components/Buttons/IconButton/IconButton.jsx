import { forwardRef } from 'react'
import { IconButton as MuiIconButton } from '@mui/material'

import styles from './styles'

// has extra (and responsive) padding applied
// has almost transparent background color applied, with slight opacity increase on hover

export const IconButton = forwardRef(({ sx, ...props }, ref) => {
  return <MuiIconButton ref={ref} sx={[styles.root, sx]} {...props} />
})
