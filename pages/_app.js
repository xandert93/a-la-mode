import { PATHS } from '@/constants'
import { isVPXs, theme } from '@/theme'
import { Favorite, LocationCity, ShoppingBag } from '@mui/icons-material'
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
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title children="á la mode" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopNavigation />
        <PromotionBanner />
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
          <Grid item xs={4}>
            <input placeholder="search" />
          </Grid>
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
    <Grid container component="footer" spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6">á la mode</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis labore quaerat, quisquam
          unde iure aut recusandae accusantium deserunt quo, voluptates laborum debitis est eius
          soluta, rerum quod a veritatis molestias.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6">Customer Care</Typography>
        <Typography>Delivery & Returns</Typography>
        <Typography>Track My Order</Typography>
        <Typography>Sustainability</Typography>
        <Typography>Accessibility</Typography>
        <Typography>Terms & Conditions</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">Get in Touch</Typography>
        <LocationCity />
        <Typography children="07516 659 542" />
        <LocationCity />
        <Typography children="07516 659 542" />
        <LocationCity />
        <Typography children="07516 659 542" />
      </Grid>
      <Grid item container direction="column" alignItems="center" sx={{ gap: 1 }}>
        <Typography color="text.secondary" children="We accept the following payment methods" />
        <PaymentMethodImages />
      </Grid>
    </Grid>
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
