import {
  Link,
  IconButton,
  HeartIconOutlined,
  ShoppingBagIconOutlined,
  AccountIcon,
  ShoppingBagIcon,
  HeartIcon,
} from '@/components'
import { isVPMinLg } from '@/theming'
import { Badge, Grid, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { PATHS } from '@/constants'

import { useBag, useWishList } from '@/context/global-context'

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
        // component={Link}
        // href={PATHS.WISH_LIST}
        children={<WishListIconBadge />}
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

const WishListIconBadge = () => {
  const { itemCount } = useWishList()

  const Icon = itemCount ? HeartIcon : HeartIconOutlined

  return <Badge color="secondary" badgeContent={itemCount} children={<Icon />} />
}

const ShoppingBagIconBadge = () => {
  const { itemCount } = useBag()

  const Icon = itemCount ? ShoppingBagIcon : ShoppingBagIconOutlined

  return <Badge color="secondary" badgeContent={itemCount} children={<Icon />} />
}
