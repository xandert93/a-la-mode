import { Box, Container, Grid, Typography } from '@mui/material'

import { CoverImage, Link, ImageButton } from '@/components'
import { collections } from '@/data'

import styles from './styles'

export const CollectionsSection = () => {
  return (
    <section>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          {collections.map((collection, index) => (
            <Grid key={collection.id} item xs={12} sm={index === 2 ? 12 : 6} md={index < 3 ? 4 : 6}>
              <CollectionPreview {...collection} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}

const CollectionPreview = ({ title, description, imageUrl }) => {
  return (
    <Link href="/#" sx={{ display: 'block' }}>
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
      <Typography component="h3" variant="h5" children={title} sx={styles.title} />
      <Typography children={description} sx={styles.description} />
      <ImageButton children="Shop Now" />
    </Grid>
  )
}
