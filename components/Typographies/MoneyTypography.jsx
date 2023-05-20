import { formatCurrency } from '@/utils/formatters'
import { Typography } from '@mui/material'

import PropTypes from 'prop-types'

export const MoneyTypography = ({ children: amount, ...props }) => {
  return <Typography children={formatCurrency(amount)} {...props} />
}

MoneyTypography.propTypes = {
  children: PropTypes.number.isRequired,
}
