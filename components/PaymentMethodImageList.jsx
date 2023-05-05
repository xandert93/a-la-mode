import { Grid } from '@mui/material'
import { paymentMethods } from '@/data'

export const PaymentMethodImageList = () => {
  return paymentMethods.map((name) => (
    <Grid key={name} item>
      <img style={{ width: '100%' }} src={`/images/payment-methods/${name}.png`} />
    </Grid>
  ))
}
