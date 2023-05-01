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
  Input,
  InputAdornment,
  InputBase,
  Slide,
  TextField,
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
    fontSize: ({ spacing }) => ({ xs: spacing(3.5), sm: spacing(3.75) }),
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
            <Grid item md={3.5}>
              <TopNavigationHeading />
            </Grid>
            {isMinMd && (
              <Grid item md={5}>
                <TopNavigationCategoryLinks />
              </Grid>
            )}
            <Grid item md={3.5}>
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
  const isMinLg = useMediaQuery(isVPMinLg)

  return (
    <Grid container justifyContent="flex-end" columnGap={0.5}>
      {isMinLg ? <SearchForm /> : <MobileSearchButton />}
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

const SearchForm = () => {
  const handleSubmit = () => {
    alert('Eurgh...you just made me search 👄')
  }

  return (
    <Form sx={{ display: 'flex' }} onSubmit={handleSubmit}>
      <TextField
        variant="filled"
        placeholder="Search"
        sx={{
          width: 200,
          justifyContent: 'center' /* borderRadius: 2, ':hover': { background: 'red' } */,
        }}
        InputProps={{
          sx: {
            paddingRight: 'initial',
          },
          endAdornment: <SearchInputAdornment />,
        }}
        inputProps={{ sx: { padding: '8px 12px' } }}
      />
    </Form>
  )
}

const MobileSearchBar = ({ close }) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0} // otherwise adds additional box-shadow on top of <TopNavigation>'s
    >
      <Toolbar sx={{ gap: 1 }}>
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
    <Form sx={{ flexGrow: 1 }} onSubmit={handleSubmit}>
      <InputBase
        fullWidth
        placeholder="Search our products and brands"
        endAdornment={<SearchInputAdornment />}
      />
    </Form>
  )
}

const SearchInputAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton
        type="submit"
        disabled={false} // eventually update
        children={<Search sx={sx.icon} />}
      />
    </InputAdornment>
  )
}
