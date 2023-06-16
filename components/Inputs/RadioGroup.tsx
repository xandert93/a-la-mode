import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps,
} from '@mui/material'

type Props = {
  label: React.ReactNode
  FormLabelProps?: FormLabelProps
  FormHelperTextProps?: FormHelperTextProps
  children: React.ReactNode
} & FormControlProps &
  RadioGroupProps

export const RadioGroup = ({
  label,
  error,
  required = true,
  FormLabelProps,
  FormHelperTextProps,
  ...props
}: Props) => {
  return (
    <FormControl
      component="fieldset"
      variant="standard" // ❗ not sure what this does?
      error={error}
      required={required}>
      <FormLabel
        // component="legend" - ❗ TSC flags
        children={label}
        {...FormLabelProps}
      />
      <MuiRadioGroup {...props} />
      <FormHelperText {...FormHelperTextProps} />
    </FormControl>
  )
}
