import { useState } from 'react'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'

import { Link, HeartIcon } from '../../../../components'

import { useToggle } from '@/hooks'

import styles from './styles'

export const ProductPreviewCard = ({
  id,
  name,
  price,
  imageUrls,
  href,
  colors = ['orange', 'red', 'yellow'],
}) => {
  return (
    <Card component="article" elevation={4} sx={styles.root}>
      <Link href={href}>
        <Grid container direction="column" p={1.5} rowGap={2}>
          <ProductImage urls={imageUrls} />
          <Grid container alignItems="center" rowGap={1} px={1}>
            <Grid item xs={12}>
              <Typography
                children={name}
                sx={{ fontWeight: 'bold', letterSpacing: 1 }} // JFN
              />
            </Grid>
            <Grid item xs>
              <ProductColors colors={colors} />
            </Grid>
            <Typography
              children={'£' + price}
              component="p"
              variant="h6"
              sx={{ fontWeight: 'initial', letterSpacing: 1 }} // JFN
            />
          </Grid>
        </Grid>
      </Link>

      <LikeButton />
    </Card>
  )
}

const ProductImage = ({ urls }) => {
  const [index, setIndex] = useState(0)

  const toggleImage = (newIndex) => () => setIndex(newIndex)

  return (
    <Grid
      container
      onMouseEnter={toggleImage(1)}
      onMouseLeave={toggleImage(0)}
      sx={styles['image-box']}>
      <img
        src={urls[index]}
        style={styles.image} // *** inline (not a fan)
      />
    </Grid>
  )
}

const ProductColors = ({ colors }) => {
  return (
    <Grid container>
      {colors.map((color) => (
        <ColorCircle key={color} color={color} />
      ))}
    </Grid>
  )
}

const ColorCircle = ({ color }) => {
  return <Box sx={styles['color-circle'](color)} />
}

const LikeButton = () => {
  const [isLiked, toggleLike] = useToggle()

  return (
    <IconButton
      sx={styles['like-button']}
      onClick={toggleLike}
      aria-label="Add product to your wishlist">
      <HeartIcon sx={styles.icon(isLiked)} />
    </IconButton>
  )
}
