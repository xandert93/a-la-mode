import { Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'

export const Link = ({ sx, ...props }) => {
  return <MuiLink component={NextLink} sx={[sx]} {...props} />
}
