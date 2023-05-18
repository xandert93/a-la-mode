import { ButtonBase } from '@mui/material'
import NextLink from 'next/link'

import PropTypes from 'prop-types'

const styles = {
  px: 1,
  py: 0.5,
  borderRadius: 1,
}

export const TextLink = ({ sx, ...props }) => {
  return <ButtonBase LinkComponent={NextLink} sx={[styles, sx]} {...props} />
}

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
}
