import { useState } from 'react'
import { Box, Card, Grid, Rating, Typography } from '@mui/material'

import { Link, HeartIcon, IconButton, CoverImage } from '../../../../components'

import { useEffectOnMount } from '@/hooks'

import styles from './styles'
import { isHoverable } from '@/theming'
import { useWishList } from '@/context/global-context'
import { wait } from '@/utils/helpers'
import { useSnackbar } from '@/context/snackbar-context'
import { ProductPricing } from '../ProductPricing'

export const ProductPreviewCard = (product) => {
  const {
    id,
    slug,
    name,
    prices,
    imageUrls,
    href,
    colors = ['black', 'navy', '#c5c285'],
    rating,
  } = product

  return (
    <Card component="article" elevation={0} sx={styles.root}>
      <Link href={'/' + slug} sx={{ [isHoverable]: { p: 1.5 } }}>
        <Grid container direction="column" rowGap={1.5}>
          <ProductPreviewImage name={name} urls={imageUrls} />
          {/* <PPP> 👇 is a bit tall for some reason - mb of -4px is hacky JFN. Return later *** */}
          <ProductPreviewPricing prices={prices} mb={-0.5} />
          <ProductPreviewName name={name} />
          <ProductPreviewColors colors={colors} />
          <ProductPreviewRating rating={rating} />
        </Grid>
      </Link>
      <SaveButton product={product} />
    </Card>
  )
}

const ProductPreviewRating = ({ rating }) => {
  return (
    <Rating
      size="small"
      value={rating.average}
      sx={{
        color: 'secondary.main', // JTO
      }}
    />
  )
}

const ProductPreviewImage = ({ name, urls }) => {
  const imageCount = urls.length

  const [index, setIndex] = useState(0)

  const toggleImage = (newIndex) => () => setIndex(newIndex)

  return (
    <Grid
      container
      onMouseEnter={toggleImage(1)}
      onMouseLeave={toggleImage(0)}
      sx={styles['image-box']}>
      <CoverImage
        src={urls[index]}
        alt={`${name} ${index + 1} of ${imageCount}`} // *** via M&S. Necessary? Macy's and Asos use `alt=""`
      />
    </Grid>
  )
}

const ProductPreviewPricing = ({ prices, ...props }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" {...props}>
      <ProductPricing variant1="caption" prices={prices} gap={0.5} width="auto" />
      {prices.previous && <ProductPriceSaving prices={prices} />}
    </Grid>
  )
}

const ProductPreviewName = ({ name }) => {
  return <Typography component="h2" children={name} letterSpacing={-0.25} />
}

const ProductPriceSaving = ({ prices }) => {
  const saving = Math.round((1 - prices.current / prices.previous) * 100) // *** perform on server?

  return (
    <Typography
      variant="caption"
      sx={{
        clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)',
        bgcolor: 'secondary.main',
        color: 'background.default',
        py: 1 / 8,
        px: 2,
      }}
      children={`Save ${saving}%`}
    />
  )
}

const ProductPreviewColors = ({ colors, ...props }) => {
  const colorCount = colors.length
  const shownColorCount = 5
  const remainingColorCount = colorCount - shownColorCount

  return (
    <Grid container alignItems="center" gap={1} {...props}>
      {colors.slice(0, shownColorCount).map((color) => (
        <PreviewColor key={color} bgcolor={color.replace(/ /g, '')} title={color} />
      ))}
      {remainingColorCount > 0 && (
        <Typography variant="body2" children={`+${remainingColorCount}`} color="text.secondary" />
      )}
    </Grid>
  )
}

const PreviewColor = (props) => {
  return (
    <Box
      sx={{
        height: 24,
        width: 24,
        border: '1px solid',
        borderColor: 'text.primary',
        borderRadius: 0.5,
      }}
      {...props}
    />
  )
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
    !isSaved && snackbar.success({ type: 'save', message: 'Saved to Wish List' })
    !isSaved ? wishList.addSavedItem(product) : wishList.removeSavedItem(product.name)
  }

  return (
    <IconButton
      size="small"
      onClick={handleClick}
      shaded={false}
      sx={styles['save-button'](isSaved)}
      aria-label="Add product to your Wish List">
      <HeartIcon sx={styles.icon(isSaved)} />
    </IconButton>
  )
}
