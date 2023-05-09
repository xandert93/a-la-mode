import { Section } from '@/components'
import { blogArticles } from '@/data'
import { isVPMaxSmAndLandscape } from '@/theme'
import { Box, Button, Grid, Typography } from '@mui/material'

export const BlogSection = () => {
  return (
    <Section maxWidth="lg">
      <Grid container direction="column">
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
    <Grid container direction={direction} spacing={{ xs: 2, sm: 3, md: 4 }} py={2}>
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
      <Grid
        item
        sm={6}
        xs={12}
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        rowGap={2}>
        <Typography component="h3" variant="h5" children={title} />
        <Typography children={body} />
        <Button variant="outlined" children="Read More ➡" />
      </Grid>
    </Grid>
  )
}
