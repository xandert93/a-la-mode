import { Typography } from '@mui/material'

export const IconTypography = ({ Icon, children, ...props }) => {
  return (
    <Typography display="flex" alignItems="center" columnGap={1} {...props}>
      <Icon fontSize="inherit" />
      {children}
    </Typography>
  )
}
