import { Box, Grid } from '@mui/material'
import { paymentMethods } from '@/data'

const styles = {
  root: {
    maxWidth: 400,
    minHeight: 20,
  },

  image: {
    width: '100%',
  },
}

export const PaymentMethodImageList = () => {
  return (
    <Grid container wrap="nowrap" sx={styles.root}>
      {paymentMethods.map(({ name, imageUrl }) => (
        <Grid key={name} item xs>
          <Box component="img" src={imageUrl} sx={styles.image} alt={name} />
        </Grid>
      ))}
    </Grid>
  )
}
