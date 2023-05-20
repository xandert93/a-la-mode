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
  ApproveIcon,
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
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ShoppingBagPage() {
  const [products, setProducts] = useState(bagProducts)
  const hasProducts = Boolean(products.length)

  const deleteProduct = (name) => () => {
    setProducts((prev) => prev.filter((prod) => prod.name !== name))
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
              <ProductsSummary products={products} deleteProduct={deleteProduct} />
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

const ProductsSummary = ({ products, deleteProduct }) => {
  const isXs = useMediaQuery(isVPXs)
  const productCount = products.length

  return (
    <Card elevation={isXs ? 0 : 8} sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography paragraph component="h2" variant="h6" children={`My Bag (${productCount})`} />
      <Grid container direction="column" rowGap={2}>
        {products.map((prod) => (
          <BagProduct key={prod.name} {...prod} deleteProduct={deleteProduct} />
        ))}
      </Grid>
    </Card>
  )
}

const BagProduct = ({ name, slug, price, quantity, imageUrl, deleteProduct }) => {
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
          <Typography children={`Quantity: ${quantity}`} />
          <IconButton onClick={deleteProduct(name)} children={<DeleteIcon />} />
        </Grid>
      </Grid>
    </Paper>
  )
}

const PaymentSummary = ({ products }) => {
  const isXs = useMediaQuery(isVPXs)

  const subtotal = products.reduce((acca, prod) => acca + prod.price * prod.quantity, 0).toFixed(2)

  const freeDeliveryOffset = 5000 - subtotal
  const hasFreeDelivery = freeDeliveryOffset <= 0

  const deliveryCost = hasFreeDelivery ? 0 : 499

  const total = subtotal + deliveryCost

  return (
    <Card elevation={isXs ? 0 : 8} sx={{ p: { xs: 1, sm: 3 } }}>
      <Grid container direction="column" rowGap={3}>
        <Grid container direction="column" rowGap={2}>
          <Typography component="h2" variant="h6" children="Summary" />
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
              to qualify for FREE Standard Delivery to UK.
            </Typography>
            <IconButton
              children={<InformationIcon />}
              onClick // see M&S - open modal displaying shipping data
            />
          </Grid>
        )}
        <VoucherCodeAccordion />
        <FooterPaymentMethods />
        <Box>
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            children="Prices and delivery costs are not confirmed until you've reached the checkout."
            paragraph
          />
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            children="28 days withdrawal and free returns. Read more about return and refund policy."
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

const VoucherCodeAccordion = () => {
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
        <Button
          type="submit"
          children={
            <ApproveIcon
              sx={{
                fontSize: 14, // anything else too big. Decrease padding on button if required
              }}
            />
          }
          disableElevation
        />
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

/*


      <FooterPaymentMethods />

      <Typography
        variant="caption"
        component="p"
        color="text.secondary"
        children="Prices and delivery costs are not confirmed until you've reached the checkout."
      />
      <Typography
        variant="caption"
        component="p"
        color="text.secondary"
        children="28 days withdrawal and free returns. Read more about return and refund policy."
      />
*/
