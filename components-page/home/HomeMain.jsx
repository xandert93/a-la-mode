import { Grid } from '@mui/material'

export const HomeMain = (props) => {
  return (
    <Grid
      component="main"
      container
      direction="column"
      wrap="nowrap" // otherwise <Swiper> spazzes out
      rowGap={{ xs: 5, sm: 6, md: 7, lg: 8 }}
      {...props}
    />
  )
}
