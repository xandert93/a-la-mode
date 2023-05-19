import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'

export const Checkbox = ({ label, ...props }) => {
  return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />
}
