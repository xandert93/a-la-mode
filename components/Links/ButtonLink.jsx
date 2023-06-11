import { Button } from '@mui/material'
import Link from 'next/link'

import PropTypes from 'prop-types'

export const ButtonLink = (props) => {
  return <Button component={Link} {...props} />
}

// ButtonLink.propTypes = {
//   href: PropTypes.string.isRequired,
//   variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   children: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
// }
