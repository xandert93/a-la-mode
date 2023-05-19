import {
  Checkbox,
  Form,
  Main,
  Section,
  TextLink,
  Radio,
  RadioGroup,
  CheckboxGroup,
} from '@/components'

import { NAMES } from '@/constants'
import { Box, Button, Grid, List, ListItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function RegistrationPage() {
  const handleSubmit = (e) => {
    const data = Object.fromEntries(new FormData(e.target))
    alert(JSON.stringify(data))
  }

  return (
    <Main>
      <Box mns>Hey there! Let's get started</Box>
      <Box mns>
        Some of the great reasons to join Faster checkout Offers Rewards + Treats Digital Receipts
      </Box>
      <Box asos>
        Hey there! We love new faces 😄 Fill in some quick details below to get started and place
        your first order
      </Box>
      <Section
        maxWidth="sm" // temp
        sx={{ py: 2 }}>
        <Grid
          container
          component={Form}
          onSubmit={handleSubmit}
          gap={{
            xs: 2.5, // touch inaccuracy
            sm: 2,
          }}>
          <TextField type="text" name="firstName" label="First Name" />
          <TextField type="text" name="lastName" label="Last Name" />
          <TextField type="email" name="email" label="Email Address" />
          <TextField type="password" name="password" label="Password" />
          <TextField type="password" name="passwordConfirm" label="Confirm your password" />

          <PurchasePreferenceRadioGroup />
          <TextField
            type="text"
            name="dob"
            label="Date of Birth"
            helperText="Get a reward from us on your birthday! 🎉"
          />
          <ContactPreferencesCheckboxGroup />
          <PrivacyTermsCheckbox />

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
}

// On md+, Nike splits <FirstName> and <LastName> in one row i.e. xs={12} md={6}

/*
+ title (<Select>)
+ telephone
+ address
+ country

*/

const PurchasePreferenceRadioGroup = () => {
  const [preference, setPreference] = useState('')

  const handleChange = (e) => setPreference(e.target.value)

  return (
    <RadioGroup
      row
      name="preference"
      label="I am mostly interested in:"
      value={preference}
      onChange={handleChange}
      helperText="You can update this any time in your preferences"
      required={false}>
      <Radio value="menswear" label="Menswear" />
      <Radio value="womenswear" label="Womenswear" />
    </RadioGroup>
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
    <CheckboxGroup
      label="I would like to receive emails about:"
      helperText="You can update this any time in your preferences">
      <Checkbox
        checked={state.offers}
        onChange={handleChange}
        name="offers"
        label="Discounts and promotions"
      />
      <Checkbox
        checked={state.additions}
        onChange={handleChange}
        name="additions"
        label="New arrivals"
      />
      <Checkbox
        checked={state.exclusives}
        onChange={handleChange}
        name="exclusives"
        label="Exclusives for you"
      />
    </CheckboxGroup>
  )
}

const PrivacyTermsCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleCheck = (e) => setIsChecked(e.target.checked)

  return (
    <Checkbox
      name="privacyTerms"
      checked={isChecked}
      onChange={handleCheck}
      required
      label={<Box>I agree to the Terms of Use and I have read the Privacy Policy</Box>}
    />
  )
}

const PasswordConstraints = () => {
  // something like this - place below password input and change color from grey -> green/red as they type and fulfill
  // could reconsider helperText=Node, but everything inside will go red if error prop => true
  return (
    <List>
      <ListItem>Condition 1 e.g. Minimum of 8 characters</ListItem>
      <ListItem>Condition 2 e.g. Uppercase, lowercase letters and one number</ListItem>
    </List>
  )
}
