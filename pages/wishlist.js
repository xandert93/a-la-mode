import { Box, Typography } from '@mui/material'

export default function WishListPage() {
  return (
    <Box>
      <Typography component="h2" children="My Wishlist" />
      <Typography component="h3" children="You haven't added anything to your wishlist yet" />
      <Typography children="To add a product to your wishlist just click the 'Save for later' button" />
    </Box>
  )
}
