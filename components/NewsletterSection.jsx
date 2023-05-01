import { Send } from '@mui/icons-material'
import { Button, Grid, InputBase, Paper, TextField, Typography } from '@mui/material'

export const NewsletterSection = () => {
  return (
    <section>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ py: 10, gap: 5, backgroundColor: 'background.highlight' }}>
        <Typography variant="h4" component="h3" children="Want 10% Off Your Next Order?*" />
        <Typography children="Sign up for our lateset products and offers" />

        <form>
          <InputBase type="email" placeholder="Email Address" name="email" />
          <Button /* type="submit" */ children={<Send />} />
        </form>

        <Typography children="We'll use your information in accordance with our Privacy Notice" />
        <Typography color="text.disabled" children="*Terms & Conditions Apply" />
      </Grid>
    </section>
  )
}
