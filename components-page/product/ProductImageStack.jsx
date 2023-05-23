import { Img } from '@/components'

import { isHoverable } from '@/theming'
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
            overflow="hidden"
            borderRadius={1}
            sx={{
              border: '1px solid transparent',
              transition: (theme) => theme.transitions.create('border-color'),

              ...(imageIndex === index && {
                borderColor: 'secondary.light',
              }),

              [isHoverable]: {
                ':hover': {
                  filter: 'brightness(0.9)',
                },
              },
            }}
            onClick={changeImage(index)}
            onMouseEnter={changeImage(index)}>
            <Img
              src={url}
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
              alt="Product Image Preview" // JFN
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
