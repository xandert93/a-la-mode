import { PaymentMethodImageList } from '@/components'
import { Grid, Typography } from '@mui/material'

export const FooterPaymentMethods = () => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        children="We accept the following payment methods:"
      />

      <PaymentMethodImageList />
    </>
  )
}
