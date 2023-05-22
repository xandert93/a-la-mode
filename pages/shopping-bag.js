import {
  Section,
  Accordion,
  Form,
  DeliveryIcon,
  InformationIcon,
  ArrowForwardIcon,
  Img,
  DeleteIcon,
  MoneyTypography,
  ReceiptIcon,
  ShoppingBagIconOutlined,
  ClockIcon,
  ValidateIcon,
  HeartIconOutlined,
  Select,
  IconTypography,
  LoadingButton,
  HeartIcon,
} from '@/components'
import { FooterPaymentMethods } from '@/components-layout/Footer/FooterPaymentMethods'
import { NAMES } from '@/constants'
import { useBag, useWishList } from '@/context/global-context'
import { useSnackbar } from '@/context/snackbar-context'
import { useEffectOnMount } from '@/hooks'
import { isVPMaxSm } from '@/theming'
import { wait } from '@/utils/helpers'

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  IconButton,
  Card,
  useMediaQuery,
  accordionSummaryClasses,
  MenuItem,
  CircularProgress,
  alpha,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

// inspired by M&S shopping bag. Still more to copy: https://www.marksandspencer.com/webapp/wcs/stores/servlet/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&calculationUsageId=-1&updatePrices=1&catalogId=&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView&intid=pdpnav_atb-ack-modal_checkout-button
export default function ShoppingBagPage() {
  const bag = useBag()

  const hasLineItems = Boolean(bag.itemCount)

  return (
    <>
      <Head>
        <title children={`Shopping Bag | ${NAMES.COMPANY}`} />
      </Head>

      {hasLineItems ? (
        <Section maxWidth="lg" sx={{ pt: 2 }}>
          <Grid container spacing={{ xs: 4, md: 2 }}>
            <Grid item xs={12} md={8}>
              <LineItemsSummary />
            </Grid>
            <Grid item xs={12} md={4}>
              <PaymentSummary />
            </Grid>
          </Grid>
        </Section>
      ) : (
        'Empty bag bitch'
      )}
    </>
  )
}

const spacing = {
  'items-summary': { xs: 1.5, sm: 2, md: 3 },
}

const LineItemsSummary = () => {
  const bag = useBag()

  const isMaxSm = useMediaQuery(isVPMaxSm)

  return (
    <Card elevation={isMaxSm ? 0 : 8} sx={{ p: { xs: 0, md: 2 } }}>
      <Grid container alignItems="center" spacing={spacing['items-summary']}>
        <Grid item xs={12} sm={7.5}>
          <IconTypography
            Icon={ShoppingBagIconOutlined}
            component="h2"
            variant="h6"
            children={`My Bag (${bag.itemCount})`}
          />
        </Grid>
        <Grid item sx={{ display: { xs: 'none', sm: 'initial' } }} sm={4.5}>
          <Grid container justifyContent="flex-end">
            <Grid item sm={4}>
              <Typography variant="body2" children="Quantity" />
            </Grid>
            <Grid item sm={4}>
              <Typography variant="body2" children="Subtotal" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" rowGap={4} mt={4}>
        {bag.items.map((item, index, self) => {
          if (item.stockCount >= item.qty)
            return (
              <>
                <BagLineItem key={item.name} {...item} />
                {/* better way to do this 👇 - raw CSS with border-bottom on BagLineItem or use MUI's <List> or something which offers `divider` prop? */}
                {index !== self.length - 1 && (
                  <Divider
                    sx={{
                      // border: '1px solid',
                      borderColor: 'primary.main', // horizontal <Divider> returns <hr>. 🔥 CSS border is used to style it: https://www.w3schools.com/howto/howto_css_style_hr.asp
                    }}
                  />
                )}
              </>
            )
        })}
        {/* 
        <Divider />
        Sorry, stock issues...removed from 📃 (will code later 👍):
        {bag.items.map((item) => {
          if (item.stockCount < item.qty)
            return (
              // done it this way because the customer may have quantity of 5 saved to basket, but now there might only be 4 available
              // so thus, customer should be able to adjust qty
              // point is, stock issues means the inability to meet customer's original demand - not just "out of stock"
              // should add message saying "You wanted ${qty} but there is now only ${stockCount}".
              <BagLineItem key={item.name} {...item} hasInsufficientStock />
            )
        })} */}
      </Grid>
    </Card>
  )
}

// A line item represents a line in an order, containing details such as the product, quantity, and price for each line of an order
// Later on, on orders page, we might have <OrderLineItem> (which won't include <Remove>, <Select>, <Hurry> and will have <Cancel> etc.). Hence <BagLineItem> here.
const BagLineItem = (lineItem) => {
  const {
    name,
    slug,
    price,
    stockCount, // *** I don't think this should be here - instead it should be fetched and then checked against maybe via a graphQL api that returns [{id: '...', quantity: ___}]
    imageUrl,
    color,
    size,
    qty,
    hasInsufficientStock,
  } = lineItem

  // previously included logic if "0" was selected to remove product from basket, but all the sites don't have it and just offer bespoke delete button

  const [isUpdatingQty, setIsUpdatingQty] = useState(false) // only need 1 piece of loading state for <Select> change or <RemoveItemButton> click, since with the <BlockingLoadingOverlay>, only 1 can happen at a time!

  // blocking <BagLineItem> when being removed, cos user could make request to update quantity during

  return (
    <Grid container spacing={spacing['items-summary']} sx={{ position: 'relative' }}>
      {isUpdatingQty && <BlockingLoadingOverlay />}
      <Grid item xs={3} sm={2.5}>
        <LineItemImage src={imageUrl} />
      </Grid>
      <Grid item xs={6.5} sm={5}>
        <LineItemDetails {...{ name, slug, color, size, stockCount }} />
      </Grid>
      <Grid item xs={2.5} sm={4.5} alignSelf="flex-start">
        <LineItemDemands
          {...{ price, stockCount, qty, isUpdatingQty, setIsUpdatingQty, hasInsufficientStock }}
        />
      </Grid>

      <Grid item container justifyContent="space-between">
        <SaveLineItemButton lineItem={lineItem} />
        <RemoveLineItemButton {...{ name, setIsUpdatingQty }} />
      </Grid>
    </Grid>
  )
}

const LineItemImage = (props) => {
  return (
    <Img
      sx={{
        width: '100%',
        aspectRatio: '4/5', // for electronics/music 1:1 better, but clothing should probs have more height than width
        objectFit: 'cover',
        borderRadius: 1,
      }}
      {...props}
    />
  )
}

const LineItemDetails = ({ name, slug, color, size, stockCount }) => {
  const hasStock = Boolean(stockCount)
  const hasLowStock = hasStock && stockCount < 10

  return (
    <Grid container direction="column" gap={{ xs: 1.5, sm: 2, md: 2.5 }}>
      <Typography
        children={name}
        letterSpacing={-0.5}
        fontWeight={500}
        component={Link}
        href={'/' + slug}
      />
      <Grid container direction="column" rowGap={0.5}>
        <Typography variant="body2" fontWeight={500}>
          Color:{' '}
          <Typography variant="body2" component="span">
            {color}
          </Typography>
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          Size:{' '}
          <Typography variant="body2" component="span">
            {size}
          </Typography>
        </Typography>
      </Grid>
      {hasLowStock && (
        <IconTypography
          Icon={ClockIcon}
          color="red"
          children={`Hurry! Only ${stockCount} left`}
          letterSpacing={-0.5}
          fontWeight={500}
        />
      )}
    </Grid>
  )
}

const LineItemDemands = ({
  price,
  stockCount,
  qty: initialQty,
  isUpdatingQty,
  setIsUpdatingQty,
  hasInsufficientStock,
}) => {
  const bag = useBag()

  const [qty, setQty] = useState(initialQty)

  const handleQtyChange = async (e) => {
    setIsUpdatingQty(true)
    await wait(2)
    setQty(e.target.value)
    bag.updateLineItemQty(name, e.target.value)
    setIsUpdatingQty(false)
  }

  return (
    <Grid
      container
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      rowSpacing={2} // for when it wraps on xs
    >
      <Grid item sx={{ display: { xs: 'none', sm: 'initial' } }} sm={4}>
        <MoneyTypography children={price} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          size="small"
          label="Qty"
          value={qty}
          onChange={handleQtyChange}
          required={false}
          fullWidth={false}
          disabled={isUpdatingQty || hasInsufficientStock} // something like this, but obvs not ideal
        >
          {[...Array(stockCount > 9 ? 9 : stockCount).keys()].map((index) => (
            <MenuItem key={index} value={index + 1} children={index + 1} /> // netter way to do this lol?
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        <MoneyTypography
          children={price * qty}
          fontWeight={500}
          sx={{
            textDecoration: hasInsufficientStock && 'line-through', // JFN
            color: hasInsufficientStock && 'text.disabled', // JFN
          }}
        />
      </Grid>
    </Grid>
  )
}

const SaveLineItemButton = ({ lineItem }) => {
  const wishList = useWishList()
  const snackbar = useSnackbar()

  const [isSaved, setIsSaved] = useState(lineItem.isSaved)
  const [isSaving, setIsSaving] = useState(false)

  // JFN
  useEffectOnMount(() => {
    setIsSaved(
      JSON.parse(localStorage.getItem('saved-items'))?.some((item) => item.name === lineItem.name)
    )
  })

  const handleSaveClick = async () => {
    setIsSaving(true)
    await wait(1.5)
    !isSaved ? wishList.addSavedItemFromBag(lineItem) : wishList.removeSavedItem(lineItem.name)
    setIsSaved((prev) => !prev)
    snackbar.success('Saved ♥')
    setIsSaving(false)
  }

  return (
    <LoadingButton
      // since there are quite a few "save" buttons around app, could make single component. but gonna refrain #RootOfAllEvil
      variant="outlined"
      startIcon={!isSaved ? <HeartIconOutlined /> : <HeartIcon />}
      onClick={handleSaveClick}
      isLoading={isSaving}
      children={!isSaved ? 'Save' : 'Saved'}
      sx={{ minWidth: '13ch' }} // JFN, but I want same width on both
    />
  )
}

const RemoveLineItemButton = ({ name, setIsUpdatingQty }) => {
  const bag = useBag()

  // probably should have confirmation modal cos of a) accidental click and b) make customer rethink (⬆ conversion)
  const handleClick = async () => {
    setIsUpdatingQty(true)
    await wait(1.5)
    bag.removeLineItem(name)
    setIsUpdatingQty(false)
  }

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={handleClick}
      children="Remove"
      sx={{ minWidth: '13ch' }} // JFN, but I want same width on both
    />
  )
}

const BlockingLoadingOverlay = () => {
  // JFN - very, very rough. Effect like this not bad.
  return (
    <Box
      ml={{ xs: 1, md: 3 }} // just to accommodate for my crappy grid config
      sx={(theme) => ({
        ...theme.mixins.absCover,
        borderRadius: 1,
        bgcolor: ({ palette }) => alpha(palette.background.default, 0.7),
      })}>
      <Box sx={(theme) => theme.mixins.absCenter}>
        <CircularProgress thickness={4} size={32} />
      </Box>
    </Box>
  )
}

const PaymentSummary = () => {
  const bag = useBag()

  const isMaxSm = useMediaQuery(isVPMaxSm)

  const subtotal = bag.items.reduce((acca, item) => {
    if (item.stockCount) acca += item.price * item.qty
    return acca
  }, 0)

  const freeDeliveryOffset = 5000 - subtotal
  const hasFreeDelivery = freeDeliveryOffset <= 0

  const deliveryCost = hasFreeDelivery ? 0 : 499

  const total = subtotal + deliveryCost

  return (
    <Card elevation={isMaxSm ? 0 : 8} sx={{ p: { xs: 1, md: 3 } }}>
      <Grid container direction="column" rowGap={3}>
        <Grid container direction="column" rowGap={2}>
          <IconTypography component="h2" variant="h6" children="Summary" Icon={ReceiptIcon} />
          <Divider
            sx={{
              borderColor: 'primary.main', // horizontal <Divider> returns <hr>. 🔥 CSS border is used to style it: https://www.w3schools.com/howto/howto_css_style_hr.asp
            }}
          />
          <Grid container direction="column" rowGap={0.5}>
            <CostRow title="Subtotal" amount={subtotal} />
            <CostRow
              title={`Delivery ${hasFreeDelivery ? '(Free)' : ''}`}
              amount={hasFreeDelivery ? 0 : 499}
            />
          </Grid>
          <Divider
            sx={{
              borderColor: 'primary.main', // horizontal <Divider> returns <hr>. 🔥 CSS border is used to style it: https://www.w3schools.com/howto/howto_css_style_hr.asp
            }}
          />
          <CostRow title="Total" amount={total} fontWeight={500} />
          <Button children="Checkout Now" endIcon={<ArrowForwardIcon />} />
        </Grid>
        {!hasFreeDelivery && (
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
              // add "< Continue Shopping" button around here

              flexGrow={1}>
              Can we tempt you? Spend another{' '}
              <MoneyTypography variant="inherit" component="span" children={freeDeliveryOffset} />{' '}
              to qualify for FREE Standard Delivery.
            </Typography>
            <IconButton
              children={<InformationIcon />}
              // see M&S - open modal displaying shipping data
            />
          </Grid>
        )}
        <DiscountCodeAccordion />
        <FooterPaymentMethods />
        <Box>
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            children="Prices and delivery costs are only confirmed at checkout."
            paragraph
          />
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            children="28 days free returns. Read more about return and refund policy."
          />
        </Box>
      </Grid>
    </Card>
  )
}

const styles = {
  '&:before': {
    display: 'none', // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
  },

  [`& .${accordionSummaryClasses.content}`]: {
    justifyContent: 'center', // center title
  },
}

accordionSummaryClasses

const DiscountCodeAccordion = () => {
  const handleSubmit = (e) => {
    alert('Voucher code submitted')
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      title={
        <Typography variant="body2" color="primary.dark" children="Do you have a voucher code?" />
      }
      sx={styles}>
      <Grid
        pt={2}
        container
        wrap="nowrap"
        alignItems="cent"
        columnGap={1}
        component={Form}
        onSubmit={handleSubmit}>
        <TextField label="Code" size="small" />
        <Button type="submit" children={<ValidateIcon />} disableElevation sx={{ p: 0 }} />
      </Grid>
    </Accordion>
  )
}

// Did see some website use HTML tables e.g. <td>, <tr>, <th> etc. Checked MUI's tables and just seemed like a lot of boilerplate for this table's needs
const CostRow = ({ title, amount, ...props }) => {
  return (
    <Typography {...props} component={Grid} container justifyContent="space-between">
      <Typography component="span" variant="inherit" children={title} />
      <MoneyTypography component="span" variant="inherit" children={amount} />
    </Typography>
  )
}

// when checkout clicked, if not signed in, redirect to login and once logged in to checkout
