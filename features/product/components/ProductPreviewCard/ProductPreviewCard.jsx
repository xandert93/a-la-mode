import { useState } from 'react'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'

import { Link, HeartIcon } from '../../../../components'

import { useToggle } from '@/hooks'

import styles from './styles'
import { isHoverable } from '@/theming'

export const ProductPreviewCard = ({
  id,
  name,
  price,
  imageUrls,
  href,
  colors = ['black', 'navy', '#c5c285'],
}) => {
  return (
    <Card component="article" elevation={0} sx={styles.root}>
      <Link href={href} sx={{ display: 'block', [isHoverable]: { p: 1.5 } }}>
        <Grid container direction="column" rowGap={2}>
          <ProductImage urls={imageUrls} />
          <Grid container alignItems="center" rowGap={1} px={1}>
            <Grid item xs={12}>
              <Typography
                children={name}
                sx={{ letterSpacing: 1 }} // JFN
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
      aria-label="Add product to your wish list">
      <HeartIcon sx={styles.icon(isLiked)} />
    </IconButton>
  )
}
