import {
  Checkbox,
  Form,
  Main,
  Section,
  TextLink,
  Radio,
  RadioGroup,
  CheckboxGroup,
  CompanyLogo,
  CompanyHeading,
  Link,
} from '@/components'

import { NAMES, PATHS } from '@/constants'
import { isVPXs } from '@/theming'
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'

// Hey there! Let's get started - M&S
// Some of the great reasons to join: Faster checkout Offers Rewards + Treats Digital Receipts - M&S
// Hey there! We love new faces 😄 Fill in some quick details below to get started and place your first order : asos

export default function RegistrationPage() {
  const isXs = useMediaQuery(isVPXs) // so I get <Paper>'s dark mode `elevation` background-image

  const handleSubmit = (e) => {
    const data = Object.fromEntries(new FormData(e.target))
    alert(JSON.stringify(data))
  }

  return (
    <Main
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      py={2} // just in case user zooms in
      rowGap={{ xs: 1, sm: 4 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={2}
        component={Link} // *** fix stretching eventually
        href={PATHS.HOME}>
        <CompanyLogo sx={{ maxWidth: 64 }} />
        <CompanyHeading variant="h2" />
      </Grid>
      <Card sx={{ p: { xs: 3, sm: 5 } }} elevation={!isXs ? 8 : 0}>
        <Grid container direction="column" alignItems="center" gap={3} maxWidth={480}>
          <Box alignSelf="flex-start">
            <Typography
              component="h2"
              variant="h4"
              children="Hey there!"
              fontFamily="Ephesis"
              fontWeight={400}
              paragraph
            />
            <Typography
              component="p"
              variant="body2"
              color="text.secondary"
              children="Fill in some quick details below to get started and place your first order:"
            />
          </Box>

          <Grid container direction="column" gap={3} component={Form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="firstName" label="First Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="lastName" label="Last Name" />
              </Grid>
              <Grid item xs={12}>
                <TextField type="email" name="email" label="Email Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField type="password" name="password" label="Password" />
              </Grid>
              <Grid item xs={12}>
                <TextField type="password" name="passwordConfirm" label="Confirm your password" />
              </Grid>
            </Grid>
            <PurchasePreferenceRadioGroup />
            <ContactPreferencesCheckboxGroup />
            <TextField
              type="text"
              name="dob"
              label="Date of Birth"
              helperText="You'll get a reward from us on your birthday! 🎉"
            />

            <PrivacyTermsCheckbox />
            <Button type="submit" children={`Join ${NAMES.COMPANY}`} />
          </Grid>
          <Typography component="p" variant="caption" color="text.secondary">
            By creating an account, you'll automatically be signed up to Sparks (underline), our
            reward scheme.
          </Typography>
          <Typography>
            Already have an account? <TextLink href={PATHS.LOGIN} children="Sign in ➡" />
          </Typography>
        </Grid>
      </Card>
    </Main>
  )
}

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
      onChange={handleChange}>
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
        checked={state.currents}
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
