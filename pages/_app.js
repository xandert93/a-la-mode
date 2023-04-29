import { Link } from '@/components'
import { PATHS } from '@/constants'
import { isVPXs, theme } from '@/theme'
import {
  Email,
  Facebook,
  Favorite,
  Instagram,
  LocationCity,
  LocationOn,
  Phone,
  Place,
  ShoppingBag,
  Twitter,
  YouTube,
} from '@mui/icons-material'
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  Container,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title children="á la mode" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PromotionBanner />
        <TopNavigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

const TopNavigation = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justifyContent="center" alignItems="center">
          {/* <Grid item xs={4}>
            <input placeholder="search" />
          </Grid> */}
          <Grid item xs={4}>
            <TopNavigationHeading />
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end" component="nav" sx={{ gap: 1 }}>
            <TopNavigationActions />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const TopNavigationHeading = () => {
  const router = useRouter()

  const handleClick = () => router.push(PATHS.HOME)

  return (
    <Typography
      variant="h4"
      component="h1"
      children="á la mode"
      align="center"
      onClick={handleClick}
      sx={{ letterSpacing: { xs: 1, md: 3 } }}
    />
  )
}

const TopNavigationActions = () => {
  return (
    <>
      <Button component={Link} href="#" children="Register" />
      <Button component={Link} href="#" children=" Sign In" />
      <IconButton component={Link} href={PATHS.WISHLIST} children={<Favorite />} />
      <IconButton children={<ShoppingBag />} />
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
        <Typography variant="body2">Use code: "SMOOTHDEL" at checkout</Typography>
      </Grid>
      <Grid item sm={6} md={4} sx={{ display: { xs: 'none', sm: 'initial' } }}>
        <Typography sx={{ fontWeight: 'bold' }}>Calling All Students</Typography>
        <Typography variant="body2">Get 20% Off</Typography>
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
          <img
            style={{ display: 'block', width: '100%' }}
            src={`/images/payment-methods/${name}.png`}
          />
        </Grid>
      ))}
    </Grid>
  )
}
