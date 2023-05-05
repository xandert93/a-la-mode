import { ButtonBase } from '@mui/material'
import NextLink from 'next/link'

export const Link = (props) => {
  return <ButtonBase component={NextLink} {...props} />
}

/* I've gone for <ButtonBase> here instead of MUI's <Link> because it has a nice
   ripple effect which I prefer (for now). May create a bespoke <RippleLink> if
   there later turns out to be a need for a more conventional <a>.
*/
