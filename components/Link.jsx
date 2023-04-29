import { Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'

export const Link = ({ underline = 'hover', ...props }) => {
  return <MuiLink underline={underline} color="text.primary" component={NextLink} {...props} />
}
