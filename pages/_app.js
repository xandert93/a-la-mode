import { EmailIcon, LocationIcon, TelephoneIcon } from '@/components'
import { FooterLinks, Header } from '@/components-layout'
import { NAMES } from '@/constants'
import { paymentMethods } from '@/data'

import { theme } from '@/theme'
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
        <title children={NAMES.COMPANY} />
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
// I don't need to specify the `xs`, `sm` prop each time if they are the same, but just makes it easier to understand/picture
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
        <Grid item container direction="column" alignItems="center" gap={1.5}>
          <FooterPaymentMethods />
        </Grid>
      </Grid>
    </Container>
  )
}

const FooterAbout = () => {
  return (
    <>
      <Typography variant="h6" children="Our Story" gutterBottom />
      <Typography paragraph>
        Since our establishment in 1943, we are just as passionate today as we were 80 years ago.
      </Typography>
      <Typography>
        Since the first store opened on the Champs Élysées, we have received numerous awards for our
        superior quality, attention to detail and exquisite craftsmanship.
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
          <ListItemIcon children={<LocationIcon />} />
          <ListItemText primary="60 Av. Montaigne, 75008 Paris" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<TelephoneIcon />} />
          <ListItemText primary="+33 1 56 69 80 80" />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<EmailIcon />} />
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
        variant="body2"
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
