import { Box, Typography } from '@mui/material'

const styles = {
  root: {
    p: 1,
    backgroundColor: 'background.highlight',
    textAlign: 'center',
    letterSpacing: 1,
  },
}

export const PromotionBanner = () => {
  return (
    <Box sx={styles.root}>
      <Typography variant="body2">Free UK Delivery on orders over £50</Typography>
    </Box>
  )
}
