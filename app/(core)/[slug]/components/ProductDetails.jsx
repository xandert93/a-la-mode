import {
  HeartIcon,
  HeartIconOutlined,
  IconButton,
  Img,
  LoadingButton,
  InformationIcon,
  ShippingIcon,
  Select,
  Span,
  Link,
  EmptyBagIcon,
} from '@/components'

import { useBag } from '@/contexts/bag-context'
import { useWishList } from '@/contexts/wish-list-context'
import { useSnackbar } from '@/contexts/snackbar-context'

import { NewTag } from '@/features/product'
import { useEffectOnMount } from '@/hooks'
import { wait } from '@/utils/helpers'
import { Box, Grid, Rating, Typography, MenuItem } from '@mui/material'
import { createContext, useContext, useState } from 'react'

import { ProductSizing } from './ProductSizing'
import { ProductColors } from './ProductColors'
import { ProductPricing } from '@/features/product/components'

const context = createContext()
const useProductDetails = () => useContext(context) // perhaps "useProduct", we'll see
const ProductDetailsProvider = context.Provider

/*
🤔 
Find best position for <NewTag> - Review other sites

🤔
At the moment (in <ProductActions>), if out of stock, I'm conditionally removing
<ProductQtySelect> and <AddToBagButton> from the UI. This is 🚧. Review other sites actual 
handling out of stock UI?

🤔
Find best position for <ProductAvailability> and how best to inform client that product
is out of stock. At the moment, message is quite small and perhaps easy to miss. 
Review other sites.

*/

export const ProductDetails = (product) => {
  const { name, prices, rating, description, features, stock, colors, lastPurchasedAt, createdAt } =
    product

  // 🚧 - lazy...
  const [state, setState] = useState({
    color: { value: '', hasErr: false },
    size: { value: '', hasErr: false },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: { value, hasErr: false } }))
  }

  const setErr = (name) => {
    setState((prev) => ({ ...prev, [name]: { value: prev[name].value, hasErr: true } }))
  }

  const [qty, setQty] = useState(1)

  // 🚧
  useEffectOnMount(() => {
    const foundBagItem = JSON.parse(localStorage.getItem('bag-items'))?.find(
      (item) => item.name === product.name
    )

    if (foundBagItem) {
      const { color, size, qty } = foundBagItem

      setState((prev) => ({
        ...prev,
        color: { value: color, hasErr: false },
        size: { value: size, hasErr: false },
      }))
      setQty(qty)
    }
  })

  const handleQtyChange = (e) => setQty(e.target.value)

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start" // without <Grid item> system, <NewTag> will stretch. Will remove if I start using <Grid item>s
      rowGap={2}>
      <NewTag />

      <Grid
        container
        direction="column"
        alignItems="flex-start" // otherwise <ProductRatingsLink> stretches, making whole line clickable
        rowGap={1.5}>
        <ProductHeading name={name} />
        <ProductRatingsLink rating={rating} />
        <ProductPricing prices={prices} variant2="h6" />
      </Grid>

      <Grid container direction="column" rowGap={2}>
        <ProductAvailability {...stock} />
        <ProductColors {...{ colors, ...state.color, handleChange }} />
        <ProductSizing {...{ ...state.size, handleChange }} />
      </Grid>

      <BestSellerTag />
      <ProductActions
        {...{
          product,
          color: state.color.value,
          size: state.size.value,
          qty,
          handleQtyChange,
          setErr,
        }}
      />
      <FreeShippingAlert />
    </Grid>
  )
}

const ProductHeading = ({ name }) => {
  return (
    <Typography
      component="h1" // ❗ all eComm website do this! Apparently is supposed to match <title>. But now have multiple and differing H1s...
      variant="h6"
      children={name}
      letterSpacing={-0.5}
    />
  )
}

// ❗ might end up just being a button too - undecided:
const ProductRatingsLink = ({ rating }) => {
  return (
    <Link href="#">
      <Grid
        container
        alignItems="center"
        sx={{
          columnGap: 1,
          my: 0.5, // 🏉 - don't mind the extra space
        }}>
        <Rating value={rating.average} />
        <Typography children={`${rating.average} (${rating.count})`} />
      </Grid>
    </Link>
  )
}

const ProductAvailability = ({ isAvailable, isLow, count }) => {
  return (
    <Box>
      <Typography variant="body2">
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

const ProductActions = ({ product, color, size, qty, handleQtyChange, setErr }) => {
  return (
    <Grid container justifyContent="flex-end" spacing={{ xs: 2, sm: 1 }}>
      {/* if out of stock, either a) hide qty <Select> & <AddToBagButton> or b) disable them 
      - see what other sites do and decide lol. But without any recon, a) looks kinda nice actually */}
      {product.stock.isAvailable && (
        <>
          <Grid item xs={12} sm={2}>
            <ProductQtySelect stock={product.stock} value={qty} onChange={handleQtyChange} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <AddToBagButton {...{ product, color, size, qty, setErr }} />
          </Grid>
        </>
      )}
      {/* 🚧 👇 lol */}
      <Grid item xs={12} sm={product.stock.isAvailable ? 10 : 12}>
        <SaveButton product={product} />
      </Grid>
    </Grid>
  )
}

const ProductQtySelect = ({ stock, ...props }) => {
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

const AddToBagButton = ({ product, color, size, qty, setErr }) => {
  const bag = useBag()
  const snackbar = useSnackbar()

  const [isAdding, setIsAdding] = useState(false)

  const handleAddToBagClick = async () => {
    if (!color) setErr('color')
    if (!size) setErr('size')

    if (color && size) {
      setIsAdding(true)
      await wait(1)
      bag.addLineItem({ product, color, size, qty })
      snackbar.success({ type: 'add', message: 'Added to Bag!' })
      setIsAdding(false)
    }
  }

  return (
    <LoadingButton
      variant="contained"
      color="secondary" // 🚧 - should be "primary" really, no?
      isLoading={isAdding}
      onClick={handleAddToBagClick}
      children="Add to Bag"
      endIcon={<EmptyBagIcon />}
      fullWidth
      sx={{ py: '13.5px' }} // ❗🐱‍💻, but to match <Select>
    />
  )
}

const SaveButton = ({ product }) => {
  const wishList = useWishList()
  const snackbar = useSnackbar()

  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 🚧
  useEffectOnMount(() => {
    setIsSaved(
      JSON.parse(localStorage.getItem('saved-items'))?.some((item) => item.name === product.name)
    )
  })

  const toggleSave = async () => {
    setIsSaving(true)
    await wait(2)
    !isSaved ? wishList.addSavedItem(product) : wishList.removeSavedItem(product.name)
    !isSaved && snackbar.success({ type: 'save', message: 'Saved to Wish List' })
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
      sx={{ py: '13.5px' }} // ❗🐱‍💻, but to match <Select>
    />
  )
}

const FreeShippingAlert = () => {
  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      columnGap={2}
      bgcolor="primary.touch"
      py={1}
      pl={2}
      pr={1} // 🚧 - since <IconButton> already has padding applied
      borderRadius={1} // use paper/card instead?
      color="primary.dark">
      <ShippingIcon />
      <Typography
        variant="body2"
        children="Free standard shipping on orders over £50"
        flexGrow={1}
      />
      <IconButton
        children={<InformationIcon />}
        onClick={() => {}} // see M&S - open modal displaying shipping data
      />
    </Grid>
  )
}
