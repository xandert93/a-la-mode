import { FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material'

type Props = {
  children: React.ReactNode
  label: React.ReactNode
  helperText?: React.ReactNode
  required?: boolean
}

export const CheckboxGroup = ({ label, helperText, required = false, ...props }: Props) => {
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
