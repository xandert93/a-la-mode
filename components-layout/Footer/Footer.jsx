import { Container, Grid } from '@mui/material'

import { FooterAbout } from './FooterAbout'
import { FooterLinks } from './FooterLinks'
import { FooterContact } from './FooterContact'
import { FooterPaymentMethods } from './FooterPaymentMethods'

// I don't need to specify the `xs`, `sm` prop each time if they are the same, but just makes it easier to understand/picture
export const Footer = () => {
  return (
    <Container component="footer">
      <Grid container columnSpacing={{ lg: 8 }} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <FooterAbout />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FooterLinks title="Customer Care" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FooterLinks title="Corporate" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <FooterContact />
        </Grid>
        <Grid item container direction="column" alignItems="center" gap={1.5}>
          <FooterPaymentMethods />
        </Grid>
      </Grid>
    </Container>
  )
}