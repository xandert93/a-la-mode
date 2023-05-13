import { Link, IconButton } from '@/components'
import { isVPMinLg } from '@/theming'
import { Grid, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { FavoriteBorder, PersonOutline, ShoppingBagOutlined } from '@mui/icons-material'
import { PATHS } from '@/constants'

export const HeaderActions = () => {
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={1}>
      {isMinLg ? <HeaderSearchForm /> : <MobileHeaderSearchButton />}
      <IconButton children={<PersonOutline />} aria-label="See Account" />
      <IconButton
        component={Link}
        href={PATHS.WISH_LIST}
        children={<FavoriteBorder />}
        aria-label="Visit Wish List Page"
      />
      <IconButton
        component={Link}
        href={PATHS.SHOPPING_BAG}
        children={<ShoppingBagOutlined />}
        aria-label="Visit Shopping Bag Page"
      />
    </Grid>
  )
}
