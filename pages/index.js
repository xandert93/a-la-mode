import { Link, MailingForm } from '@/components'
import { categories } from '@/data'

import { Box, Grid } from '@mui/material'

export default function HomePage() {
  return (
    <>
      <CategoryPreviewList />
      <MailingForm />
    </>
  )
}

const CategoryPreviewList = () => {
  return (
    <Grid container spacing={1} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {categories.map((c, index) => (
        <Grid item xs={12} md={index < 3 ? 4 : 6}>
          <CategoryPreview category={c} />
        </Grid>
      ))}
    </Grid>
  )
}

const CategoryPreview = ({ category }) => {
  return (
    <Link href="/">
      <Box sx={{ height: '50vh' }}>
        <img
          src={category.imageUrl}
          style={{
            display: 'block',
            borderRadius: 3,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Link>
  )
}
