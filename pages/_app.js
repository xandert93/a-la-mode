import { Link } from '@/components'
import { TopNavigation } from '@/components-layout'
import { companyName } from '@/constants'

import { theme } from '@/theme'
import { Email, Phone, Place } from '@mui/icons-material'
import {
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  List,
  ListItem,
  Container,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title children={companyName} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <PromotionBanner /> */}
        <TopNavigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

const PromotionBanner = () => {
  return (
    <Grid
      container
      sx={{
        p: 1,
        backgroundColor: 'gold',
        color: 'common.black',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontWeight: 'bold' }}>Free Express Delivery!</Typography>
        <Typography variant="body2" children={"Use code: 'SMOOTHDEL' at checkout"} />
      </Grid>
      <Grid item sm={6} md={4} sx={{ display: { xs: 'none', sm: 'initial' } }}>
        <Typography sx={{ fontWeight: 'bold' }}>Calling All Students</Typography>
        <Typography variant="body2" children="Get 20% Off" />
      </Grid>
      <Grid item md={4} sx={{ display: { xs: 'none', md: 'initial' } }}>
        <Typography sx={{ fontWeight: 'bold' }}>Stuck for ideas?</Typography>
        <Typography variant="body2">Shop our E-Gift Card Now</Typography>
      </Grid>
    </Grid>
  )
}

const paymentMethods = [
  'mastercard',
  'visa',
  'amex',
  'google-pay',
  'apple-pay',
  'paypal',
  'stripe',
  'klarna',
]

const Footer = () => {
  return (
    <Container component="footer">
      <Grid container columnSpacing={{ lg: 8 }} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <FooterAbout />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FooterCustomerHelp />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FooterCustomerHelp />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <FooterContact />
        </Grid>
        <Grid item container direction="column" alignItems="center" sx={{ gap: 1.5 }}>
          <FooterPaymentMethods />
        </Grid>
      </Grid>
    </Container>
  )
}

const FooterAbout = () => {
  return (
    <>
      <Typography variant="h6" children="Our Mission at á la mode" />
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis labore quaerat, quisquam
        unde iure aut recusandae accusantium deserunt quo, voluptates laborum debitis est eius
        soluta, rerum quod a veritatis molestias.
      </Typography>
    </>
  )
}

const FooterCustomerHelp = () => {
  return (
    <>
      <Typography variant="h6" component="h4" children="Customer Care" />
      <nav>
        <List dense disablePadding>
          <ListItem>
            <Link href="/" children="Delivery & Returns" />
          </ListItem>
          <ListItem>
            <Link href="/" children="Track My Order" />
          </ListItem>
          <ListItem>
            <Link href="/" children="Sustainability" />
          </ListItem>
          <ListItem>
            <Link href="/" children="Accessibility" />
          </ListItem>
          <ListItem>
            <Link href="/" children="Terms & Conditions" />
          </ListItem>
        </List>
      </nav>
    </>
  )
}

const FooterContact = () => {
  return (
    <>
      <Typography variant="h6">Contact Us</Typography>
      <List disablePadding>
        <ListItem>
          <ListItemIcon children={<Place />} />
          <ListItemText primary="60 Av. Montaigne, 75008 Paris" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<Phone />} />
          <ListItemText primary="+33 1 56 69 80 80" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<Email />} />
          <ListItemText primary="support@alamode.fr" />
        </ListItem>
      </List>
    </>
  )
}

const FooterPaymentMethods = () => {
  return (
    <>
      <Typography
        color="text.secondary"
        align="center"
        children="We accept the following payment methods:"
      />
      <PaymentMethodImages />
    </>
  )
}

const PaymentMethodImages = () => {
  return (
    <Grid container wrap="nowrap" sx={{ maxWidth: 400 }}>
      {paymentMethods.map((name) => (
        <Grid item key={name}>
          <img style={{ width: '100%' }} src={`/images/payment-methods/${name}.png`} />
        </Grid>
      ))}
    </Grid>
  )
}
