import { FormControlLabel, Radio as MuiRadio } from '@mui/material'

export const Radio = ({ RadioProps, ...props }) => {
  return <FormControlLabel control={<MuiRadio {...RadioProps} />} {...props} />
}
