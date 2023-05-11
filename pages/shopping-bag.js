import { NAMES } from '@/constants'
import { Box, Button, Typography } from '@mui/material'
import Head from 'next/head'

export default function ShoppingBagPage() {
  return (
    <>
      <Head>
        <title children={`Shopping Bag | ${NAMES.COMPANY}`} />
      </Head>

      <Box>
        <Typography component="h2" children="My Shopping Bag" />
        <Typography component="h3" children="Your bag is empty" />
        <Typography children="Sign in to see your bag and start shopping!" />
        <Button children="Sign in" />
      </Box>
    </>
  )
}
