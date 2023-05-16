import { Container } from '@mui/material'
import PropTypes from 'prop-types'

export const Section = (props) => {
  return <Container component="section" {...props} />
}

Section.propTypes = {
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
}
