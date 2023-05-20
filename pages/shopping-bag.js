import {
  Section,
  Accordion,
  Form,
  DeliveryIcon,
  InformationIcon,
  ArrowForwardIcon,
  Img,
  TextLink,
  DeleteIcon,
  MoneyTypography,
  ReceiptIcon,
  ShoppingBagIcon,
  ClockIcon,
  ValidateIcon,
  HeartIconOutlined,
  Select,
} from '@/components'
import { FooterPaymentMethods } from '@/components-layout/Footer/FooterPaymentMethods'
import { NAMES } from '@/constants'
import { bagProducts } from '@/data'
import { isVPXs } from '@/theming'

import {
  Box,
  Button,
  Paper,
  Divider,
  Grid,
  Typography,
  TextField,
  IconButton,
  Card,
  useMediaQuery,
  accordionSummaryClasses,
  MenuItem,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ShoppingBagPage() {
  const [products, setProducts] = useState(bagProducts)
  const hasProducts = Boolean(products.length)

  const removeProduct = (name) => () => {
    setProducts((prev) => prev.filter((prod) => prod.name !== name))
  }

  const setProductQty = (name, newQty) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.name !== name) return prod
        else return { ...prod, quantity: newQty }
      })
    )
  }

  return (
    <>
      <Head>
        <title children={`Shopping Bag | ${NAMES.COMPANY}`} />
      </Head>

      {hasProducts ? (
        <Section maxWidth="lg" sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <ProductsSummary {...{ products, removeProduct, setProductQty }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaymentSummary products={products} />
            </Grid>
          </Grid>
        </Section>
      ) : (
        'Empty bag bitch'
      )}
    </>
  )
}

const ProductsSummary = ({ products, removeProduct, setProductQty }) => {
  const isXs = useMediaQuery(isVPXs)
  const productCount = products.length

  return (
    <Card elevation={isXs ? 0 : 8} sx={{ p: { xs: 1, sm: 3 } }}>
      <Grid container rowGap={2}>
        <IconTypography
          Icon={ShoppingBagIcon}
          component="h2"
          variant="h6"
          children={`My Bag (${productCount})`}
        />

        <Grid container direction="column" rowGap={2}>
          {products.map((prod) => {
            if (prod.stockCount >= prod.quantity)
              return (
                <BagProduct
                  key={prod.name}
                  {...prod}
                  removeProduct={removeProduct}
                  setProductQty={setProductQty}
                />
              )
          })}
          <Divider />
          Sorry, stock issues:
          {products.map((prod) => {
            if (prod.stockCount < prod.quantity)
              return (
                // done it this way because the customer may have quantity of 5 saved to basket, but now there might only be 4 available
                // so thus, customer should be able to adjust quantity
                // point is, stock issues means the inability to meet customer's original demand - not just "out of stock"
                // should add message saying "You wanted ${quantity} but there is now only ${stockCount}".
                <BagProduct
                  key={prod.name}
                  {...prod}
                  removeProduct={removeProduct}
                  setProductQty={setProductQty}
                />
              )
          })}
        </Grid>
      </Grid>
    </Card>
  )
}

const BagProduct = ({
  name,
  slug,
  price,
  quantity,
  stockCount,
  imageUrl,
  removeProduct,
  setProductQty,
}) => {
  // previously included logic if "0" was selected to remove product from basket, but all the sites don't have it and just offer bespoke delete button
  const handleQtyChange = (e) => setProductQty(name, e.target.value)

  const hasStock = Boolean(stockCount)
  const hasLowStock = hasStock && stockCount < 10

  return (
    <Paper square>
      <Grid container p={1} columnSpacing={3}>
        <Grid item xs={3} borderRadius={1} overflow="hidden">
          <Img src={imageUrl} width="100%" sx={{ aspectRatio: '1/1', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            wrap="nowrap" // JFN/keep?
            justifyContent="space-between"
            alignItems="center" // JFN (doesn't look great)
          >
            <Link href={'/' + slug} children={name} />
            <MoneyTypography children={price} />
          </Grid>
          <IconButton onClick={removeProduct(name)} children={<DeleteIcon />} />
          <IconButton children={<HeartIconOutlined />} />
          {!hasStock && <Typography children="Sorry, this product is now out of stock" />}
          {hasLowStock && (
            <IconTypography Icon={ClockIcon} color="red" children={`Only ${stockCount} left`} />
          )}
          {hasStock && (
            <Select
              label="Qty"
              required={false}
              defaultValue={quantity}
              disabled={!stockCount}
              // value = ... add state
              onChange={handleQtyChange}>
              {[...Array(stockCount > 9 ? 9 : stockCount).keys()].map((index) => (
                <MenuItem key={index} value={index + 1} children={index + 1} /> // netter way to do this lol?
              ))}
            </Select>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

const IconTypography = ({ Icon, ...props }) => {
  return (
    <Grid container wrap="nowrap" alignItems="center" columnGap={1}>
      <Icon />
      <Typography {...props} />
    </Grid>
  )
}

const PaymentSummary = ({ products }) => {
  const isXs = useMediaQuery(isVPXs)

  const subtotal = products.reduce((acca, prod) => {
    if (prod.stockCount) acca += prod.price * prod.quantity
    return acca
  }, 0)

  const freeDeliveryOffset = 5000 - subtotal
  const hasFreeDelivery = freeDeliveryOffset <= 0

  const deliveryCost = hasFreeDelivery ? 0 : 499

  const total = subtotal + deliveryCost

  return (
    <Card elevation={isXs ? 0 : 8} sx={{ p: { xs: 1, sm: 3 } }}>
      <Grid container direction="column" rowGap={3}>
        <Grid container direction="column" rowGap={2}>
          <IconTypography Icon={ReceiptIcon} component="h2" variant="h6" children="Summary" />
          <Divider />
          <Grid container direction="column" rowGap={0.5}>
            <CostRow variant="body2" title="Subtotal" amount={subtotal} />
            <CostRow
              variant="body2"
              title={`Delivery ${hasFreeDelivery ? '(Free)' : ''}`}
              amount={hasFreeDelivery ? 0 : 499}
            />
          </Grid>
          <Divider />
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
