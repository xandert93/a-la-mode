import { useState } from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'

import { Link, HeartIcon, IconButton, Img, MoneyTypography } from '../../../../components'

import { useEffectOnMount } from '@/hooks'

import styles from './styles'
import { isHoverable } from '@/theming'
import { useWishList } from '@/context/global-context'
import { wait } from '@/utils/helpers'
import { useSnackbar } from '@/context/snackbar-context'

export const ProductPreviewCard = (product) => {
  const { id, slug, name, prices, imageUrls, href, colors = ['black', 'navy', '#c5c285'] } = product

  return (
    <Card component="article" elevation={0} sx={styles.root}>
      <Link href={'/' + slug} sx={{ [isHoverable]: { p: 1.5 } }}>
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
            <MoneyTypography
              children={prices.current}
              sx={{ fontWeight: 500, letterSpacing: -0.5 }} // JFN - "body1" fontsize too small and "h6" too big...need solution
            />
          </Grid>
        </Grid>
      </Link>
      <SaveButton product={product} />
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
      <Img
        src={urls[index]}
        sx={styles.image}
        alt="Product Image 3 of 4" // JFN come back later
      />
    </Grid>
  )
}

const ProductColors = ({ colors }) => {
  return (
    <Grid container>
      {colors.slice(0, 3).map((color) => (
        <ColorCircle key={color} bgcolor={color.replace(/ /g, '')} />
      ))}
      {colors.length > 3 && (
        <ColorCircle
          bgcolor="divider"
          children={'+' + String(colors.length - 3)}
          fontSize={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
      )}
    </Grid>
  )
}

// Inspired by <AvatarGroup> - inspect MUI use for further configuration: https://mui.com/material-ui/react-avatar/#grouped
const ColorCircle = (props) => {
  return <Box sx={styles['color-circle']} {...props} />
}

const SaveButton = ({ product }) => {
  const snackbar = useSnackbar()
  const wishList = useWishList()

  const [isSaved, setIsSaved] = useState()

  // JFN
  useEffectOnMount(() => {
    setIsSaved(
      JSON.parse(localStorage.getItem('saved-items'))?.some((item) => item.name === product.name)
    )
  })

  const handleClick = async () => {
    setIsSaved((prev) => !prev) // will be an optimistic update
    await wait(1)
    !isSaved && snackbar.success({ type: 'save', message: 'Added to Bag!' })
    !isSaved ? wishList.addSavedItem(product) : wishList.removeSavedItem(product.name)
  }

  return (
    <IconButton
      onClick={handleClick}
      sx={styles['save-button'](isSaved)}
      aria-label="Add product to your Wish List">
      <HeartIcon sx={styles.icon(isSaved)} />
    </IconButton>
  )
}
