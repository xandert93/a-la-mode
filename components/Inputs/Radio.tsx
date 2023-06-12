import {
  FormControlLabel,
  FormControlLabelProps,
  Radio as MuiRadio,
  RadioProps,
} from '@mui/material'

type Props = {
  RadioProps?: RadioProps
} & Omit<FormControlLabelProps, 'control'>

export const Radio = ({ RadioProps, ...props }: Props) => {
  return <FormControlLabel control={<MuiRadio {...RadioProps} />} {...props} />
}
