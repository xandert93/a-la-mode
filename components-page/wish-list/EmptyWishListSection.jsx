import { ButtonLink, HeartIconOutlined, ShoppingBagIcon } from '@/components'
import { PATHS } from '@/constants'
import { EmptyItemsSection } from '@/features/product'
import { Typography } from '@mui/material'

export const EmptyWishListSection = () => {
  return (
    <EmptyItemsSection Icon={HeartIconOutlined}>
      <Typography
        variant="h6"
        component="h2"
        children="You haven't added anything to your Wish List yet"
        fontWeight={500}
      />
      <Typography
        variant="body2"
        children="Start saving as you shop by selecting the little heart - we'll sync these across all your devices. Easy."
      />
      <ButtonLink href={PATHS.HOME} children="Start Shopping" endIcon={<ShoppingBagIcon />} />
    </EmptyItemsSection>
  )
}
