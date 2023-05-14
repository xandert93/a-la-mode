import { ButtonBase } from '@mui/material'
import NextLink from 'next/link'

const styles = {
  display: 'block', // flex
}

export const Link = ({ sx, ...props }) => {
  return <ButtonBase component={NextLink} sx={[styles, sx]} {...props} />
}

/* I've gone for <ButtonBase> here instead of MUI's <Link> because it has a nice
   ripple effect which I prefer (for now). May create a bespoke <RippleLink> if
   there later turns out to be a need for a more conventional <a>.
*/
