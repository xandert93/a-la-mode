import { Typography } from '@mui/material'

export const SectionHeading = (props) => {
  return (
    <Typography
      component="h2"
      variant="h5"
      fontWeight={{ xs: 600, md: 700 }}
      letterSpacing={-0.5}
      {...props}
    />
  )
}
