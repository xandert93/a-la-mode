import { Box } from '@mui/material'
import Image from 'next/image'

const styles = {
  objectFit: 'cover',
}

export const CoverImage = ({ src, sx, ...props }) => {
  return (
    <Box
      component={Image}
      src={src} //
      fill
      sx={[styles, sx]}
      {...props}
    />
  )
}
