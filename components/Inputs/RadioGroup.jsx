import { FormControl, FormHelperText, FormLabel, RadioGroup as MuiRadioGroup } from '@mui/material'
import PropTypes from 'prop-types'

export const RadioGroup = ({ label, helperText, required = true, ...props }) => {
  return (
    <FormControl
      component="fieldset"
      variant="standard" // *** not sure what this does?
      required={required}>
      <FormLabel component="legend" children={label} />
      <MuiRadioGroup {...props} />
      {helperText && <FormHelperText children={helperText} />}
    </FormControl>
  )
}

RadioGroup.propTypes = {
  label: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  helperText: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
}
