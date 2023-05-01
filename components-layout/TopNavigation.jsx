import { Form, Link } from '@/components'
import { PATHS, companyName } from '@/constants'
import { useToggle } from '@/hooks'
import { isVPMaxSm, isVPMinLg, isVPMinMd, isVPXs } from '@/theme'
import {
  PersonOutline,
  Menu,
  Search,
  ShoppingBagOutlined,
  FavoriteBorder,
  Close,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'

const sx = {
  heading: {
    fontFamily: 'Ephesis, cursive',
    fontWeight: 400,
    letterSpacing: { xs: 1, md: 3 },
    display: { xs: 'none', lg: 'block' },
  },

  icon: {
    fontSize: ({ spacing }) => ({ xs: spacing(3.5), sm: spacing(4) }),
  },
}

export const TopNavigation = () => {
  const isScrolledDown = useScrollTrigger({ threshold: 100 })
  const isMinMd = useMediaQuery(isVPMinMd)

  return (
    <Slide appear={false} in={!isScrolledDown} timeout={{ enter: 250, exit: 500 }}>
      <AppBar position="sticky" elevation={8}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item md={3}>
              <TopNavigationHeading />
            </Grid>
            {isMinMd && (
              <Grid item md={6}>
                <TopNavigationCategoryLinks />
              </Grid>
            )}
            <Grid item md={3}>
              <TopNavigationActions />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

const TopNavigationHeading = () => {
  const isMaxSm = useMediaQuery(isVPMaxSm)

  return (
    <Grid container alignItems="center" columnGap={{ sm: 1 }}>
      {isMaxSm && <SideDrawerButton />}
      <Link href={PATHS.HOME} underline="none">
        <Grid container alignItems="center" columnGap={2}>
          <Box sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}>
            <img src="/logo.png" width="100%" />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            children={companyName}
            align="center"
            sx={sx.heading}
          />
        </Grid>
      </Link>
    </Grid>
  )
}

const SideDrawerButton = () => {
  const handleClick = () => alert('Coming soon...lol')

  return <IconButton onClick={handleClick} children={<Menu sx={sx.icon} />} />
}

const TopNavigationCategoryLinks = () => {
  const categories = ['Men', 'Women', 'Sport', 'Collections', 'The Brand']

  return (
    <Grid container columnGap={2} justifyContent="center">
      {categories.map((c) => (
        <Link href="/#" children={c} />
      ))}
    </Grid>
  )
}

const TopNavigationActions = () => {
  const isXs = useMediaQuery(isVPXs)
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={0.5}>
      {isMinLg ? (
        <InputBase
          placeholder="Search"
          sx={{
            width: 144, // *** hardcoded for now
          }}
        />
      ) : (
        <MobileSearchButton />
      )}
      <IconButton children={<PersonOutline sx={sx.icon} />} />
      <IconButton
        component={Link}
        href={PATHS.WISHLIST}
        children={<FavoriteBorder sx={sx.icon} />}
      />
      <IconButton children={<ShoppingBagOutlined sx={sx.icon} />} />
    </Grid>
  )
}

const MobileSearchButton = () => {
  const [isOpen, toggleSearch] = useToggle()

  return (
    <>
      <IconButton onClick={toggleSearch} children={<Search sx={sx.icon} />} />
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
      elevation={0} // otherwise adds additional box-shadow on top of <TopNavigation>'s
    >
      <Toolbar>
        <IconButton onClick={close} children={<Close sx={sx.icon} />} />
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
      <IconButton type="submit" children={<Search sx={sx.icon} />} />
    </Form>
  )
}
