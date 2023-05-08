import { Send } from '@mui/icons-material'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Form } from '../../components/Form'

const styles = {
  section: {
    backgroundColor: 'background.highlight',
  },

  'section-grid': {
    padding: { xs: 2, sm: 3, md: 4 },
    rowGap: { xs: 3, md: 4 },
    textAlign: 'center',
  },

  'text-field': {
    width: '100%',
    maxWidth: 320,
  },

  'input-base': {
    borderRadius: ({ spacing }) => spacing(0.5, 0, 0, 0.5),
  },

  input: {
    padding: 1.5, // 16.5px 14px*
  },

  button: {
    borderRadius: ({ spacing }) => spacing(0, 0.5, 0.5, 0),
    boxShadow: 'none',
    width: '10ch',
  },
}

export const NewsletterSection = () => {
  return (
    <Box component="section" sx={styles.section}>
      <Container>
        <Grid container direction="column" sx={styles['section-grid']}>
          <Typography variant="h4" component="h2">
            Want 10% Off Your Next Order?*
          </Typography>
          <Typography>Subscribe to our newsletter for our latest products and offers</Typography>
          <NewsletterForm />
          <Typography variant="body2">
            We'll use your information in accordance with our Privacy Notice
          </Typography>
          <Typography variant="caption" color="text.disabled">
            *Terms & Conditions Apply
          </Typography>
        </Grid>
      </Container>
    </Box>
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
      <Button type="submit" variant="contained" children={<Send />} sx={styles.button} />
    </Grid>
  )
}
