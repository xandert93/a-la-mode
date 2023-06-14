import { ButtonLink, CoverImage, Section, SectionHeading, SectionSubHeading } from '@/components'
import { blogArticles } from '@/data'
import { isVPMaxSmAndLandscape, isVPXs } from '@/theme'
import { Box, Grid, Typography, alpha } from '@mui/material'

// *** inspiration: https://www.hawesandcurtis.co.uk/lords-cricket-club

const styles = {
  root: {
    [isVPXs]: {
      position: 'relative',
    },
  },

  ['article-image-box']: {
    position: 'relative',
    borderRadius: 1,
    overflow: 'hidden',

    height: '40vh',
    // *** JFN - never feels ideal, but surely a better way to get around vh units on landscape?
    [isVPMaxSmAndLandscape]: {
      height: '70vh',
    },
  },

  ['article-details']: (theme) => ({
    [isVPXs]: {
      ...theme.mixins.absCover,
      pr: '33%', // JFN, but desired effect
      borderRadius: 1,
      bgcolor: alpha(theme.palette.common.black, 0.35),
    },
  }),

  ['article-title']: {
    color: { xs: 'common.white', sm: 'text.tertiary' },
    fontWeight: 400,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  ['article-body']: (theme) => ({
    [isVPXs]: {
      color: 'common.white',
      ...theme.mixins.lineClamp(3),
    },
  }),
}

export const ArticlesSection = () => {
  return (
    <Section maxWidth="lg">
      <Box mb={3} textAlign={{ xs: 'left', sm: 'center' }}>
        <SectionSubHeading children="Inspiration" />
        <SectionHeading children="Inside Á la Mode" />
      </Box>
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

const Article = ({ direction, title, body, imageUrl, href }) => {
  return (
    <Grid
      container
      direction={direction}
      alignItems="center"
      spacing={{ sm: 3, md: 4 }}
      sx={styles.root}>
      <Grid item sm={6} xs={12}>
        <ArticleImage imageUrl={imageUrl} title={title} />
      </Grid>
      <Grid item sm={6} xs={12} container alignItems="center" rowGap={2} sx={{}}>
        <ArticleDetails title={title} body={body} />
      </Grid>
    </Grid>
  )
}

const ArticleImage = ({ imageUrl, title }) => {
  return (
    <Box sx={styles['article-image-box']}>
      <CoverImage src={imageUrl} alt={title} />
    </Box>
  )
}

const ArticleDetails = ({ title, body }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start" // prevent <Button> stretch
      wrap="nowrap"
      p={3}
      rowGap={{ xs: 2, sm: 3 }}
      sx={styles['article-details']}>
      <Typography component="h3" variant="h6" children={title} sx={styles['article-title']} />
      <Typography children={body} sx={styles['article-body']} />
      {/* *** <ImageButton> probably better on xs, but then I'd need MQ in component (not eager) */}
      <ButtonLink color="secondary" href="#" children="Continue reading ➡" />
    </Grid>
  )
}
