import { CoverImg, Link } from '@/components'
import { collections } from '@/data'
import { Box, Container, Grid } from '@mui/material'

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
          {collections.map((c, index) => (
            <Grid key={c.id} item xs={12} sm={index === 2 ? 12 : 6} md={index < 3 ? 4 : 6}>
              <CollectionPreview category={c} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
const CollectionPreview = ({ category }) => {
  return (
    <Link href="/#" sx={styles.preview}>
      <Box component={CoverImg} src={category.imageUrl} />
    </Link>
  )
}
