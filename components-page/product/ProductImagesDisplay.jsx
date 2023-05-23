import { Img, ArrowLeftIcon, ArrowRightIcon } from '@/components'

import { Box, Fade, Grid, IconButton as MuiIconButton } from '@mui/material'
import { useState } from 'react'
import { ProductImageStack } from './ProductImageStack'

export const ProductImageDisplay = ({ imageUrls }) => {
  const imageCount = imageUrls.length

  const [index, setIndex] = useState(0)

  const changeImage = (newIndex) => () => setIndex(newIndex)

  // JFN - probs better way lol
  const toPrevImage = () => {
    setIndex((curr) => {
      return curr === 0 ? imageCount - 1 : curr - 1
    })
  }

  // JFN - probs better way lol
  const toNextImage = () => {
    setIndex((curr) => {
      return curr === imageCount - 1 ? 0 : curr + 1
    })
  }

  return (
    <Grid container spacing={1} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
      <Grid item xs={12} md={1.5}>
        <ProductImageStack imageUrls={imageUrls} changeImage={changeImage} imageIndex={index} />
      </Grid>
      <Grid item xs={12} md={10.5} sx={{ position: 'relative' }}>
        <Fade
          in
          timeout={500}
          key={index} // JFN - bit of a hack, but desired effect. Best way to achieve?
        >
          <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <Img
              src={imageUrls[index]}
              sx={{
                width: '100%',
                aspectRatio: { xs: '1/1', md: '4/5' },
                objectFit: 'cover',
              }}
              alt="Product Image 1 of 3" // JFN
            />
          </Box>
        </Fade>
        <Grid
          container
          width="fit-content"
          sx={{ position: 'absolute', bottom: 8, right: 8 }}
          columnGap={1}>
          <MuiIconButton
            // JFN - kinda broken styling (even with default muiiconbutton because its not supposed to be styled like I have below) - need to come back and configure
            sx={{ bgcolor: 'white', p: 0.5, border: '2px solid', borderColor: 'primary.main' }}
            children={<ArrowLeftIcon fontSize="large" />}
            onClick={toPrevImage}
          />
          <MuiIconButton
            sx={{ bgcolor: 'white', p: 0.5, border: '2px solid', borderColor: 'primary.main' }}
            children={<ArrowRightIcon fontSize="large" />}
            onClick={toNextImage}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
