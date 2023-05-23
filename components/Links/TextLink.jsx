import { isHoverable } from '@/theming'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

const styles = ({ hover }) => ({
  display: 'inline', // since in overrides, I've made it { display: block }

  ...(hover && {
    [isHoverable]: {
      transition: 'filter 0.2s',
      ':hover': {
        filter: 'saturate(300%)',
      },
    },
  }),
})

// built on top of <Typography> - can use its props
// however, by default color='primary' (stand out) and variant='inherit' (since MUI say <Link> is mostly used inside a <Typography>)
export const TextLink = ({ sx, hover = false, ...props }) => {
  return <Link sx={[styles({ hover }), sx]} component={NextLink} {...props} />
}

TextLink.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  underline: PropTypes.string,
  href: PropTypes.string.isRequired,
}
