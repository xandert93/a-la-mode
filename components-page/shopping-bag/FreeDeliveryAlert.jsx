import {
  DeliveryIcon,
  IconButton,
  InformationIcon,
  MoneyTypography,
  Span,
  TextLink,
} from '@/components'
import { PATHS } from '@/constants'
import { useBag, useWishList } from '@/context/global-context'
import { Collapse, Grid, Paper, Typography, alpha } from '@mui/material'

const styles = {
  root: {
    p: 2,
    bgcolor: ({ palette }) => alpha(palette.info.main, 0.2),
    color: 'text.tertiary',
    borderRadius: { xs: 0, sm: 1 },
  },

  action: {
    mr: -1, // since <IconButton> already has 8px RHS padding applied
  },
}

// Tried MUI's <Alert>, but overriding their color configuration was a hassle. This is fine ✔:

export const FreeDeliveryAlert = () => {
  const bag = useBag()
  const wishList = useWishList()

  const handleActionClick = (e) => {
    // open modal that displays delivery information - see M&S
  }

  return (
    /* *** JFN 👇 might delete. Also has bug of negative delivery offset being displayed while exiting */
    <Collapse
      in={Boolean(bag.costs.delivery)}
      unmountOnExit // if false this, its very smooth, but there is extra space at its original location (?) and with, there's very slight juddery layout shift (probably cos of row-gap)...
    >
      <Paper elevation={1} sx={styles.root}>
        <Grid container wrap="nowrap" alignItems="center" columnGap={3}>
          <DeliveryIcon />
          <Grid container direction="column" alignItems="flex-start" rowGap={{ xs: 2.5, md: 1 }}>
            <Typography variant="body2">
              Can we tempt you? Spend another{' '}
              <MoneyTypography
                component="span"
                variant="inherit"
                children={bag.delivery.freeOffset}
                fontWeight={500}
              />{' '}
              to qualify for <Span children="FREE Standard Delivery." fontWeight={500} />
            </Typography>
            <TextLink variant="body2" href={PATHS.HOME} children="< Continue Shopping" hover />
            {wishList.hasItems && (
              <TextLink
                variant="body2"
                href={PATHS.WISH_LIST}
                children={`< Saved Items (${wishList.itemCount})`}
                hover
              />
            )}
          </Grid>
          <IconButton
            onClick={handleActionClick}
            children={<InformationIcon />}
            sx={styles.action}
            shaded={false}
          />
        </Grid>
      </Paper>
    </Collapse>
  )
}
