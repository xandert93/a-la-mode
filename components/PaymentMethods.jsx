import { PaymentMethodImageList } from '@/components'
import { Grid, Typography } from '@mui/material'

export const PaymentMethods = () => {
  return (
    <Grid container direction="column" alignItems="center" rowGap={2}>
      <Typography
        component="p"
        variant="caption"
        align="center"
        children="We accept the following payment methods:"
      />

      <PaymentMethodImageList />
    </Grid>
  )
}
