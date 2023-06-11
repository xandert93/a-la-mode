import {
  Checkbox,
  CompanyHeading,
  CompanyLogo,
  FacebookIcon,
  Form,
  Main,
  GoogleIcon,
  AppleIcon,
  Link,
  TextLink,
} from '@/components'
import { PATHS } from '@/constants'
import { isVPXs } from '@/theme'
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'

const styles = {}

export default function LoginPage() {
  const isXs = useMediaQuery(isVPXs) // so I get <Paper>'s dark mode `elevation` background-image
  const handleSubmit = (e) => {}

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
        <Grid container direction="column" alignItems="center" gap={3}>
          <Box alignSelf="flex-start">
            <Typography
              component="h2"
              variant="h4"
              children="Welcome"
              fontFamily="Ephesis"
              fontWeight={400}
              paragraph
            />
            <Typography
              component="p"
              variant="body2"
              color="text.secondary"
              children="Enter your email and password to sign in:"
            />
          </Box>
          <Grid
            container
            direction="column"
            gap={1.5}
            maxWidth={360}
            component={Form}
            onSubmit={handleSubmit}>
            <Grid container gap={4}>
              <TextField type="email" name="email" label="Email Address" />
              <Grid item xs>
                <TextField type="password" name="password" label="Password" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="right"
                  children="Forgotten password?"
                  mt={1}
                />
              </Grid>
            </Grid>
            <LoginPersistCheckbox />
            <Button type="submit" children="Sign in" />
          </Grid>
          <Typography>
            New Customer?{' '}
            <TextLink
              color="primary"
              href={PATHS.REGISTRATION}
              children="Register Now ➡"
              hover
              underline="hover"
            />
          </Typography>
          <Divider flexItem>
            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle="italic"
              children="or continue with"
            />
          </Divider>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                startIcon={<GoogleIcon />}
                children="Google"
                fullWidth
                sx={{
                  minWidth: {
                    sm: '15ch', // *** JFN - not ideal but the look I want
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                startIcon={<FacebookIcon />}
                children="Facebook"
                fullWidth
                sx={{ minWidth: { sm: '15ch' } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                startIcon={<AppleIcon />}
                children="Apple"
                fullWidth
                sx={{ minWidth: { sm: '15ch' } }}
              />
            </Grid>
          </Grid>
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            align="center"
            children="Oh Twitter, where art thou?"
          />
        </Grid>
      </Card>
    </Main>
  )
}

const LoginPersistCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
  }

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      name="rememberMe" // H&M use this. Next use "RememberEmail". See other sites if unhappy
      label="Remember Me"
    />
  )
}

/*
<Checkbox>'s actual <Checkbox> button has 9px padding applied to it, which increase 
vertical spacing. Also has some margin-left and margin-right to account for the 
horizontal spacing applied by this padding. 

As such, I just decided to create a separate <Grid> for the <TextFields> which have 
more actual spacing.

*/
