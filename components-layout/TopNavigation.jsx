import { Link } from '@/components'
import { PATHS } from '@/constants'
import { hasNoMouse } from '@/theme'
import {
  PersonOutline,
  Favorite,
  Menu,
  Search,
  ShoppingBag,
  ShoppingBagOutlined,
  FavoriteBorder,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { useRouter } from 'next/router'

const sx = {
  heading: {
    fontFamily: 'Ephesis, cursive',
    fontWeight: 400,
    letterSpacing: { xs: 1, md: 3 },
    display: { xs: 'none', sm: 'block' },
  },
}

export const TopNavigation = () => {
  const isScrolledDown = useScrollTrigger({ threshold: 100 })

  return (
    <Slide appear={false} in={!isScrolledDown} timeout={{ enter: 250, exit: 500 }}>
      <AppBar position="sticky" elevation={8} color="inherit">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <TopNavigationHeading />
            <TopNavigationActions />
            {/* <Grid item xs={4}>
              <input placeholder="search" />
            </Grid> */}
            {/* <Grid item xs={4}>
              <TopNavigationHeading />
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end" component="nav" sx={{ gap: 1 }}>
              <TopNavigationActions />
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

const TopNavigationHeading = () => {
  const router = useRouter()

  const handleClick = () => router.push(PATHS.HOME)

  return (
    <Grid
      container
      sx={{ width: 'initial' }} // *** temp fix
      alignItems="center">
      <IconButton
        children={<Menu sx={{ fontSize: { xs: 28, sm: 32 } }} />}
        sx={{ display: { sm: 'none' } }}
      />
      <Link href={PATHS.HOME} underline="none">
        <Grid
          container
          alignItems="center"
          sx={{ width: 'initial' }} // *** temp fix
          columnGap={2}>
          <Box sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}>
            <img src="/logo.png" width="100%" />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            children="Á la Mode"
            align="center"
            onClick={handleClick}
            sx={sx.heading}
          />
        </Grid>
      </Link>
    </Grid>
  )
}

const TopNavigationActions = () => {
  return (
    <Grid
      container
      sx={{ width: 'initial' }} // *** temp fix
      columnGap={0.5}>
      {/* <Button component={Link} href="#" children="Register" />
      <Button component={Link} href="#" children=" Sign In" /> */}

      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<PersonOutline sx={{ fontSize: { xs: 28, sm: 32 } }} />}
      />
      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<Search sx={{ fontSize: { xs: 28, sm: 32 } }} />}
      />
      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<FavoriteBorder sx={{ fontSize: { xs: 28, sm: 32 } }} />}
      />
      <IconButton children={<ShoppingBagOutlined sx={{ fontSize: { xs: 28, sm: 32 } }} />} />
    </Grid>
  )
}
