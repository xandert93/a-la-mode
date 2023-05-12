import { useState } from 'react'

import { Card, Container, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { CoverImage, Form, Section } from '@/components'

import { LoadingButton } from '@mui/lab'

import { wait } from '@/utils/helpers'
import { MarkEmailRead } from '@mui/icons-material'

import styles from './styles'

export const NewsletterSection = () => {
  return (
    <Section maxWidth="xl">
      <Card sx={styles.card}>
        <Container maxWidth="lg" sx={styles.container}>
          <Grid
            container
            direction="row-reverse"
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
        </Container>
      </Card>
    </Section>
  )
}

const Subscription = () => {
  return (
    <Grid container direction="column" alignItems="center" rowGap={{ xs: 1.5, sm: 3 }}>
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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await wait(3)
    setIsSubmitting(false)
  }

  return (
    <Grid container component={Form} onSubmit={handleSubmit} spacing={{ xs: 2, md: 2.5, lg: 3 }}>
      <Grid item xs={12} md={6}>
        <TextField label="Name" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField type="email" label="Email Address" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField select label="How did you hear of us?" helperText="Please choose one option">
          <MenuItem value={1} children="Search Engine" />
          <MenuItem value={2} children="Friends and Family" />
          <MenuItem value={3} children="Social Media Ad" />
          <MenuItem value={4} children="Others" />
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          children="Subscribe"
          endIcon={<MarkEmailRead />}
          fullWidth
          sx={styles['submit-button']}
        />
      </Grid>
    </Grid>
  )
}
