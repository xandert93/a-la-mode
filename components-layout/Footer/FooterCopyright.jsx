import { Box, Typography } from '@mui/material'

export const FooterCopyright = () => {
  return (
    <Box bgcolor="primary.dark" p={1}>
      <Typography
        variant="body2"
        color="white"
        align="center"
        children="© 2023 Á la Mode Retail Ltd. All rights reserved."
      />
    </Box>
  )
}
