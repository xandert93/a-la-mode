import { Box, Typography } from '@mui/material'
import Head from 'next/head'

export default function WishListPage() {
  return (
    <>
      <Head>
        <title>My Wish List</title>
      </Head>

      <Box>
        <Typography component="h2" children="My Wishlist" />
        <Typography component="h3" children="You haven't added anything to your wishlist yet" />
        <Typography children="To add a product to your wishlist just click the 'Save for later' button" />
      </Box>
    </>
  )
}
