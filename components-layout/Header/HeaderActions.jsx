import { Link, IconButton, HeartIconOutlined } from '@/components'
import { isVPMinLg } from '@/theming'
import { Grid, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material'
import { PATHS } from '@/constants'

export const HeaderActions = () => {
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={1}>
      {isMinLg ? <HeaderSearchForm /> : <MobileHeaderSearchButton />}
      <IconButton
        component={Link}
        href="/auth/login" // JFN until I can privatise routes etc
        children={<PersonOutline />}
        aria-label="See Account"
      />
      <IconButton
        component={Link}
        href={PATHS.WISH_LIST}
        children={<HeartIconOutlined />}
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
