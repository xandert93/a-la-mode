import {
  Link,
  IconButton,
  HeartIconOutlined,
  EmptyBagIcon,
  AccountIcon,
  BagIcon,
  HeartIcon,
} from '@/components'
import { isVPMinLg } from '@/theme'
import { Badge, Grid, useMediaQuery } from '@mui/material'
import { MobileHeaderSearchButton } from './MobileHeaderSearchButton'
import { HeaderSearchForm } from './HeaderSearchForm'
import { PATHS } from '@/constants'

import { useBag } from '@/context/bag-context'
import { useWishList } from '@/context/wish-list-context'

export const HeaderActions = () => {
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" alignItems="center" columnGap={1}>
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
        children={<WishListIconBadge />}
        aria-label="Visit Wish List Page"
      />
      <IconButton
        component={Link}
        href={PATHS.SHOPPING_BAG}
        children={<BagIconBadge />}
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

const BagIconBadge = () => {
  const { itemCount } = useBag()

  const Icon = itemCount ? BagIcon : EmptyBagIcon

  return <Badge color="secondary" badgeContent={itemCount} children={<Icon />} />
}
