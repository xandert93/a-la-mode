import { CoverImage, Link } from '@/components'
import { collections } from '@/data'
import { Box, Container, Grid, Typography } from '@mui/material'
import { ImageButton } from './HomeHeroSection'

const styles = {
  preview: {
    position: 'relative',
    display: 'block',
    height: '50vh',
  },
}

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
      <Grid
        color="common.white"
        container
        direction="column"
        rowGap={3}
        p={5}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        sx={(theme) => ({
          ...theme.mixins.absCover,
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s',
          ':hover': {
            backgroundColor: 'transparent',
          },
          ':hover~div > img': {
            transform: 'scale(1.05)',
          },
        })}>
        <Typography
          component="h3"
          variant="h5"
          children={title + ' ' + 'Collection'}
          textTransform="uppercase"
          sx={{
            textShadow: '1px 1px 1px black',
          }}
          letterSpacing={5}
        />
        <Typography
          sx={{
            textShadow: '1px 1px 1px black',
          }}
          children={description}
        />
        <ImageButton children="Shop Now" />
      </Grid>
      <Box overflow="hidden" sx={styles.preview}>
        <CoverImage src={imageUrl} alt={`${title} collection`} style={{ transition: 'all 0.3s' }} />
      </Box>
    </Link>
  )
}
