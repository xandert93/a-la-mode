import { ArrowLeftIcon, ArrowRightIcon, CoverImage } from '@/components'

import { Box, ButtonBase, Fade, Grid } from '@mui/material'
import { useState } from 'react'
import { ProductImageStack } from './ProductImageStack'

export const ProductImageDisplay = ({ imageUrls }) => {
  const imageCount = imageUrls.length

  const [index, setIndex] = useState(0)

  const changeImage = (newIndex) => () => setIndex(newIndex)

  // 🚧 - probs better way lol
  const toPrevImage = () => {
    setIndex((curr) => (curr === 0 ? imageCount - 1 : curr - 1))
  }

  // 🚧 - probs better way lol
  const toNextImage = () => {
    setIndex((curr) => (curr === imageCount - 1 ? 0 : curr + 1))
  }

  return (
    <Grid container spacing={1} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
      <Grid item xs={12} md={1.5}>
        <ProductImageStack imageUrls={imageUrls} changeImage={changeImage} imageIndex={index} />
      </Grid>
      <Grid
        item
        xs={12}
        md={10.5}
        sx={{
          position: 'relative',
          width: '100%', // ❗ otherwise Next <CoverImage> below goes whack...I think it's cos it effectively has no children (absolute) and therefore collapses completely
        }}>
        <Fade
          in
          timeout={500}
          key={index} // 🚧🐱‍💻 - desired effect. Best way to achieve?
        >
          <Box
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: { xs: '1/1', md: '4/5' },
            }}>
            <CoverImage
              src={imageUrls[index]}
              alt="" // 🚧
            />
          </Box>
        </Fade>
        <Grid
          container
          justifyContent="flex-end"
          sx={{ position: 'absolute', bottom: '2.5%', right: '2.5%' }}
          columnGap={1}>
          <ImageNavigationButton Icon={ArrowLeftIcon} onClick={toPrevImage} />
          <ImageNavigationButton Icon={ArrowRightIcon} onClick={toNextImage} />
        </Grid>
      </Grid>
    </Grid>
  )
}

// 🚧 - would use <MuiIconButton>, but it has a default :hover setting which makes background effectively transparent.
// Can't be bothered to undo that here...easier to create from scratch:
const ImageNavigationButton = ({ Icon, ...props }) => {
  return (
    <ButtonBase
      sx={{
        bgcolor: 'background.default',
        color: 'primary.main',
        p: 0.5,
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '50%',
      }}
      // hate doing this...need to find way of making icons responsive
      children={<Icon sx={{ fontSize: { xs: 28, sm: 32, md: 36, lg: 40 } }} />}
      {...props}
    />
  )
}
