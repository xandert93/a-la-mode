import { DeleteIcon, Span } from '@/components'
import { NAMES } from '@/constants'
import { useWishList } from '@/context/global-context'
import { Box, IconButton, Typography } from '@mui/material'
import Head from 'next/head'

export default function WishListPage() {
  const { items, itemCount, hasItems, removeSavedItem } = useWishList()

  return (
    <>
      <Head>
        <title children={`Wish List | ${NAMES.COMPANY}`} />
      </Head>

      <Typography component="h2" children={`My Wishlist (${itemCount})`} />

      {hasItems ? (
        <Box>
          {items.map((item) => (
            <Box key={item.name}>
              <Span children={item.name} />
              <IconButton children={<DeleteIcon />} onClick={() => removeSavedItem(item.name)} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          <Typography component="h3" children="You haven't added anything to your Wish List yet" />
          <Typography children="To add a product to your Wish List just click the 'Save for later' button" />
        </Box>
      )}
    </>
  )
}
