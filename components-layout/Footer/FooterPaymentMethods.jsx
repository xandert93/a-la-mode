import { PaymentMethodImageList } from '@/components'
import { Grid, Typography } from '@mui/material'

export const FooterPaymentMethods = () => {
  return (
    <Grid container direction="column" alignItems="center" rowGap={2}>
      <Typography
        variant="body2"
        align="center"
        children="We accept the following payment methods:"
      />

      <PaymentMethodImageList />
    </Grid>
  )
}
