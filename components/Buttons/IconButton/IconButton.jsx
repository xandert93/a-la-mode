import { forwardRef } from 'react'
import { IconButton as MuiIconButton } from '@mui/material'

import styles from './styles'

// has almost transparent background color applied, with slight opacity increase on hover
// maybe add responsive padding

export const IconButton = forwardRef(({ shaded = true, sx, ...props }, ref) => {
  return <MuiIconButton ref={ref} sx={[styles({ shaded }), sx]} {...props} />
})

/* accepts a "size" prop ('small | medium* | large')

small applies { p: '5px', fontSize: 1.125rem }
medium applies { p: '8px', fontSize: 1.5rem }
large applies { p: '12px', fontSize: 1.75rem }

applying any padding or font-size in our custom styles will always override "size" prop

*/
