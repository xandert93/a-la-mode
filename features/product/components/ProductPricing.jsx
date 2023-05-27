import { MoneyTypography } from '@/components'
import { Grid } from '@mui/material'

export const ProductPricing = ({ gap = 1, prices, variant1, variant2, ...props }) => {
  return (
    <Grid container gap={gap} {...props}>
      {prices.previous && (
        <MoneyTypography
          variant={variant1}
          color="text.disabled"
          children={prices.previous}
          sx={{ textDecoration: 'line-through' }}
        />
      )}
      <MoneyTypography
        variant={variant2}
        component="p"
        color={prices.previous && 'error.main'}
        children={prices.current}
        fontWeight={prices.previous && 500}
      />
    </Grid>
  )
}
