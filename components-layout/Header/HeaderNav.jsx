import { Link } from '@/components'
import { categories } from '@/data'
import { Grid } from '@mui/material'

export const HeaderNav = () => {
  return (
    <Grid component="nav" container columnGap={{ md: 2, lg: 3, xl: 4 }} justifyContent="center">
      {categories.map((category) => (
        <Link key={category} href="/#" children={category} />
      ))}
    </Grid>
  )
}
