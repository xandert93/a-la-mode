import { Form, Main, Section, TextLink } from '@/components'
import { NAMES } from '@/constants'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export default function RegistrationPage() {
  const handleSubmit = (e) => {
    const data = Object.fromEntries(new FormData(e.target))
    alert(JSON.stringify(data))
  }

  return (
    <Main>
      <Section maxWidth="sm">
        <Grid container component={Form} onSubmit={handleSubmit} gap={2}>
          <TextField type="text" name="firstName" label="First Name" />
          <TextField type="text" name="lastName" label="Last Name" />
          <TextField type="email" name="email" label="Email Address" />
          <TextField type="password" name="password" label="Password" />
          <TextField type="password" name="passwordConfirm" label="Confirm your password" />
          {/* Due to bad UX, MUI discourage use of <DatePicker> for DOB: https://github.com/mui/mui-x/issues/5021 */}
          <TextField
            // type="date"
            name="dob"
            label="Date of Birth"
            helperText="You must be 16 or over"
          />
          <PurchasePreferenceRadioGroup />
          <ContactPreferencesCheckboxGroup />

          <Button type="submit" children={`Join ${NAMES.COMPANY}`} fullWidth />
          <Typography component="p" variant="caption" color="text.secondary">
            By creating an account, you'll automatically be signed up to Sparks (underline), our
            reward scheme.
          </Typography>
        </Grid>
        Already have an account? <TextLink href="/auth/login" children="Sign In" />
      </Section>
    </Main>
  )

  return (
    <Main>
      Hey there! We love new faces 😄 Fill in some quick details below to get started and place your
      first order |
    </Main>
  )
}

const PurchasePreferenceRadioGroup = () => {
  const [preference, setPreference] = useState('')

  const handleChange = (e) => setPreference(e.target.value)

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" children="I am mostly interested in:" />
      <RadioGroup row name="preference" value={preference} onChange={handleChange}>
        <FormControlLabel value="menswear" control={<Radio />} label="Menswear" />
        <FormControlLabel value="womenswear" control={<Radio />} label="Womenswear" />
      </RadioGroup>
      <FormHelperText children="You can update this any time in your preferences" />
    </FormControl>
  )
}

const ContactPreferencesCheckboxGroup = () => {
  const [state, setState] = useState({
    offers: false,
    additions: false,
    exclusives: false,
    partners: false,
  })

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
  }

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" children="I would like to receive emails about:" />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={state.offers} onChange={handleChange} name="offers" />}
          label="Discounts and promotions"
        />
        <FormControlLabel
          control={<Checkbox checked={state.additions} onChange={handleChange} name="additions" />}
          label="New arrivals"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.exclusives} onChange={handleChange} name="exclusives" />
          }
          label="Exclusives for you"
        />
        <FormControlLabel
          control={<Checkbox checked={state.partners} onChange={handleChange} name="partners" />}
          label="Our partners"
        />
      </FormGroup>
      <FormHelperText children="You can update this any time in your preferences" />
    </FormControl>
  )
}
