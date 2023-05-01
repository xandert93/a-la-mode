import { Send } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputBase,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

export const NewsletterSection = () => {
  return (
    <Box component="section" sx={{ backgroundColor: 'background.highlight' }}>
      <Container>
        <Grid container direction="column" rowGap={2} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" children="Want 10% Off Your Next Order?*" />
          <Typography children="Subscribe to our newsletter for our latest products and offers" />
          <NewsletterForm />
          <Typography children="We'll use your information in accordance with our Privacy Notice" />
          <Typography
            variant="caption"
            color="text.disabled"
            children="*Terms & Conditions Apply"
          />
        </Grid>
      </Container>
    </Box>
  )
}

const NewsletterForm = () => {
  return (
    <Grid container justifyContent="center" wrap="nowrap">
      <TextField
        type="email"
        placeholder="Enter your Email Address"
        name="email"
        sx={{ width: '100%', maxWidth: 320 }}
        InputProps={{
          sx: {
            borderRadius: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          },
        }}
        inputProps={{
          sx: {
            p: 1.5, // 16.5px 14px*
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        children={<Send />}
        sx={{
          borderRadius: 0,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          boxShadow: 'none',
          width: '10ch',
        }}
      />
    </Grid>
  )
}
