import { Box, Container, Grid } from '@mui/material'

import { FooterAbout } from './FooterAbout'
import { FooterLinks } from './FooterLinks'
import { FooterContact } from './FooterContact'
import { FooterPaymentMethods } from './FooterPaymentMethods'
import { FooterSocialMediaLinks } from './FooterSocialMediaLinks'
import { FooterCopyright } from './FooterCopyright'

const styles = {
  root: {
    marginTop: 5, // mimic <Main>'s `rowGap: 5`
    backgroundColor: 'primary.heavy',
  },
}

// I don't need to specify the `xs`, `sm` prop each time if they are the same, but just makes it easier to understand/picture
export const Footer = () => {
  return (
    <Box component="footer" sx={styles.root}>
      <Container maxWidth="lg" disableGutters>
        <Grid
          container
          justifyContent="center"
          columnSpacing={2}
          rowGap={{ xs: 1.5, sm: 2 }}
          p={4}
          color="white">
          <Grid item xs={12} sm={4} md={3}>
            <FooterLinks title="Customer Care" />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FooterLinks title="Corporate" />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FooterLinks title="More from Á la Mode" />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <FooterContact />
          </Grid>
          <Grid item xs={12} sm={7} md={12}>
            <Grid container direction="column" justifyContent="center" gap={{ xs: 3, md: 4 }}>
              <FooterSocialMediaLinks />
              <FooterPaymentMethods />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <FooterCopyright />
    </Box>
  )
}
