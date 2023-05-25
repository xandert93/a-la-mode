import { DeleteIcon, Span } from '@/components'
import { EmptyWishListSection } from '@/components-page/wish-list'
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
        <EmptyWishListSection />
      )}
    </>
  )
}
