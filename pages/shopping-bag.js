import {
  Section,
  ArrowForwardIcon,
  Img,
  DeleteIcon,
  MoneyTypography,
  ReceiptIcon,
  HeartIconOutlined,
  Select,
  IconTypography,
  LoadingButton,
  HeartIcon,
  ShoppingBagIcon,
  Span,
  Main,
  CostRow,
  PaymentMethods,
  TextLink,
} from '@/components'
import {
  EmptyBagSection,
  FreeDeliveryAlert,
  PromotionCodeAccordion,
  ViewedProductsSection,
} from '@/components-page/shopping-bag'
import { NAMES } from '@/constants'
import { useBag, useWishList } from '@/context/global-context'
import { useSnackbar } from '@/context/snackbar-context'
import { useEffectOnMount } from '@/hooks'
import { wait } from '@/utils/helpers'

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  MenuItem,
  CircularProgress,
  alpha,
  Paper,
  Fade,
} from '@mui/material'
import Head from 'next/head'
import { forwardRef, useState } from 'react'

/* 

1) "A line item represents a line in an order, containing details such as the product, 
    quantity, and price for each line of an order"

2) For Qty <Select>, I previously included logic if "0" was selected to remove item from 
   bag, but all the sites don't have it and just offer a bespoke delete <button>. Fine by me!

*/

/*
🤔 
Also must consider a situation where a product's stock.count has decreased on database (courtesy 
of another client) while in the client's basket. 

When we fetch the client's basket, we therefore need to split line items whose stock demands cannot be 
met (e.g. user had 5 of ProductA in basket, but now only 4 are left) and show them to the client
so that they can either update their quantity demand or remove the product altogether (especially if
now out of stock).

For insufficient stock line items, we could do something like this: 

  lineItems.map(item => item.stock.count < item.qty && <BagLineItem {...item} insufficientStock/>)

Or even better, when we could get the server to do the splitting, so that it returns a basket of: 

  { lineItems: { valid: [ ... ], invalid: [ ... ] } }

And then we can just map through both sets on the FE.

🤔 
For now, using <BagItemLoadingOverlay> I'm blocking <BagLineItem> interaction when quantity being 
updated (via <Select> or <RemoveLineItemButton>) to prevent another request for a quantity update.
   
For example, if the client uses the <Select> to update the quantity, without blocking interaction,
during the request, client could then click <RemoveLineItemButton>, or vice versa.
    
This shouldn't be possible. Consider disabling both when `isUpdatingQty`. 
Find more robust solution later.

🤔
Reluctant to refactor and abstract, because a lot of this could go on orders page. Refactor once
orders page complete.

🤔
When checkout clicked, if not signed in, redirect to login and once logged in to checkout

*/

const styles = {
  main: {
    bgcolor: ({ palette }) => alpha(palette.primary.main, 0.15),
    p: { xs: 0, sm: 2 },
  },

  paper: {
    p: { xs: 2, sm: 3, md: 2.5 },
    borderRadius: { xs: 0, sm: 1 },
    boxShadow: 2,
  },

  'line-item-list-box': {
    mt: { xs: 0.25, sm: 1 },
  },

  lineItem: {
    paper: {
      position: 'relative',
      py: { xs: 3 }, // on xs, it's <button>s are a bit too close together. Extra vertical spacing ensures better mobile UX.
    },

    loadingOverlay: (theme) => ({
      ...theme.mixins.absCover,
      borderRadius: 1,
      bgcolor: ({ palette }) => alpha(palette.background.default, 0.7),
    }),

    loadingOverlayProgressBox: (theme) => theme.mixins.absCenter,

    image: {
      width: '100%',
      aspectRatio: '9/10', // for electronics/music 1:1 better, but clothing should probs have more height than width
      objectFit: 'cover',
      borderRadius: 1,
    },
  },

  paymentSummaryDivider: {
    borderColor: 'primary.main',
  },

  // special! - not following my usual convention. Has to be done this way (for now, until better solution found):
  demands: {
    headings: {
      display: { xs: 'none', sm: 'initial' },
    },
  },

  lineItems: {
    summary: {
      spacing: { xs: 1.5, sm: 2, md: 3 },
    },

    demands: {
      textAlign: 'right',
      columnSpacing: 3,
    },
  },
}

// inspired by M&S shopping bag. Still more to copy: https://www.marksandspencer.com/webapp/wcs/stores/servlet/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&calculationUsageId=-1&updatePrices=1&catalogId=&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView&intid=pdpnav_atb-ack-modal_checkout-button
export default function ShoppingBagPage() {
  const bag = useBag()

  return (
    <>
      <Head>
        <title children={`Your Bag | ${NAMES.COMPANY}`} />
      </Head>
      <Main sx={styles.main}>
        {bag.hasItems && <ShoppingBagSection />}
        {/* *** initial load bug 👇 because of LS check after mount. Once using SSR (and initial page has accurate DB data), hopefully no longer problem  */}
        <Fade
          in={!bag.hasItems}
          appear={false}
          unmountOnExit // temp
        >
          <EmptyBagSection />
        </Fade>
        {/* <ViewedProductsSection /> */}
      </Main>
    </>
  )
}

// Items that are saved to your Wish List are stored temporarily, with availability and pricing subject to change.

const ShoppingBagSection = () => {
  return (
    <Section maxWidth="lg" disableGutters>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" rowGap={{ xs: 0.25, sm: 1 }}>
            <FreeDeliveryAlert />

            <LineItemsSummaryHeader />
            <Grid container direction="column" rowGap={{ xs: 0.25, sm: 1 }}>
              <LineItemList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </Section>
  )
}

const LineItemsSummaryHeader = () => {
  return (
    <Paper sx={styles.paper}>
      <Grid container alignItems="center" spacing={styles.lineItems.summary.spacing}>
        <Grid item xs={12} sm={7.5}>
          <BagHeading />
        </Grid>
        <Grid item sm={4.5} sx={styles.demands.headings}>
          <DemandsHeadings />
        </Grid>
      </Grid>
    </Paper>
  )
}

const BagHeading = () => {
  const bag = useBag()

  return (
    <IconTypography Icon={ShoppingBagIcon} component="h2" variant="h6" color="text.tertiary">
      Your Bag <Span fontWeight={400}>({bag.itemCount})</Span>
    </IconTypography>
  )
}

const DemandsHeadings = () => {
  return (
    <Grid container justifyContent="flex-end" sx={styles.lineItems.demands}>
      <Grid item sm={4}>
        <Typography variant="body2" children="Quantity" fontWeight={500} />
      </Grid>
      <Grid item sm={4}>
        <Typography variant="body2" children="Subtotal" fontWeight={500} />
      </Grid>
    </Grid>
  )
}

const LineItemList = () => {
  const lineItems = useBag().items

  return lineItems.map((item) => <BagLineItem key={item.name} {...item} />)
}

// Later on, on orders page, we might have <OrderLineItem> (which won't include <Remove>, <Select>, <Availability> and will have <CancelButton> etc.). Hence <BagLineItem> here.
const BagLineItem = (lineItem) => {
  const {
    name,
    slug,
    price,
    stock,
    imageUrl,
    color,
    size,
    qty,
    hasInsufficientStock = false, // JFN, until we have DB set up
  } = lineItem

  // only need 1 piece of loading state for <Select> change or <RemoveLineItemButton> click, since with the <BagItemLoadingOverlay>, only 1 can happen at a time!
  const [isUpdatingQty, setIsUpdatingQty] = useState(false)

  return (
    <Paper component="article" sx={[styles.paper, styles.lineItem.paper]}>
      <Fade in={isUpdatingQty}>
        <BagItemLoadingOverlay />
      </Fade>
      <Grid container spacing={styles.lineItems.summary.spacing}>
        <Grid item xs={3} sm={2.5}>
          <LineItemImage src={imageUrl} />
        </Grid>
        <Grid item xs={6.5} sm={5}>
          <LineItemDetails {...{ name, slug, color, size, stock }} />
        </Grid>
        <Grid item xs={2.5} sm={4.5}>
          <LineItemDemands
            {...{
              name,
              price,
              stock,
              qty,
              isUpdatingQty,
              setIsUpdatingQty,
              hasInsufficientStock,
            }}
          />
        </Grid>

        <Grid
          item
          container
          // justifyContent="space-between" - gets in way of "subtotal" column, so...
          gap={1.5}>
          <RemoveLineItemButton {...{ name, setIsUpdatingQty }} />
          <SaveLineItemButton lineItem={lineItem} />
        </Grid>
      </Grid>
    </Paper>
  )
}

// JFN - very, very rough. Effect like this nice though!
const BagItemLoadingOverlay = forwardRef((props, ref) => {
  return (
    <Box ref={ref} sx={styles.lineItem.loadingOverlay} {...props}>
      <Box sx={styles.lineItem.loadingOverlayProgressBox}>
        <CircularProgress thickness={4} size={32} />
      </Box>
    </Box>
  )
})

const LineItemImage = (props) => {
  return <Img sx={styles.lineItem.image} {...props} />
}

const LineItemDetails = ({ name, slug, color, size, stock }) => {
  return (
    <Grid container direction="column" gap={{ xs: 1.5, lg: 2 }}>
      <TextLink href={'/' + slug} children={name} letterSpacing={-0.5} fontWeight={500} />
      <Grid container direction="column" rowGap={0.5} color="text.secondary">
        <Typography variant="body2" fontWeight={500}>
          Color: <Span children={color} fontWeight={400} />
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          Size: <Span children={size} fontWeight={400} />
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          Availability:{' '}
          <Span
            color={stock.isLow ? 'red' : 'success.main'}
            children={stock.isLow ? `only ${stock.count} left` : 'in stock ✔'}
            fontWeight={stock.isLow ? 500 : 400}
          />
        </Typography>
      </Grid>
    </Grid>
  )
}

const LineItemDemands = ({
  name,
  price,
  stock,
  qty: initialQty,
  isUpdatingQty,
  setIsUpdatingQty,
  hasInsufficientStock,
}) => {
  const bag = useBag()

  const [qty, setQty] = useState(initialQty)

  const handleQtyChange = async (e) => {
    setIsUpdatingQty(true)
    await wait(3)
    setQty(e.target.value)
    bag.updateLineItemQty(name, e.target.value)
    setIsUpdatingQty(false)
  }

  return (
    <Grid
      container
      alignItems="center"
      rowSpacing={2} // for when it wraps on xs
      sx={styles.lineItems.demands}>
      <Grid item sx={styles.demands.headings} sm={4}>
        <MoneyTypography variant="body2" children={price} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          size="small"
          label="Qty"
          value={qty}
          onChange={handleQtyChange}
          required={false}
          fullWidth={false}
          disabled={isUpdatingQty || hasInsufficientStock} // something like this, but obviously not ideal
        >
          {[...Array(stock.count > 9 ? 9 : stock.count).keys()].map((index) => (
            <MenuItem key={index} value={index + 1} children={index + 1} /> // better way to do this lol?
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        <MoneyTypography
          variant="body2"
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
    !isSaved && snackbar.success({ type: 'save', message: 'Saved to Wish List' })
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
    await wait(3)
    bag.removeLineItem(name)
    setIsUpdatingQty(false)
  }

  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={handleClick}
      children="Remove"
      sx={{ minWidth: '13ch' }} // JFN, but I want same width on both
    />
  )
}

const PaymentSummary = () => {
  const { costs } = useBag()

  return (
    <Paper sx={styles.paper}>
      <Grid container direction="column" rowGap={3}>
        <Grid container direction="column" rowGap={2}>
          <IconTypography
            component="h2"
            variant="h6"
            color="text.tertiary"
            children="Summary"
            Icon={ReceiptIcon}
          />
          <Divider sx={styles.paymentSummaryDivider} />
          <Grid container direction="column" rowGap={0.5}>
            <CostRow variant="body2" title="Subtotal" amount={costs.subtotal} />
            <CostRow
              variant="body2"
              title={`Delivery ${costs.delivery === 0 ? '(Free)' : ''}`}
              amount={costs.delivery}
            />
            <CostRow variant="body2" title="Tax" amount={costs.tax} />
          </Grid>
          <Divider sx={styles.paymentSummaryDivider} />
          <CostRow title="Total" amount={costs.total} fontWeight={500} />
          <Button
            size="large"
            children="Checkout Now"
            endIcon={<ArrowForwardIcon />}
            // should be disabled when ANY `isUpdatingQty === true`. But interesting case...best way to disable a single button based on any `isUpdatingQty` being true? 🤔
          />
        </Grid>
        <PromotionCodeAccordion />
        <PaymentMethods />
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
    </Paper>
  )
}
