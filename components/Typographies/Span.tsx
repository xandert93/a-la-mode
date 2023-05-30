import { Typography, TypographyProps } from '@mui/material'

export const Span = (props: TypographyProps) => {
  return (
    <Typography
      component="span"
      variant="inherit" // by default, we'll make <Span> inherit from parent <Typography>
      {...props}
    />
  )
}
