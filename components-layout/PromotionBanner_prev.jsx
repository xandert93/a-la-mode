import { Grid, Typography } from '@mui/material'

const promotions = [
  {
    title: 'Free Express Delivery!',
    message: "Use code: 'SMOOTHDEL' at checkout",
    priority: 1,
  },
  {
    title: 'Calling All Students',
    message: 'Get 20% Off',
    priority: 2,
  },
  {
    title: 'Stuck for ideas?',
    message: 'Shop our E-Gift Card Now',
    priority: 3,
  },
]

const styles = {
  root: {
    p: 1,
    backgroundColor: 'gold',
    color: 'common.black',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  'promo-1': {
    // always display i.e. display: block (which is default, anyway)
  },
  'promo-2': {
    display: { xs: 'none', sm: 'initial' },
  },
  'promo-3': {
    display: { xs: 'none', md: 'initial' },
  },

  title: {
    fontWeight: 'bold',
  },
}

const PromotionBanner_2 = () => {
  return (
    <Grid container sx={styles.root}>
      {promotions.map(({ title, message, priority }) => (
        <Grid key={title} xs={12} sm={6} md={4} sx={styles['promo-' + priority]}>
          <Typography sx={styles.title} children={title} />
          <Typography variant="body2" children={message} />
        </Grid>
      ))}
    </Grid>
  )
}
