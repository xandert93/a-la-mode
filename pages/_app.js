import { Link } from '@/components'
import { FooterAccordion, FooterLinks, Header } from '@/components-layout'
import { companyName } from '@/constants'

import { isVPXs, theme } from '@/theme'
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
  useMediaQuery,
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
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

const PromotionBanner_old = () => {
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
          <FooterLinks title="Customer Care" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FooterLinks title="Corporate" />
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
      <Typography variant="h6" children="Our Mission" />
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis labore quaerat, quisquam
        unde iure aut recusandae accusantium deserunt quo, voluptates laborum debitis est eius
        soluta, rerum quod a veritatis molestias.
      </Typography>
    </>
  )
}

/*
🔥 1) <ListItem> wrapper effectively adds { padding: '4px 0px'} to <li> and some other neglible stuff (inspect DevTools if need be)
*/

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
