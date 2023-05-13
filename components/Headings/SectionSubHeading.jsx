import { Typography } from '@mui/material'

export const SectionSubHeading = (props) => {
  return (
    <Typography
      component="span"
      display={'block'}
      color="primary.dark"
      fontWeight={500}
      textTransform="uppercase"
      letterSpacing={0.75}
      mb={2}
      {...props}
    />
  )
}
