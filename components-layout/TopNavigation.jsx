import { Form, Link } from '@/components'
import { PATHS } from '@/constants'
import { useToggle } from '@/hooks'
import { hasNoMouse, isVPXs } from '@/theme'
import {
  PersonOutline,
  Favorite,
  Menu,
  Search,
  ShoppingBag,
  ShoppingBagOutlined,
  FavoriteBorder,
  Close,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  const isXs = useMediaQuery(isVPXs)

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
      {isXs && <MobileSearchButton />}

      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<FavoriteBorder sx={{ fontSize: { xs: 28, sm: 32 } }} />}
      />
      <IconButton children={<ShoppingBagOutlined sx={{ fontSize: { xs: 28, sm: 32 } }} />} />
    </Grid>
  )
}

const MobileSearchButton = () => {
  const [isOpen, toggleSearch] = useToggle()

  return (
    <>
      <IconButton
        onClick={toggleSearch}
        children={<Search sx={{ fontSize: { xs: 28, sm: 32 } }} />}
      />
      {/* temporarily placing 👇 here to isolate logic. Semantically, not ideal though */}
      {isOpen && <MobileSearchBar close={toggleSearch} />}
    </>
  )
}

const MobileSearchBar = ({ close }) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      color="inherit"
      elevation={0} // otherwise adds additional box-shadow on top of <TopNavigation>'s
    >
      <Toolbar>
        <IconButton onClick={close} children={<Close sx={{ fontSize: 28 }} />} />
        <MobileSearchForm />
      </Toolbar>
    </AppBar>
  )
}

const MobileSearchForm = () => {
  const handleSubmit = () => {
    alert('Eurgh...you just made me search 👄')
  }

  return (
    <Form sx={{ flexGrow: 1, display: 'flex' }} onSubmit={handleSubmit}>
      <InputBase sx={{ flexGrow: 1 }} placeholder="Daddy, I'm gonna be a <SearchInput>!" />
      <IconButton type="submit" children={<Search sx={{ fontSize: 28 }} />} />
    </Form>
  )
}
