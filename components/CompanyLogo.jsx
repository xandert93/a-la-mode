import { NAMES } from '@/constants'
import { Box } from '@mui/material'

export const CompanyLogo = (props) => {
  return (
    <Box {...props}>
      <img src="/logo.png" width="100%" alt={`${NAMES.COMPANY} Logo`} />
    </Box>
  )
}
