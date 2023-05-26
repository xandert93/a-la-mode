import { Typography } from '@mui/material'

export const IconTypography = ({
  Icon,
  IconFontSize = 'inherit',
  columnGap = 1,
  children,
  ...props
}) => {
  return (
    <Typography display="flex" alignItems="center" columnGap={columnGap} {...props}>
      <Icon fontSize={IconFontSize} />
      {children}
    </Typography>
  )
}
