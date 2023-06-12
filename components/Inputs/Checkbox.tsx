import { Checkbox as MuiCheckbox, FormControlLabel, CheckboxProps } from '@mui/material'

type Props = {
  label: React.ReactNode
} & CheckboxProps

export const Checkbox = ({ label, ...props }: Props) => {
  return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />
}
