import { CompanyLogo, CompanyHeading, Form, Link } from '@/components'
import { PATHS, companyName } from '@/constants'
import { useToggle } from '@/hooks'
import { isVPMaxSm, isVPMinLg, isVPMinMd } from '@/theme'
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
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Slide,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'

const sx = {
  logo: {
    width: { xs: 40, sm: 48 },
  },

  heading: {
    fontFamily: 'Ephesis, cursive',
    fontWeight: 400,
    letterSpacing: 1,
    display: { xs: 'none', lg: 'block' },
  },

  icon: {
    fontSize: { xs: 25, sm: 30 },
  },
}

export const Header = () => {
  const isScrolledDown = useScrollTrigger({ threshold: 100 })
  const isMinMd = useMediaQuery(isVPMinMd)

  return (
    <Slide appear={false} in={!isScrolledDown} timeout={{ enter: 250, exit: 500 }}>
      <AppBar position="sticky" elevation={8}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item md={3.5}>
              <HeaderHeading />
            </Grid>
            {isMinMd && (
              <Grid item md={5}>
                <HeaderNavigation />
              </Grid>
            )}
            <Grid item md={3.5}>
              <HeaderActions />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

const HeaderHeading = () => {
  const isMaxSm = useMediaQuery(isVPMaxSm)

  return (
    <Grid container alignItems="center" columnGap={{ sm: 1 }}>
      {isMaxSm && <SideDrawerButton />}
      <Link href={PATHS.HOME} underline="none">
        <Grid container alignItems="center" columnGap={2}>
          <CompanyLogo sx={sx.logo} />
          <CompanyHeading variant="h3" sx={sx.heading} />
        </Grid>
      </Link>
    </Grid>
  )
}

const SideDrawerButton = () => {
  const [isOpen, toggle] = useToggle()

  return (
    <>
      <IconButton onClick={toggle} children={<Menu sx={sx.icon} />} />
      {/* temporarily placing 👇 here to isolate logic. Semantically, not ideal though */}
      <SideDrawer isOpen={isOpen} toggle={toggle} />
    </>
  )
}

const SideDrawer = ({ isOpen, toggle }) => {
  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={toggle}>
      <MenuList onClick={toggle}>
        {categories.map((category) => (
          <MenuItem key={category}>
            <ListItemText>{category}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </SwipeableDrawer>
  )
}

const categories = ['Men', 'Women', 'Sport', 'Collections', 'The Brand']

const HeaderNavigation = () => {
  return (
    <Grid component="nav" container columnGap={{ md: 2, lg: 3, xl: 4 }} justifyContent="center">
      {categories.map((category) => (
        <Link key={category} href="/#" children={category} />
      ))}
    </Grid>
  )
}

const HeaderActions = () => {
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
      elevation={0} // otherwise adds additional box-shadow on top of <Header>'s
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
        size="small"
        type="submit"
        disabled={false} // eventually update
        children={<Search sx={sx.icon} />}
      />
    </InputAdornment>
  )
}
