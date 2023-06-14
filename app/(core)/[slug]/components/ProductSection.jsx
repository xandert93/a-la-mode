'use client'

import { Section } from '@/components'
import { Box, Grid } from '@mui/material'

import { ProductImageDisplay } from './ProductImagesDisplay'
import { ProductDetails } from './ProductDetails'

export const ProductSection = (product) => {
  return (
    /* the wrapping, minWidth & maxWidth on this 👇 <Grid> work closely together, sometimes desirably engaging in a tug-of-war for space. Understand well before editing */
    <Section maxWidth="lg">
      <Grid
        container
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        justifyContent="center"
        gap={{ xs: 2, sm: 3 }}>
        <Box maxWidth={{ xs: 640, md: 720 }}>
          <ProductImageDisplay imageUrls={product.imageUrls} />
        </Box>
        <Box minWidth={{ md: 400 }} width={{ xs: '100%', md: 'initial' }} maxWidth={640}>
          <ProductDetails {...product} />
        </Box>
      </Grid>
    </Section>
  )
}

/*

// Nike made each a <input:radio> (interesting). But all sites seemed to perform a HTTP request each time a size was picked. Something to explore and revisit later.

  "interest free payment with paypal" message - see M&S:
  
                  <Grid container alignItems="center" wrap="nowrap" bgcolor="white">
                    <Typography children="Interest-free payments available on orders between £30 - £2000 with" />
                    <Img src="/images/payment-methods/paypal.png" width="50px" />
                    or
                    <Img src="/images/payment-methods/klarna.png" width="50px" />
                    <IconButton children={<InfoOutlined />} />
                  </Grid>
  
  
  Share product to socials:
  
  <Box>
                    <ShareIcon />
                    <FacebookIcon />
                    <TwitterIcon />
                    <WhatsAppIcon />
                  </Box>
  
  
  Gonna leave product details, features and colours for now. Need to determine type of eCommerce
  For example, if clothing, customer usually just impulsively look at image and buys - details/features are commonly hidden in accordion
  But for electronics, where customer makes a considered purchase, description and feature list must be immediately visible
  
  */
