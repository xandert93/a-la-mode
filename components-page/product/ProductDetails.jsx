import {
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  Img,
  LoadingButton,
  InformationIcon,
  DeliveryIcon,
  MoneyTypography,
  Select,
  Span,
  Link,
} from '@/components'
import { useBag, useWishList } from '@/context/global-context'
import { useSnackbar } from '@/context/snackbar-context'
import { NewTag } from '@/features/product'
import { useEffectOnMount } from '@/hooks'
import { wait } from '@/utils/helpers'
import { Box, Button, Grid, Rating, Typography, MenuItem, Paper } from '@mui/material'
import { useState } from 'react'

export const ProductDetails = (product) => {
  const { name, prices, rating, description, features, stock, lastPurchasedAt, createdAt } = product

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start" // without <Grid item> system, <ButtonBase> will stretch. Will remove if I start using <Grid item>s
      rowGap={2.5}>
      <NewTag />

      <Grid
        container
        direction="column"
        alignItems="flex-start" // otherwise <ButtonBase> stretches, making whole line clickable
        rowGap={1.5}>
        <ProductName name={name} />
        <ProductRatingsLink rating={rating} />
        <ProductPricing prices={prices} />
      </Grid>

      <Grid container direction="column" rowGap={1.5}>
        <ProductAvailability {...stock} />
        <ProductColors />
        <ProductSizing />
      </Grid>

      <BestSellerTag />
      <ProductActions product={product} />
      <FreeDeliveryAlert />
    </Grid>
  )
}

const ProductName = ({ name }) => {
  return (
    <Typography
      component="h1" // *** all eComm website do this! Apparently is supposed to match <title>. But now have multiple and differing H1s...
      variant="h6"
      children={name}
      fontWeight={500} // JFN
      letterSpacing={-0.5}
    />
  )
}

// *** might end up just being a button too - undecided:
const ProductRatingsLink = ({ rating }) => {
  return (
    <Link href="#">
      <Grid
        container
        alignItems="center"
        sx={{
          columnGap: 1,
          my: 0.5, // JTO - don't mind the extra space
        }}>
        <Rating value={rating.average} />
        <Typography children={`${rating.average} (${rating.count})`} />
      </Grid>
    </Link>
  )
}

const ProductPricing = ({ prices }) => {
  return (
    <Grid container columnGap={1}>
      {prices.previous && (
        <MoneyTypography
          color="text.disabled"
          children={prices.previous}
          sx={{ textDecoration: 'line-through' }} // JFN
        />
      )}
      <MoneyTypography
        variant="h6" // or makes same size...JTO!
        component="p"
        children={prices.current}
        color={prices.previous && 'secondary.main'}
      />
    </Grid>
  )
}

const ProductAvailability = ({ isAvailable, isLow, count }) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={500}>
        Availability:{' '}
        <Span
          color={!isAvailable ? 'text.disabled' : isLow ? 'error.main' : 'success.main'}
          children={!isAvailable ? 'out of stock' : isLow ? `only ${count} left` : 'in stock ✔'}
          fontWeight={isAvailable && isLow ? 500 : 400}
        />
      </Typography>
    </Box>
  )
}

// should have <RadioGroup>
const ProductColors = ({ colors = ['beige', 'navy', 'primary.dark', 'black'] }) => {
  return (
    <Box>
      <Typography variant="body2" children="Select your color:" fontWeight={500} />
      <Grid container columnGap={2} my={2}>
        {colors.map((c) => (
          <Box
            key={c}
            height={30}
            width={30}
            bgcolor={c}
            borderRadius="50%"
            border={'2px solid'}
            borderColor="primary.light"
          />
        ))}
      </Grid>
    </Box>
  )
}

// should have <RadioGroup>
const ProductSizing = ({ sizes = ['xs', 's', 'm', 'l', 'xl', '2xl'] }) => {
  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="body2" children="Select your size:" fontWeight={500} />
        <Typography variant="body2" color="text.secondary" children="Size Guide" fontWeight={500} />
      </Grid>
      <Grid container gap={{ xs: 1, md: 1.5, xl: 2 }} my={2}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant="outlined"
            children={size}
            sx={{ py: 1.5, px: 2, textTransform: 'uppercase' }}
            disabled={['m', '2xl'].includes(size)}
          />
        ))}
      </Grid>
      <Box>
        <Typography variant="body2" children="Size Missing?" fontWeight={500} />
        <Typography
          variant="body2"
          children="Sign up to be notified when the product comes back in stock" // Add "Notify Me 🔔" link or button
        />
      </Box>
    </Box>
  )
}

const BestSellerTag = () => {
  return (
    <Grid container columnGap={1.5}>
      <Img
        src="/images/popular-star.gif"
        alt="Popular Star GIF"
        height="40px"
        bgcolor="secondary.main"
        borderRadius="50%"
        p={0.5}
      />
      <Box>
        <Typography variant="body2" children="Best Seller" fontWeight={500} />
        <Typography variant="body2" children="7 sold today!" />
      </Box>
    </Grid>
  )
}

const ProductActions = ({ product }) => {
  const [qty, setQty] = useState(1)

  // JFN
  useEffectOnMount(() => {
    setQty(
      JSON.parse(localStorage.getItem('bag-items'))?.find((item) => item.name === product.name)
        ?.qty || 1
    )
  })

  const handleQtyChange = (e) => setQty(e.target.value)

  return (
    <Grid container justifyContent="flex-end" spacing={{ xs: 2, sm: 1 }}>
      {/* if out of stock, either a) hide qty <Select> & <AddToBagButton> or b) disable them 
      - see what other sites do and decide lol. But without any recon, a) looks kinda nice actually */}
      {product.stock.isAvailable && (
        <>
          <Grid item xs={12} sm={2}>
            <QtySelect stock={product.stock} value={qty} onChange={handleQtyChange} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <AddToBagButton product={product} qty={qty} />
          </Grid>
        </>
      )}
      {/* JFN 👇 lol */}
      <Grid item xs={12} sm={product.stock.isAvailable ? 10 : 12}>
        <SaveButton product={product} />
      </Grid>
    </Grid>
  )
}

const QtySelect = ({ stock, ...props }) => {
  // better way to do this?
  const values = [...Array(stock.count > 9 ? 9 : stock.count).keys()].map((index) => index + 1)

  return (
    <Select label="Qty" required={false} {...props}>
      {values.map((val) => (
        <MenuItem key={val} value={val} children={val} /> // netter way to do this lol?
      ))}
    </Select>
  )
}

const AddToBagButton = ({ product, qty }) => {
  const bag = useBag()
  const snackbar = useSnackbar()

  const [isAdding, setIsAdding] = useState(false)

  const handleAddToBagClick = async () => {
    setIsAdding(true)
    await wait(1)
    bag.addLineItem(product, qty)
    snackbar.success('Added to Bag!')
    setIsAdding(false)
  }

  return (
    <LoadingButton
      variant="contained"
      isLoading={isAdding}
      onClick={handleAddToBagClick}
      children="Add to Bag"
      fullWidth
      sx={{ py: '13.5px' }} // hacky, but to match <Select>
    />
  )
}

const SaveButton = ({ product }) => {
  const wishList = useWishList()
  const snackbar = useSnackbar()

  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // JFN
  useEffectOnMount(() => {
    setIsSaved(
      JSON.parse(localStorage.getItem('saved-items'))?.some((item) => item.name === product.name)
    )
  })

  const toggleSave = async () => {
    setIsSaving(true)
    await wait(2)
    !isSaved ? wishList.addSavedItem(product) : wishList.removeSavedItem(product.name)
    !isSaved && snackbar.success('Saved')
    setIsSaved((prev) => !prev)
    setIsSaving(false)
  }

  return (
    <LoadingButton
      variant="contained"
      isLoading={isSaving}
      onClick={toggleSave}
      endIcon={isSaved ? <HeartIcon /> : <HeartIconOutlined />}
      children={isSaved ? 'Saved' : 'Save for later'}
      fullWidth
      sx={{ py: '13.5px' }} // hacky, but to match <Select>
    />
  )
}

const FreeDeliveryAlert = () => {
  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      columnGap={2}
      bgcolor="primary.touch"
      py={1}
      pl={2}
      pr={1} // JFN - since <IconButton> already has padding applied
      borderRadius={1} // use paper/card instead?
      color="primary.dark">
      <DeliveryIcon />
      <Typography
        variant="body2"
        children="Free standard delivery on orders over £50"
        flexGrow={1}
      />
      <IconButton
        children={<InformationIcon />}
        onClick={() => {}} // see M&S - open modal displaying shipping data
      />
    </Grid>
  )
}
