import { Box, BoxProps } from '@mui/material'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
} & BoxProps

export const CoverImage = ({ sx, ...props }: Props) => {
  return <Box component={Image} fill sx={{ objectFit: 'cover', ...sx }} {...props} />
}
