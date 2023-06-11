import { Img } from '@/components'

import { isHoverable } from '@/theme'
import { Box, Grid } from '@mui/material'

// Nike also has < and > buttons in bottom right of their main image. Could add later

export const ProductImageStack = ({ imageUrls, changeImage, imageIndex }) => {
  return (
    <Grid container spacing={1}>
      {imageUrls.map((url, index) => (
        <Grid
          item
          xs={2.4} // 5 per row
          sm={2} // 6 per row
          md={12} // 1 per row, but row only consumes 1.5/12 (see <ProductImageStack> parent)
          key={index}>
          <Box
            onClick={changeImage(index)}
            onMouseEnter={changeImage(index)}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              border: '2px solid transparent',
              transition: (theme) => theme.transitions.create('border-color'),

              ...(imageIndex === index && {
                borderColor: 'primary.light',
              }),

              [isHoverable]: {
                ':hover': {
                  filter: 'brightness(0.9)',
                },
              },
            }}>
            {/* *** Tried hard to use next/image here, but not working...possibly because of max-width configuration on containers... */}
            <Img
              src={url}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
              alt="" // JFN
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
