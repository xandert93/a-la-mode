import { FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import PropTypes from 'prop-types'

export const CheckboxGroup = ({ label, helperText, required = false, ...props }) => {
  return (
    <FormControl
      component="fieldset"
      variant="standard" // *** not sure what this does?
      required={required}>
      <FormLabel component="legend" children={label} />
      <FormGroup {...props} />
      {helperText && <FormHelperText children={helperText} />}
    </FormControl>
  )
}

CheckboxGroup.propTypes = {
  label: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  helperText: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
}
