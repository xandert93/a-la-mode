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
      <IconButton children={<PersonOutline />} aria-label="See Account" />
      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<FavoriteBorder />}
        aria-label="Visit Wishlist Page"
      />
      <IconButton children={<ShoppingBagOutlined />} aria-label="Visit Basket Page" />
    </Grid>
  )
}
