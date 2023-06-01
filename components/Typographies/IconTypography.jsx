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

// In TS:

/* import { SvgIconComponent } from '@mui/icons-material'
import { Typography, TypographyProps, SvgIconProps } from '@mui/material'

type Props = TypographyProps & {
  Icon: SvgIconComponent // 🔥 https://stackoverflow.com/questions/64555625/type-for-material-ui-icons
  IconFontSize: SvgIconProps
}

export const IconTypography = ({
  Icon,
  IconFontSize = 'inherit',
  columnGap = 1,
  children,
  ...props
}: Props) => {
  return (
    <Typography display="flex" alignItems="center" columnGap={columnGap} {...props}>
      <Icon fontSize={IconFontSize} />
      {children}
    </Typography>
  )
} */
