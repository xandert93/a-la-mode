import { EmptyBagIcon, HeartIcon, BagIcon, ButtonLink } from '@/components'

import { PATHS } from '@/constants'
import { useWishList } from '@/contexts/wish-list-context'
import { EmptyItemsSection } from '@/features/product'
import { Divider, Grid, Typography } from '@mui/material'

export const EmptyBagSection = (props) => {
  const wishList = useWishList()

  return (
    <EmptyItemsSection Icon={EmptyBagIcon} {...props}>
      <Typography variant="h6" component="h2" children="Your bag is empty" fontWeight={500} />
      <Typography
        variant="body2"
        children="Items remain in your bag for 60 minutes, and are then moved to your Wish List."
      />
      {wishList.hasItems ? (
        <Grid container direction="column" alignItems="center" rowGap={3}>
          <ButtonLink href={PATHS.WISH_LIST} children="Go to Wish List" endIcon={<HeartIcon />} />
          <Divider flexItem variant="middle" children="or" />
          <ButtonLink href={PATHS.HOME} children="Start Shopping" endIcon={<BagIcon />} />
        </Grid>
      ) : (
        <ButtonLink href={PATHS.HOME} children="Start Shopping" endIcon={<BagIcon />} />
      )}
    </EmptyItemsSection>
  )
}
