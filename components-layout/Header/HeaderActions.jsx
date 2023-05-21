import { Link, IconButton, HeartIconOutlined, ShoppingBagIcon, AccountIcon } from '@/components'
import { isVPMinLg } from '@/theming'
import { Badge, Grid, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { PATHS } from '@/constants'

import { useStore } from '@/context/global-context'

export const HeaderActions = () => {
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={1}>
      {isMinLg ? <HeaderSearchForm /> : <MobileHeaderSearchButton />}
      <IconButton
        component={Link}
        href="/auth/login" // JFN until I can privatise routes etc
        children={<AccountIcon />}
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
        children={<ShoppingBagIconBadge />}
        aria-label="Visit Shopping Bag Page"
      />
    </Grid>
  )
}

const ShoppingBagIconBadge = () => {
  const { itemCount } = useStore().bag

  return (
    <Badge
      color="secondary"
      badgeContent={itemCount} // badge now auto-hides if badgeContent === 0
      children={<ShoppingBagIcon />}
    />
  )
}

const defaultProps = {
  variant: 'standard',
  overlap: 'rectangular',
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
}
