import { Link } from '@/components'
import { isVPMinLg } from '@/theme'
import { Grid, IconButton, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { FavoriteBorder, PersonOutline, ShoppingBagOutlined } from '@mui/icons-material'
import { PATHS } from '@/constants'

export const HeaderActions = () => {
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={0.5}>
      {isMinLg ? <HeaderSearchForm /> : <MobileHeaderSearchButton />}
      <IconButton children={<PersonOutline />} />
      <IconButton component={Link} href={PATHS.WISHLIST} children={<FavoriteBorder />} />
      <IconButton children={<ShoppingBagOutlined />} />
    </Grid>
  )
}
