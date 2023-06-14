import { Box, Grid, Typography } from '@mui/material'
import { CoverImage, Link, ImageButton, Section } from '@/components'
import { collections } from '@/data'

import styles from './styles'

export const CollectionsSection = () => {
  return (
    <Section maxWidth="xl">
      <Grid container spacing={2}>
        {collections.map((collection, index) => (
          <Grid key={index} item xs={12} sm={index === 2 ? 12 : 6} md={index < 3 ? 4 : 6}>
            <CollectionPreviewLink {...collection} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}

const CollectionPreviewLink = ({ title, description, imageUrl }) => {
  return (
    <Link href="/#" sx={styles['preview-link']}>
      <PreviewOverlay {...{ title, description }} />
      <PreviewImage {...{ title, imageUrl }} />
    </Link>
  )
}

const PreviewImage = ({ title, imageUrl }) => {
  return (
    <Box sx={styles['image-box']}>
      <Box component={CoverImage} src={imageUrl} alt={`${title} Collection`} sx={styles.image} />
    </Box>
  )
}

const PreviewOverlay = ({ title, description }) => {
  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignItems="center"
      justifyContent="center"
      rowGap={3}
      p={{ xs: 4, sm: 5 }}
      sx={styles.overlay}>
      <Typography component="h3" variant="h6" children={title} sx={styles.title} />
      <Typography children={description} sx={styles.description} />
      <ImageButton elevation={8} children="Shop Now" />
    </Grid>
  )
}
