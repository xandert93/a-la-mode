import { FormControl, FormHelperText, FormLabel, RadioGroup as MuiRadioGroup } from '@mui/material'
import PropTypes from 'prop-types'

export const RadioGroup = ({
  label,
  error,
  required = true,
  FormLabelProps,
  FormHelperTextProps,
  ...props
}) => {
  return (
    <FormControl
      component="fieldset"
      variant="standard" // *** not sure what this does?
      error={error}
      required={required}>
      <FormLabel component="legend" children={label} {...FormLabelProps} />
      <MuiRadioGroup {...props} />
      <FormHelperText {...FormHelperTextProps} />
    </FormControl>
  )
}

RadioGroup.propTypes = {
  label: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  helperText: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
}
