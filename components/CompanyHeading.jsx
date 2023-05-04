import { NAMES } from '@/constants'
import { Typography } from '@mui/material'

export const CompanyHeading = ({ variant, ...props }) => {
  return (
    <Typography
      component="h1"
      variant={variant} //
      children={NAMES.COMPANY}
      align="center"
      {...props}
    />
  )
}
