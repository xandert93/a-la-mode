import { useState } from 'react'

import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material'
import {
  CoverImage,
  Form,
  Section,
  LoadingButton,
  Select,
  EmailIcon,
  EmailSuccessIcon,
} from '@/components'

import { wait } from '@/utils/helpers'

import styles from './styles'

export const NewsletterSection = () => {
  return (
    <Section maxWidth="xl">
      <Card sx={styles.card}>
        <Grid
          container
          direction="row-reverse"
          sx={styles.container}
          // *** had trouble here applying `spacing` prop between two items. Appears to be because of Next's absolute image. Using `px` for now. Update when I get more experience.
          // could use `gap` but would need to turn off flex-wrap and then write media query to turn on again for small viewport, which acts against MUI
        >
          <Grid item xs={12} sm={4} sx={styles['image-box']}>
            <CoverImage src="/images/newsletter.jpg" sx={styles.image} />
          </Grid>
          <Grid item xs={12} sm={8} sx={styles['subscription-box']}>
            <Subscription />
          </Grid>
        </Grid>
      </Card>
    </Section>
  )
}

const Subscription = () => {
  return (
    <Grid container direction="column" alignItems="center" rowGap={{ xs: 2, sm: 3 }}>
      <Typography
        component="h2"
        variant="h5"
        children="Want 10% Off Your Next Order?"
        sx={styles.heading}
      />
      <Typography children="Subscribe to our weekly newsletter for our latest products and offers" />
      <SubscriptionForm />
      <Typography
        variant="body2"
        children=" We'll use your information in accordance with our Privacy Notice"
      />
      <Typography variant="caption" color="text.disabled" children="*Terms & Conditions Apply" />
    </Grid>
  )
}

const SubscriptionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await wait(2)
    setIsSubscribed(true)
    setIsSubmitting(false)
  }

  return (
    <Grid container component={Form} onSubmit={handleSubmit} spacing={{ xs: 2.5, md: 2.5, lg: 3 }}>
      <Grid item xs={12} md={6}>
        <TextField label="Name" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField type="email" label="Email Address" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Select label="How did you hear of us?" helperText="Please choose one option">
          <MenuItem value={1} children="Search Engine" />
          <MenuItem value={2} children="Friends and Family" />
          <MenuItem value={3} children="Social Media Ad" />
          <MenuItem value={4} children="Others" />
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          isLoading={isSubmitting}
          disabled={isSubscribed}
          children={isSubscribed ? '' : 'Subscribe'}
          endIcon={isSubscribed ? <EmailSuccessIcon /> : <EmailIcon />}
          fullWidth
          sx={styles['submit-button']}
        />
      </Grid>
      {/* JFN 👇, but atm, on md+, because of abrupt mount, form gets longer and thus so does side image: */}
      {isSubscribed && (
        <Grid item xs={12}>
          <Typography
            color="success.main"
            children="Subscribed ✔. Please check your inbox 😄"
            align="center"
          />
        </Grid>
      )}
    </Grid>
  )
}
