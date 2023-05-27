import { Box } from '@mui/material'
import Image from 'next/image'

import PropTypes from 'prop-types'

export const CoverImage = ({ sx, ...props }) => {
  return (
    <Box
      component={Image}
      fill
      sx={{
        objectFit: 'cover',
        ...sx,
      }}
      {...props}
    />
  )
}

CoverImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}
