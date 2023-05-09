import { Button, Grid, TextField, Typography } from '@mui/material'
import { Form, Section, SendIcon } from '@/components'

import styles from './styles'

export const NewsletterSection = () => {
  return (
    <Section sx={styles.root}>
      <Grid container direction="column" sx={styles.content}>
        <Typography variant="h4" component="h2" children="Want 10% Off Your Next Order?*" />
        <Typography children="Subscribe to our newsletter for our latest products and offers" />
        <NewsletterForm />
        <Typography
          variant="body2"
          children=" We'll use your information in accordance with our Privacy Notice"
        />
        <Typography variant="caption" color="text.disabled" children="*Terms & Conditions Apply" />
      </Grid>
    </Section>
  )
}

const NewsletterForm = () => {
  const handleSubmit = () => {
    alert('Thanks for signing up...hoe 😻')
  }

  return (
    <Grid container component={Form} onSubmit={handleSubmit} justifyContent="center" wrap="nowrap">
      <TextField
        type="email"
        placeholder="Email Address"
        name="email"
        sx={styles['text-field']}
        InputProps={{ sx: styles['input-base'] }}
        inputProps={{ sx: styles['input'] }}
      />
      <Button type="submit" variant="contained" children={<SendIcon />} sx={styles.button} />
    </Grid>
  )
}
