import { Section } from '@/components'
import { blogArticles } from '@/data'
import { isVPMaxSmAndLandscape } from '@/theme'
import { Box, Button, Grid, Typography } from '@mui/material'

export const BlogSection = () => {
  return (
    <Section maxWidth="lg">
      <Typography children="Discover" />
      <Grid container direction="column" rowGap={{ xs: 2, md: 5 }}>
        {blogArticles.map((article, index) => {
          const isEven = index % 2 === 0
          return (
            <Article key={article.title} {...article} direction={isEven ? 'row' : 'row-reverse'} />
          )
        })}
      </Grid>
    </Section>
  )
}

const Article = ({ direction, title, body, imageUrl }) => {
  return (
    <Grid container direction={direction} spacing={{ xs: 2, sm: 3, md: 4 }}>
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          height: '40vh',
          // *** (JFT) never feels ideal, but surely a better way to get around vh units on landscape?
          [isVPMaxSmAndLandscape]: {
            height: '70vh',
          },
        }}>
        <Box
          component="img"
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      </Grid>
      <Grid item sm={6} xs={12} container alignItems="center" rowGap={2}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          p={{ sm: 2, md: 3, lg: 4, xl: 5 }}
          rowGap={2}>
          <Box>
            <Typography component="h3" variant="h5" children={title} marginBottom />
            <Typography children={body} />
          </Box>
          <Button variant="outlined" color="inherit" children="Read More ➡" />
        </Grid>
      </Grid>
    </Grid>
  )
}
