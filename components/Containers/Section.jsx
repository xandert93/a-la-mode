import { Container } from '@mui/material'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

export const Section = forwardRef((props, ref) => {
  return <Container component="section" {...props} ref={ref} />
})

Section.propTypes = {
  sx: PropTypes.object,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
}
