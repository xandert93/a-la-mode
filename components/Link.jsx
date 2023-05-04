import { Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'

export const Link = (props) => {
  return <MuiLink color="text.primary" component={NextLink} {...props} />
}
