import { Button, Card, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { CoverImage, Form, Section, SendIcon } from '@/components'

import styles from './styles'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { wait } from '@/utils/helpers'
import { MarkEmailRead } from '@mui/icons-material'
import { isVPMinSm } from '@/theming'

export const NewsletterSection = () => {
  return (
    <Section maxWidth="md">
      <Card
        sx={{
          borderRadius: 3,
          [isVPMinSm]: {
            boxShadow: ({ shadows }) => shadows[16],
          },

          backgroundImage: (theme) =>
            `linear-gradient(to right bottom, ${theme.palette.background.paper} 25%, ${theme.palette.primary.main})`,
        }}>
        <Grid container direction="row-reverse">
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ position: 'relative', height: { xs: '40vh', sm: 'initial' } }}>
            <CoverImage
              src="/images/latest-products/linen-suit-2.jpg"
              sx={{ filter: 'invert(0)' }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            py={{ xs: 3, sm: 4, md: 5 }}
            px={{ xs: 4, sm: 5, md: 6 }}
            container
            direction="column"
            alignItems="center"
            rowGap={{ xs: 1.5, sm: 3 }}>
            <Typography
              component="h2"
              variant="h5"
              color="primary.dark"
              letterSpacing={1}
              children="Want 10% Off Your Next Order?"
            />
            <Typography children="Subscribe to our weekly newsletter for our latest products and offers" />
            <NewsletterForm />
            <Typography
              variant="body2"
              children=" We'll use your information in accordance with our Privacy Notice"
            />
            <Typography
              variant="caption"
              color="text.disabled"
              children="*Terms & Conditions Apply"
            />
          </Grid>
        </Grid>
      </Card>
    </Section>
  )
}

const NewsletterForm = () => {
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
          children="Subscribe"
          endIcon={<MarkEmailRead />}
          loading={isSubmitting}
          fullWidth
          sx={{
            padding: '13px', // just to have similar size to <TextField>s, which have about ~14px padding
          }}
        />
      </Grid>
    </Grid>
  )
}
