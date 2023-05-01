import { companyName } from '@/constants'
import { Typography } from '@mui/material'

export const CompanyHeading = ({ variant, ...props }) => {
  return (
    <Typography
      component="h1"
      variant={variant} //
      children={companyName}
      align="center"
      {...props}
    />
  )
}
