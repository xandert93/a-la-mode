import { Box, BoxProps } from '@mui/material'

type Props = {
  src: string
  alt: string
} & BoxProps

export const Img = (props: Props) => {
  return <Box component="img" {...props} />
}
