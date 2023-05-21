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
  ShoppingBagIcon,
  ClockIcon,
  ValidateIcon,
  HeartIconOutlined,
  Select,
  IconTypography,
} from '@/components'
import { FooterPaymentMethods } from '@/components-layout/Footer/FooterPaymentMethods'
import { NAMES } from '@/constants'
import { useStore } from '@/context/global-context'
import { bagProducts } from '@/data'
import { isVPMaxSm } from '@/theming'

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
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

// inspired by M&S shopping bag. Still more to copy: https://www.marksandspencer.com/webapp/wcs/stores/servlet/OrderCalculate?calculationUsageIdentifier=MSBasketView_ShoppingCartURL&calculationUsageId=-1&updatePrices=1&catalogId=&errorViewName=AjaxOrderItemDisplayView&orderId=.&langId=-24&storeId=10151&doPrice=Y&URL=AjaxOrderItemDisplayView&intid=pdpnav_atb-ack-modal_checkout-button
export default function ShoppingBagPage() {
  const { bag } = useStore()

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
  const { bag } = useStore()

  const isMaxSm = useMediaQuery(isVPMaxSm)

  return (
    <Card elevation={isMaxSm ? 0 : 8} sx={{ p: { xs: 0, md: 2 } }}>
      <Grid container alignItems="center" spacing={spacing['items-summary']}>
        <Grid item xs={12} sm={7.5}>
          <IconTypography
            Icon={ShoppingBagIcon}
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
          if (item.stockCount >= item.quantity)
            return (
              <>
                <LineItem key={item.name} {...item} />
                {/* better way to do this 👇 - raw CSS with border-bottom on LineItem or use MUI's <List> or something which offers `divider` prop? */}
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
          if (item.stockCount < item.quantity)
            return (
              // done it this way because the customer may have quantity of 5 saved to basket, but now there might only be 4 available
              // so thus, customer should be able to adjust quantity
              // point is, stock issues means the inability to meet customer's original demand - not just "out of stock"
              // should add message saying "You wanted ${quantity} but there is now only ${stockCount}".
              <LineItem key={item.name} {...item} noCanDosVille />
            )
        })} */}
      </Grid>
    </Card>
  )
}

const LineItem = ({
  name,
  slug,
  price,
  quantity,
  stockCount,
  imageUrl,
  color = 'Navy',
  pSize = '2XL', // wouldn't work as `size`??
  noCanDosVille,
}) => {
  // previously included logic if "0" was selected to remove product from basket, but all the sites don't have it and just offer bespoke delete button
  const { bag } = useStore()

  const handleQtyChange = (e) => bag.updateLineItemQty(name, e.target.value)

  const hasStock = Boolean(stockCount)
  const hasLowStock = hasStock && stockCount < 10

  const handleRemoveClick = () => bag.removeLineItem(name)

  return (
    <Grid container spacing={spacing['items-summary']}>
      <Grid item xs={3} sm={2.5}>
        <Img
          src={imageUrl}
          sx={{
            width: '100%',
            aspectRatio: '4/5', // for electronics/music 1:1 better, but clothing should probs have more height than width
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      </Grid>
      <Grid item xs={6.5} sm={5}>
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
                {pSize}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<HeartIconOutlined />}
                children="Save"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveClick}
                children="Remove"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2.5} sm={4.5} alignSelf="flex-start">
        <Grid
          container
          alignItems="center"
          rowSpacing={2} // for when it wraps on xs
        >
          <Grid item xs={12} sm={4}>
            <MoneyTypography children={price} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              size="small"
              label="Qty"
              defaultValue={quantity}
              onChange={handleQtyChange}
              required={false}
              fullWidth={false}
              disabled={noCanDosVille} // something like this
            >
              {[...Array(stockCount > 9 ? 9 : stockCount).keys()].map((index) => (
                <MenuItem key={index} value={index + 1} children={index + 1} /> // netter way to do this lol?
              ))}
            </Select>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', sm: 'initial' } }} sm={4}>
            <MoneyTypography
              children={price * quantity}
              fontWeight={500}
              sx={{
                textDecoration: noCanDosVille && 'line-through', // JFN
                color: noCanDosVille && 'text.disabled', // JFN
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const PaymentSummary = () => {
  const { bag } = useStore()

  const isMaxSm = useMediaQuery(isVPMaxSm)

  const subtotal = bag.items.reduce((acca, item) => {
    if (item.stockCount) acca += item.price * item.quantity
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
