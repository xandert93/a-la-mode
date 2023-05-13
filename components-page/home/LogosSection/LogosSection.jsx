import { Box, Grid, Typography } from '@mui/material'
import { Section } from '@/components'

import styles from './styles'

export const LogosSection = ({ title, data, ...props }) => {
  return (
    <Section maxWidth="lg" {...props}>
      <Typography component="h2" variant="body2" children={title} sx={styles.heading} />
      <Box px={{ sm: 2 }}>
        <Logos data={data} />
      </Box>
    </Section>
  )
}

const Logos = ({ data }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 3, md: 5, lg: 7 }} // could use gap, but then we'd lose MUI flex-wrapping with spacing functionality
      sx={styles.root}>
      <LogoList data={data} />
    </Grid>
  )
}

const LogoList = ({ data }) => {
  return data.map(({ name, imageUrl }) => {
    return (
      <Grid
        key={name}
        item
        xs={4} // 3 logos per row on xs & sm
        md={2} // 6 logos per row on md+
        container
        justifyContent="center">
        <Box component="img" src={imageUrl} sx={styles.image} alt={name} />
      </Grid>
    )
  })
}
