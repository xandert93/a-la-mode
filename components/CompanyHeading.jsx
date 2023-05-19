import { NAMES } from '@/constants'
import { Typography } from '@mui/material'

export const CompanyHeading = ({ variant, ...props }) => {
  return (
    <Typography
      component="h1"
      variant={variant} //
      children={NAMES.COMPANY}
      fontFamily="Ephesis, cursive"
      fontWeight={400}
      letterSpacing={1}
      align="center"
      {...props}
    />
  )
}
