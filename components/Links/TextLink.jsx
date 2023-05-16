import { ButtonBase } from '@mui/material'
import NextLink from 'next/link'

const styles = {
  px: 1,
  py: 0.5,
  borderRadius: 1,
}

export const TextLink = ({ sx, ...props }) => {
  return <ButtonBase component={NextLink} sx={[styles, sx]} {...props} />
}
