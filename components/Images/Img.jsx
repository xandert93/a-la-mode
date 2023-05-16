import { Box } from '@mui/material'
import PropTypes from 'prop-types'

export const Img = (props) => {
  return <Box component="img" {...props} />
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sx: PropTypes.object,
}
